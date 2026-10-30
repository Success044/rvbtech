import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const isDefaultLocaleRewrite =
    request.headers.get("x-next-intl-locale") === routing.defaultLocale &&
    (request.nextUrl.pathname === "/en" ||
      request.nextUrl.pathname.startsWith("/en/"));

  if (isDefaultLocaleRewrite) return NextResponse.next();

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
