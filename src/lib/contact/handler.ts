import type { ContactLimiter } from "./rate-limit.ts";
import {
  isContactEmail,
  maxContactBodyBytes,
  validateContactFields,
} from "./validation.ts";

export type ContactEnvironment = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_ALLOWED_ORIGINS?: string;
};

type ContactRuntime = {
  production: boolean;
  clientIp: string;
  limiter?: ContactLimiter;
  fetcher?: typeof fetch;
};

const testSecrets = new Set([
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA",
]);

function reply(
  status: number,
  body: object,
  extraHeaders: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      ...extraHeaders,
    },
  });
}

function unavailable() {
  return reply(503, {
    message:
      "We can’t send your enquiry right now. Please call or email us instead.",
  });
}

async function readLimitedJson(request: Request): Promise<unknown> {
  const declared = Number(request.headers.get("content-length"));
  if (declared > maxContactBodyBytes) throw new RangeError("Request too large");
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("Missing body");
  const chunks: Uint8Array[] = [];
  let length = 0;
  const deadline = Date.now() + 8000;
  const readPart = async () => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        reader.read(),
        new Promise<never>((_, reject) => {
          timer = setTimeout(
            () => reject(new Error("Request timed out")),
            Math.max(1, deadline - Date.now()),
          );
        }),
      ]);
    } finally {
      clearTimeout(timer);
    }
  };
  try {
    while (true) {
      const { done, value } = await readPart();
      if (done) break;
      length += value.byteLength;
      if (length > maxContactBodyBytes) {
        throw new RangeError("Request too large");
      }
      chunks.push(value);
    }
  } catch (error) {
    void reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

export async function handleContact(
  request: Request,
  env: ContactEnvironment,
  runtime: ContactRuntime,
): Promise<Response> {
  if (request.method !== "POST")
    return reply(
      405,
      { message: "Use the enquiry form to send a message." },
      { allow: "POST" },
    );
  const origin = request.headers.get("origin");
  const allowedOrigins = (env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (runtime.production && !allowedOrigins.length) return unavailable();
  const isLocal = (value: string) => {
    try {
      const url = new URL(value);
      return (
        url.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(url.hostname)
      );
    } catch {
      return false;
    }
  };
  if (
    !origin ||
    (!allowedOrigins.includes(origin) &&
      (runtime.production || !isLocal(origin))) ||
    request.headers.get("sec-fetch-site") === "cross-site" ||
    (runtime.production && !origin.startsWith("https://"))
  ) {
    return reply(403, {
      message: "Please submit your enquiry from the website’s contact page.",
    });
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !==
    "application/json"
  )
    return reply(415, {
      message: "Please use the contact form to send your enquiry.",
    });

  const {
    RESEND_API_KEY: apiKey,
    CONTACT_FROM_EMAIL: from,
    CONTACT_TO_EMAIL: to,
    TURNSTILE_SECRET_KEY: secret,
  } = env;
  if (
    !apiKey ||
    !from ||
    !to ||
    !secret ||
    !runtime.limiter ||
    !runtime.clientIp ||
    !isContactEmail(from) ||
    !isContactEmail(to)
  )
    return unavailable();
  const developmentTest = !runtime.production && testSecrets.has(secret);
  if (
    runtime.production &&
    (testSecrets.has(secret) ||
      from.endsWith("@resend.dev") ||
      !allowedOrigins.length)
  )
    return unavailable();

  const fetcher = runtime.fetcher ?? fetch;
  try {
    const ipHash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(runtime.clientIp),
        ),
      ),
      (value) => value.toString(16).padStart(2, "0"),
    ).join("");
    const initialLimit = await runtime.limiter.consume("request", ipHash);
    if (!initialLimit.allowed)
      return reply(
        429,
        {
          message:
            "You’ve tried a few times. Please wait before sending another enquiry.",
        },
        { "retry-after": String(initialLimit.retryAfter) },
      );

    let input: unknown;
    try {
      input = await readLimitedJson(request);
    } catch (error) {
      return reply(error instanceof RangeError ? 413 : 400, {
        message:
          "Your enquiry could not be read. Keep the message within the form’s limits and try again.",
      });
    }
    if (!input || typeof input !== "object" || Array.isArray(input))
      return reply(400, { message: "Check the form and try again." });
    const record = input as Record<string, unknown>;
    const allowedFields = new Set([
      "name",
      "phone",
      "email",
      "service",
      "location",
      "message",
      "locale",
      "website",
      "turnstileToken",
      "submissionId",
    ]);
    if (Object.keys(record).some((key) => !allowedFields.has(key)))
      return reply(400, { message: "Check the form and try again." });
    if (
      record.locale !== undefined &&
      record.locale !== "en" &&
      record.locale !== "ne"
    )
      return reply(400, { message: "Check the form and try again." });
    if (typeof record.website !== "string" || record.website.trim())
      return reply(400, {
        message:
          "Your enquiry could not be accepted. Please call or email us instead.",
      });
    const { fields, errors } = validateContactFields(record);
    if (Object.keys(errors).length)
      return reply(422, {
        message: "Please check the highlighted fields.",
        errors,
      });
    if (
      typeof record.submissionId !== "string" ||
      !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(
        record.submissionId,
      )
    )
      return reply(400, { message: "Refresh the contact page and try again." });
    if (
      typeof record.turnstileToken !== "string" ||
      !record.turnstileToken.length ||
      record.turnstileToken.length > 2048
    )
      return reply(400, {
        message: "Complete the security check, then try again.",
      });

    const verificationResponse = await fetcher(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          secret,
          response: record.turnstileToken,
          remoteip: runtime.clientIp,
        }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!verificationResponse.ok) return unavailable();
    const verification = (await verificationResponse.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };
    if (
      verification.success !== true ||
      (!developmentTest &&
        (verification.action !== "contact" ||
          verification.hostname !== new URL(origin).hostname))
    ) {
      return reply(400, {
        message:
          "The security check expired or could not be verified. Please try again.",
      });
    }
    const deliveryLimit = await runtime.limiter.consume("delivery", "contact");
    if (!deliveryLimit.allowed)
      return reply(
        429,
        {
          message:
            "Online enquiries are temporarily busy. Please call or email us instead.",
        },
        { "retry-after": String(deliveryLimit.retryAfter) },
      );

    const services: Record<string, string> = {
      plumbing: "Plumbing",
      electrical: "Electrical",
      both: "Plumbing and electrical",
      "not-sure": "General",
    };
    const servicesNepali: Record<string, string> = {
      plumbing: "प्लम्बिङ",
      electrical: "विद्युतीय सेवा",
      both: "प्लम्बिङ तथा विद्युतीय सेवा",
      "not-sure": "सामान्य जिज्ञासा",
    };
    const enquiryText = `Name: ${fields.name}\nPhone: ${fields.phone || "Not provided"}\nEmail: ${fields.email || "Not provided"}\nService: ${services[fields.service]}\nLocation: ${fields.location || "Not provided"}\n\n${fields.message}\n\nSubmitted via the R.V.B Tech contact page.`;
    const result = await fetcher("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "idempotency-key": `contact/${record.submissionId}`,
      },
      body: JSON.stringify({
        from: `R.V.B Tech <${from}>`,
        to: [to],
        ...(fields.email ? { reply_to: fields.email } : {}),
        subject: `[R.V.B Tech] ${services[fields.service]} enquiry`,
        text: enquiryText,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!result.ok)
      return reply(502, {
        message:
          "Your enquiry could not be sent. Your message is still here; please try again or contact us directly.",
      });
    const receipt = (await result.json()) as { id?: string };
    if (typeof receipt.id !== "string" || !receipt.id) return unavailable();
    let copySent = false;
    if (fields.email) {
      try {
        const visitorLocale = record.locale === "ne" ? "ne" : "en";
        const serviceName =
          visitorLocale === "ne"
            ? servicesNepali[fields.service]
            : services[fields.service];
        const location =
          fields.location ||
          (visitorLocale === "ne" ? "उल्लेख गरिएको छैन" : "Not provided");
        const emailSubject =
          visitorLocale === "ne"
            ? "तपाईंको जिज्ञासा प्राप्त भयो — R.V.B Tech"
            : "We received your enquiry — R.V.B Tech";
        const emailText =
          visitorLocale === "ne"
            ? `नमस्कार ${fields.name},\n\nR.V.B Tech लाई सम्पर्क गर्नुभएकोमा धन्यवाद।\n\nतपाईंको जिज्ञासा प्राप्त भएको छ। तपाईंले पठाउनुभएका विवरण:\n\nसेवा: ${serviceName}\nस्थान: ${location}\nतपाईंको सन्देश:\n${fields.message}\n\nहाम्रो टोलीले तपाईंको अनुरोध हेरेर सम्पर्क गर्नेछ।\n\nशुभेच्छासहित,\nR.V.B Tech टोली`
            : `Hello ${fields.name},\n\nThank you for reaching out to R.V.B Tech.\n\nWe’ve received your enquiry. Here are the details you submitted:\n\nService: ${serviceName}\nLocation: ${location}\nYour message:\n${fields.message}\n\nOur team will review your request and get in touch with you.\n\nRegards,\nR.V.B Tech Team`;
        const copyResult = await fetcher("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
            "idempotency-key": `contact/${record.submissionId}/sender-copy`,
          },
          body: JSON.stringify({
            from: `R.V.B Tech <${from}>`,
            to: [fields.email],
            reply_to: to,
            subject: emailSubject,
            text: emailText,
          }),
          signal: AbortSignal.timeout(10_000),
        });
        if (copyResult.ok) {
          const copyReceipt = (await copyResult.json()) as { id?: string };
          copySent = typeof copyReceipt.id === "string" && !!copyReceipt.id;
        }
      } catch {
        copySent = false;
      }
    }
    return reply(200, {
      message: fields.email
        ? copySent
          ? "Your enquiry was submitted to our team. Resend accepted a copy for sending to your email address; inbox delivery may vary."
          : "Your enquiry was submitted to our team, but we couldn’t confirm that Resend accepted the email copy."
        : "Your enquiry was submitted to our team. We’ll get back to you using the contact details you provided.",
    });
  } catch {
    // Do not log the visitor's message, contact details, tokens, or provider credentials.
    return unavailable();
  }
}
