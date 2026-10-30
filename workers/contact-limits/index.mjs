import { contactLimitRules } from "../../src/lib/contact/rate-limit.ts";

// Only accessible through a binding. The public Worker endpoint serves no API.
export default { fetch: () => new Response("Not found", { status: 404 }) };

export class ContactLimits {
  constructor(state) {
    this.storage = state.storage;
  }

  async fetch(request) {
    if (request.method !== "POST") return new Response(null, { status: 405 });
    let kind;
    try {
      ({ kind } = await request.json());
    } catch {
      return new Response(null, { status: 400 });
    }
    if (kind !== "request" && kind !== "delivery")
      return new Response(null, { status: 400 });
    const rules = contactLimitRules[kind];
    const now = Date.now();
    const result = await this.storage.transaction(async (transaction) => {
      const previous = (await transaction.get("counters")) ?? [];
      const counters = rules.map((rule, index) =>
        previous[index]?.expires > now
          ? previous[index]
          : { count: 0, expires: now + rule.windowMs },
      );
      const exhausted = counters.find(
        (counter, index) => counter.count >= rules[index].limit,
      );
      if (exhausted)
        return {
          allowed: false,
          retryAfter: Math.max(1, Math.ceil((exhausted.expires - now) / 1000)),
        };
      await transaction.put(
        "counters",
        counters.map((counter) => ({ ...counter, count: counter.count + 1 })),
      );
      return {
        allowed: true,
        retryAfter: 0,
        cleanupAt: Math.max(...counters.map((counter) => counter.expires)),
      };
    });
    if (result.cleanupAt) await this.storage.setAlarm(result.cleanupAt);
    return Response.json({
      allowed: result.allowed,
      retryAfter: result.retryAfter,
    });
  }

  async alarm() {
    const nextAlarm = await this.storage.transaction(async (transaction) => {
      const counters = (await transaction.get("counters")) ?? [];
      const expires = Math.max(
        0,
        ...counters.map((counter) => counter.expires),
      );
      if (expires <= Date.now()) {
        await transaction.delete("counters");
        return null;
      }
      return expires;
    });
    if (nextAlarm) await this.storage.setAlarm(nextAlarm);
  }
}
