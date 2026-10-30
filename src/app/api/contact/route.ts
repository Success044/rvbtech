import { Redis } from "@upstash/redis";

import { handleContact } from "@/lib/contact/handler";
import {
  createDevelopmentLimiter,
  createUpstashLimiter,
} from "@/lib/contact/rate-limit";

const developmentLimiter = createDevelopmentLimiter();

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const productionLimiter =
  redisUrl && redisToken
    ? createUpstashLimiter(
        new Redis({
          url: redisUrl,
          token: redisToken,
        }),
      )
    : undefined;

function getVercelClientIp(request: Request): string {
  const forwardedFor =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");

  return forwardedFor?.split(",")[0]?.trim() ?? "";
}

export async function POST(request: Request) {
  const production = process.env.NODE_ENV === "production";

  return handleContact(
    request,
    {
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
      CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
      TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
      CONTACT_ALLOWED_ORIGINS: process.env.CONTACT_ALLOWED_ORIGINS,
    },
    {
      production,
      clientIp: production ? getVercelClientIp(request) : "127.0.0.1",
      limiter: production ? productionLimiter : developmentLimiter,
    },
  );
}
