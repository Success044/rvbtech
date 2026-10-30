import {
  type ContactEnvironment,
  handleContact,
} from "../../src/lib/contact/handler.ts";
import {
  type ContactLimitNamespace,
  createCloudflareLimiter,
} from "../../src/lib/contact/rate-limit.ts";

type Environment = ContactEnvironment & {
  CONTACT_LIMITS?: ContactLimitNamespace;
};

// This adapter is for the Cloudflare Pages hosting plan, not the local Next server.
export function onRequest(context: { request: Request; env: Environment }) {
  return handleContact(context.request, context.env, {
    production: true,
    clientIp: context.request.headers.get("CF-Connecting-IP") ?? "",
    limiter: context.env.CONTACT_LIMITS
      ? createCloudflareLimiter(context.env.CONTACT_LIMITS)
      : undefined,
  });
}
