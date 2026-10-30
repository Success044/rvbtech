import assert from "node:assert/strict";
import { test } from "node:test";
import { handleContact } from "../src/lib/contact/handler.ts";
import {
  createCloudflareLimiter,
  createDevelopmentLimiter,
} from "../src/lib/contact/rate-limit.ts";
import {
  maxContactBodyBytes,
  validateContactFields,
} from "../src/lib/contact/validation.ts";
import { ContactLimits } from "../workers/contact-limits/index.mjs";

const origin = "https://rvbtech.example";
const environment = {
  RESEND_API_KEY: "re_fixture_not_a_real_key",
  CONTACT_FROM_EMAIL: "website@rvbtech.example",
  CONTACT_TO_EMAIL: "owner@example.com",
  TURNSTILE_SECRET_KEY: "fixture_not_a_real_secret",
  CONTACT_ALLOWED_ORIGINS: origin,
};
const validInput = {
  name: "सीता श्रेष्ठ",
  phone: "9851313968",
  email: "visitor@example.com",
  service: "plumbing",
  location: "Kathmandu",
  message: "Please help plan the water supply for our renovation.",
  website: "",
  turnstileToken: "fixture-challenge-token",
  submissionId: "439a404e-9d57-4a89-8619-052a78f201af",
};

function request(input = validInput, headers = {}, method = "POST") {
  return new Request(`${origin}/api/contact`, {
    method,
    headers: { origin, "content-type": "application/json", ...headers },
    ...(method === "POST" ? { body: JSON.stringify(input) } : {}),
  });
}

function fixture(overrides = {}) {
  const calls = [];
  const quotas = [];
  const runtime = {
    production: true,
    clientIp: "192.0.2.42",
    limiter: {
      async consume(kind, key) {
        quotas.push({ kind, key });
        return { allowed: true, retryAfter: 0 };
      },
    },
    async fetcher(url, options) {
      calls.push({ url, options, body: JSON.parse(options.body) });
      return url.includes("siteverify")
        ? Response.json({
            success: true,
            hostname: "rvbtech.example",
            action: "contact",
          })
        : Response.json({ id: "fixture-email-id" });
    },
    ...overrides,
  };
  return { runtime, calls, quotas };
}

test("sends the enquiry to the business inbox and a copy to the visitor", async () => {
  const { runtime, calls, quotas } = fixture();
  const response = await handleContact(
    request({
      ...validInput,
      message: '<script>alert("x")</script>\nPlease discuss this installation.',
    }),
    environment,
    runtime,
  );
  assert.equal(response.status, 200);
  assert.deepEqual(
    calls.map((call) => new URL(call.url).hostname),
    ["challenges.cloudflare.com", "api.resend.com", "api.resend.com"],
  );
  assert.equal(calls[0].body.remoteip, runtime.clientIp);
  assert.equal(
    calls[1].body.from,
    `R.V.B Tech <${environment.CONTACT_FROM_EMAIL}>`,
  );
  assert.deepEqual(calls[1].body.to, [environment.CONTACT_TO_EMAIL]);
  assert.equal(calls[1].body.reply_to, validInput.email);
  assert.equal(calls[1].body.html, undefined);
  assert.ok(calls[1].body.text.includes('<script>alert("x")</script>'));
  assert.equal(
    calls[1].options.headers["idempotency-key"],
    `contact/${validInput.submissionId}`,
  );
  assert.equal(
    calls[2].body.from,
    `R.V.B Tech <${environment.CONTACT_FROM_EMAIL}>`,
  );
  assert.deepEqual(calls[2].body.to, [validInput.email]);
  assert.equal(calls[2].body.reply_to, environment.CONTACT_TO_EMAIL);
  assert.ok(calls[2].body.text.startsWith(`Hello ${validInput.name},`));
  assert.ok(calls[2].body.text.includes("Service: Plumbing"));
  assert.ok(calls[2].body.text.includes("Location: Kathmandu"));
  assert.ok(
    calls[2].body.text.includes(
      'Your message:\n<script>alert("x")</script>\nPlease discuss this installation.',
    ),
  );
  assert.ok(calls[2].body.text.includes("Our team will review your request"));
  assert.ok(calls[2].body.text.includes("Regards,\nR.V.B Tech Team"));
  assert.equal(
    calls[2].options.headers["idempotency-key"],
    `contact/${validInput.submissionId}/sender-copy`,
  );
  assert.equal(quotas[0].key.length, 64);
  assert.ok(!quotas[0].key.includes(runtime.clientIp));
  assert.deepEqual(
    quotas.map((quota) => quota.kind),
    ["request", "delivery"],
  );
  const body = await response.text();
  assert.ok(
    !body.includes(validInput.message) && !body.includes(validInput.email),
  );
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("sends no visitor copy when the enquiry has no email address", async () => {
  const { runtime, calls } = fixture();
  const response = await handleContact(
    request({ ...validInput, email: "" }),
    environment,
    runtime,
  );
  assert.equal(response.status, 200);
  assert.equal(
    calls.filter((call) => call.url.includes("api.resend.com")).length,
    1,
  );
  assert.deepEqual(calls[1].body.to, [environment.CONTACT_TO_EMAIL]);
  assert.match((await response.json()).message, /submitted to our team/i);
});

test("reports when the business received the enquiry but the visitor copy failed", async () => {
  let emailAttempts = 0;
  const { runtime } = fixture({
    async fetcher(url) {
      if (url.includes("siteverify"))
        return Response.json({
          success: true,
          hostname: "rvbtech.example",
          action: "contact",
        });
      emailAttempts += 1;
      return emailAttempts === 1
        ? Response.json({ id: "business-email-id" })
        : new Response("provider unavailable", { status: 503 });
    },
  });
  const response = await handleContact(request(), environment, runtime);
  assert.equal(response.status, 200);
  assert.match(
    (await response.json()).message,
    /couldn’t confirm that Resend accepted/i,
  );
});

test("supports phone-only and email-only enquiries; rejects missing contact details", () => {
  assert.deepEqual(
    validateContactFields({ ...validInput, email: "" }).errors,
    {},
  );
  assert.deepEqual(
    validateContactFields({ ...validInput, phone: "" }).errors,
    {},
  );
  const { errors } = validateContactFields({
    ...validInput,
    phone: "",
    email: "",
  });
  assert.ok(errors.phone && errors.email);
});

test("rejects header injection, control characters, invalid types, services, and oversized messages", async () => {
  for (const changes of [
    { email: "a@example.com\r\nBcc: victim@example.com" },
    { email: "a\0@example.com" },
    { name: "Name\nAnother name" },
    { phone: [validInput.phone] },
    { phone: "+977+9851313968" },
    { service: "<script>" },
    { location: "City\0injection" },
    { message: "x".repeat(3001) },
    { message: "Please help\0with this work" },
  ]) {
    const { runtime, calls } = fixture();
    const response = await handleContact(
      request({ ...validInput, ...changes }),
      environment,
      runtime,
    );
    assert.equal(response.status, 422, JSON.stringify(changes));
    assert.equal(calls.length, 0);
  }
});

test("blocks forged destinations, unexpected fields, and the honeypot before sending", async () => {
  for (const changes of [
    { to: "victim@example.com" },
    { from: "spoof@example.com" },
    { website: "https://spam.example" },
    { subject: "arbitrary mail" },
    { website: undefined },
  ]) {
    const { runtime, calls } = fixture();
    assert.equal(
      (
        await handleContact(
          request({ ...validInput, ...changes }),
          environment,
          runtime,
        )
      ).status,
      400,
    );
    assert.equal(calls.length, 0);
  }
});

test("checks method, website origin, cross-site requests, and JSON content type", async () => {
  const cases = [
    [request(validInput, {}, "GET"), 405],
    [request(validInput, { origin: "https://evil.example" }), 403],
    [request(validInput, { origin: "" }), 403],
    [request(validInput, { "sec-fetch-site": "cross-site" }), 403],
    [request(validInput, { "content-type": "text/plain" }), 415],
  ];
  for (const [input, expected] of cases) {
    const { runtime, calls } = fixture();
    assert.equal(
      (await handleContact(input, environment, runtime)).status,
      expected,
    );
    assert.equal(calls.length, 0);
  }
});

test("caps both declared and streamed request sizes and rejects malformed JSON", async () => {
  const { runtime, calls } = fixture();
  const declared = await handleContact(
    request(validInput, { "content-length": String(maxContactBodyBytes + 1) }),
    environment,
    runtime,
  );
  assert.equal(declared.status, 413);
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(maxContactBodyBytes + 1));
      controller.close();
    },
  });
  const chunked = new Request(`${origin}/api/contact`, {
    method: "POST",
    body: stream,
    duplex: "half",
    headers: { origin, "content-type": "application/json" },
  });
  assert.equal(
    (await handleContact(chunked, environment, runtime)).status,
    413,
  );
  const malformed = new Request(`${origin}/api/contact`, {
    method: "POST",
    body: "{bad",
    headers: { origin, "content-type": "application/json" },
  });
  assert.equal(
    (await handleContact(malformed, environment, runtime)).status,
    400,
  );
  assert.equal(calls.length, 0);
});

test("missing secrets, fixed addresses, shared rate limiting, or trusted IP fails closed", async () => {
  for (const key of [
    "RESEND_API_KEY",
    "CONTACT_FROM_EMAIL",
    "CONTACT_TO_EMAIL",
    "TURNSTILE_SECRET_KEY",
    "CONTACT_ALLOWED_ORIGINS",
  ]) {
    const { runtime, calls } = fixture();
    assert.equal(
      (await handleContact(request(), { ...environment, [key]: "" }, runtime))
        .status,
      503,
    );
    assert.equal(calls.length, 0);
  }
  for (const override of [{ limiter: undefined }, { clientIp: "" }]) {
    const { runtime, calls } = fixture(override);
    assert.equal(
      (await handleContact(request(), environment, runtime)).status,
      503,
    );
    assert.equal(calls.length, 0);
  }
});

test("production rejects Cloudflare test secrets, the Resend test sender, and HTTP origins", async () => {
  for (const changes of [
    { TURNSTILE_SECRET_KEY: "1x0000000000000000000000000000000AA" },
    { TURNSTILE_SECRET_KEY: "2x0000000000000000000000000000000AA" },
    { TURNSTILE_SECRET_KEY: "3x0000000000000000000000000000000AA" },
    { CONTACT_FROM_EMAIL: "onboarding@resend.dev" },
  ]) {
    const { runtime, calls } = fixture();
    assert.equal(
      (await handleContact(request(), { ...environment, ...changes }, runtime))
        .status,
      503,
    );
    assert.equal(calls.length, 0);
  }
  const { runtime } = fixture();
  assert.equal(
    (
      await handleContact(
        request(validInput, { origin: "http://rvbtech.example" }),
        { ...environment, CONTACT_ALLOWED_ORIGINS: "http://rvbtech.example" },
        runtime,
      )
    ).status,
    403,
  );
});

test("missing tokens, replayed/failed checks, and wrong hostname/action never send email", async () => {
  for (const turnstileToken of ["", "x".repeat(2049), 42]) {
    const { runtime, calls } = fixture();
    assert.equal(
      (
        await handleContact(
          request({ ...validInput, turnstileToken }),
          environment,
          runtime,
        )
      ).status,
      400,
    );
    assert.equal(calls.length, 0);
  }
  for (const verification of [
    { success: false, "error-codes": ["timeout-or-duplicate"] },
    { success: true, action: "other", hostname: "rvbtech.example" },
    { success: true, action: "contact", hostname: "evil.example" },
    { success: true },
  ]) {
    let calls = 0;
    const { runtime } = fixture({
      fetcher: async () => {
        calls++;
        return Response.json(verification);
      },
    });
    assert.equal(
      (await handleContact(request(), environment, runtime)).status,
      400,
    );
    assert.equal(calls, 1);
  }
});

test("request limits reject before verification; delivery quota rejects before the email API", async () => {
  for (const blockedKind of ["request", "delivery"]) {
    const { runtime, calls } = fixture({
      limiter: {
        async consume(kind) {
          return { allowed: kind !== blockedKind, retryAfter: 600 };
        },
      },
    });
    const response = await handleContact(request(), environment, runtime);
    assert.equal(response.status, 429);
    assert.equal(response.headers.get("retry-after"), "600");
    assert.equal(calls.length, blockedKind === "request" ? 0 : 1);
  }
});

test("provider and limiter outages fail without revealing secrets or returning fake success", async () => {
  const scenarios = [
    {
      limiter: {
        async consume() {
          throw new Error(environment.RESEND_API_KEY);
        },
      },
    },
    {
      fetcher: async () => {
        throw new Error(environment.TURNSTILE_SECRET_KEY);
      },
    },
    {
      fetcher: async () =>
        new Response(environment.RESEND_API_KEY, { status: 500 }),
    },
    {
      fetcher: async (url) =>
        url.includes("siteverify")
          ? Response.json({
              success: true,
              action: "contact",
              hostname: "rvbtech.example",
            })
          : new Response(environment.RESEND_API_KEY, { status: 429 }),
    },
    {
      fetcher: async (url) =>
        url.includes("siteverify")
          ? Response.json({
              success: true,
              action: "contact",
              hostname: "rvbtech.example",
            })
          : Response.json({}),
    },
  ];
  for (const scenario of scenarios) {
    const { runtime } = fixture(scenario);
    const response = await handleContact(request(), environment, runtime);
    assert.ok(response.status >= 500);
    const body = await response.text();
    assert.ok(!body.includes(environment.RESEND_API_KEY));
    assert.ok(!body.includes(environment.TURNSTILE_SECRET_KEY));
  }
});

function fakeStorage() {
  const values = new Map();
  let queue = Promise.resolve();
  const storage = {
    async get(key) {
      return structuredClone(values.get(key));
    },
    async put(key, value) {
      values.set(key, structuredClone(value));
    },
    async delete(key) {
      return values.delete(key);
    },
    async setAlarm() {},
    transaction(callback) {
      const result = queue.then(() => callback(storage));
      queue = result.catch(() => {});
      return result;
    },
  };
  return storage;
}

function limitRequest(kind) {
  return new Request("https://limits.internal/consume", {
    method: "POST",
    body: JSON.stringify({ kind }),
  });
}

test("Durable Object counters atomically cap concurrent requests across limiter instances", async () => {
  const actor = new ContactLimits({ storage: fakeStorage() });
  const binding = {
    idFromName: (name) => name,
    get: () => ({ fetch: (request) => actor.fetch(request) }),
  };
  const limiterA = createCloudflareLimiter(binding);
  const limiterB = createCloudflareLimiter(binding);
  const results = await Promise.all(
    Array.from({ length: 25 }, (_, index) =>
      (index % 2 ? limiterA : limiterB).consume("request", "fixture-hash"),
    ),
  );
  assert.equal(results.filter((result) => result.allowed).length, 5);
  assert.ok(
    results
      .filter((result) => !result.allowed)
      .every((result) => result.retryAfter > 0),
  );
});

test("global hourly and daily mail quotas persist across windows and alarms preserve live counters", async (t) => {
  let now = 1_800_000_000_000;
  t.mock.method(Date, "now", () => now);
  const actor = new ContactLimits({ storage: fakeStorage() });
  for (let hour = 0; hour < 5; hour++) {
    for (let i = 0; i < 10; i++)
      assert.equal(
        (await (await actor.fetch(limitRequest("delivery"))).json()).allowed,
        true,
      );
    assert.equal(
      (await (await actor.fetch(limitRequest("delivery"))).json()).allowed,
      false,
    );
    now += 60 * 60 * 1000 + 1;
  }
  assert.equal(
    (await (await actor.fetch(limitRequest("delivery"))).json()).allowed,
    false,
    "Daily quota survives hourly resets",
  );
  now += 24 * 60 * 60 * 1000;
  assert.equal(
    (await (await actor.fetch(limitRequest("delivery"))).json()).allowed,
    true,
  );
  await actor.alarm();
  for (let i = 0; i < 9; i++)
    assert.equal(
      (await (await actor.fetch(limitRequest("delivery"))).json()).allowed,
      true,
    );
  assert.equal(
    (await (await actor.fetch(limitRequest("delivery"))).json()).allowed,
    false,
    "An old alarm must not erase a new window",
  );
});

test("development request limiter is bounded and blocks a sixth attempt", async () => {
  const limiter = createDevelopmentLimiter();
  for (let i = 0; i < 5; i++)
    assert.equal((await limiter.consume("request", "local")).allowed, true);
  assert.equal((await limiter.consume("request", "local")).allowed, false);
});
