import { Redis } from "@upstash/redis";

export type LimitKind = "request" | "delivery";

export type LimitResult = {
  allowed: boolean;
  retryAfter: number;
};

export type ContactLimiter = {
  consume(kind: LimitKind, key: string): Promise<LimitResult>;
};

export const contactLimitRules = {
  request: [{ limit: 5, windowMs: 10 * 60 * 1000 }],
  delivery: [
    { limit: 10, windowMs: 60 * 60 * 1000 },
    { limit: 50, windowMs: 24 * 60 * 60 * 1000 },
  ],
} as const;

// Local development only.
export function createDevelopmentLimiter(): ContactLimiter {
  const entries = new Map<string, { count: number; expires: number }>();

  return {
    async consume(kind, key) {
      const now = Date.now();

      for (const [entryKey, entry] of entries) {
        if (entry.expires <= now) {
          entries.delete(entryKey);
        }
      }

      if (entries.size > 2048) {
        return { allowed: false, retryAfter: 600 };
      }

      const counters = contactLimitRules[kind].map((rule, index) => {
        const id = `${kind}:${key}:${index}`;

        return {
          id,
          rule,
          entry: entries.get(id) ?? {
            count: 0,
            expires: now + rule.windowMs,
          },
        };
      });

      const exhausted = counters.find(
        ({ rule, entry }) => entry.count >= rule.limit,
      );

      if (exhausted) {
        return {
          allowed: false,
          retryAfter: Math.max(
            1,
            Math.ceil((exhausted.entry.expires - now) / 1000),
          ),
        };
      }

      for (const { id, entry } of counters) {
        entries.set(id, {
          ...entry,
          count: entry.count + 1,
        });
      }

      return { allowed: true, retryAfter: 0 };
    },
  };
}

export type ContactLimitNamespace = {
  idFromName(name: string): unknown;
  get(id: unknown): {
    fetch(request: Request): Promise<Response>;
  };
};

// Cloudflare Pages / Durable Object limiter.
export function createCloudflareLimiter(
  binding: ContactLimitNamespace,
): ContactLimiter {
  return {
    async consume(kind, key) {
      const id = binding.idFromName(`${kind}:${key}`);

      const response = await binding.get(id).fetch(
        new Request("https://limits.internal/consume", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ kind }),
          signal: AbortSignal.timeout(5000),
        }),
      );

      if (!response.ok) {
        throw new Error("Contact rate limiter unavailable");
      }

      const result = (await response.json()) as Partial<LimitResult>;

      if (
        typeof result.allowed !== "boolean" ||
        typeof result.retryAfter !== "number" ||
        !Number.isFinite(result.retryAfter)
      ) {
        throw new Error("Invalid contact rate limit result");
      }

      return {
        allowed: result.allowed,
        retryAfter: Math.max(0, Math.ceil(result.retryAfter)),
      };
    },
  };
}

// All checks and increments happen in one atomic Redis operation.
const upstashRateLimitScript = `
for i = 1, #KEYS do
  local count = tonumber(redis.call("GET", KEYS[i]) or "0")
  local limit = tonumber(ARGV[(i - 1) * 2 + 1])

  if count >= limit then
    local ttl = redis.call("PTTL", KEYS[i])

    if ttl < 0 then
      ttl = tonumber(ARGV[(i - 1) * 2 + 2])
    end

    return {0, math.max(1, math.ceil(ttl / 1000))}
  end
end

for i = 1, #KEYS do
  local count = redis.call("INCR", KEYS[i])

  if count == 1 then
    redis.call(
      "PEXPIRE",
      KEYS[i],
      tonumber(ARGV[(i - 1) * 2 + 2])
    )
  end
end

return {1, 0}
`;

export function createUpstashLimiter(redis: Redis): ContactLimiter {
  return {
    async consume(kind, key) {
      const rules = contactLimitRules[kind];

      // Shared hash tag keeps all keys in the same Redis cluster slot.
      const keys = rules.map(
        (_, index) => `rvbtech:{contact}:${kind}:${key}:${index}`,
      );

      const args = rules.flatMap((rule) => [rule.limit, rule.windowMs]);

      const result = await redis.eval(upstashRateLimitScript, keys, args);

      if (!Array.isArray(result) || result.length !== 2) {
        throw new Error("Invalid Upstash rate limit result");
      }

      const allowed = Number(result[0]);
      const retryAfter = Number(result[1]);

      if ((allowed !== 0 && allowed !== 1) || !Number.isFinite(retryAfter)) {
        throw new Error("Invalid Upstash rate limit result");
      }

      return {
        allowed: allowed === 1,
        retryAfter: Math.max(0, Math.ceil(retryAfter)),
      };
    },
  };
}
