import { NextResponse, type NextRequest } from "next/server";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  LOCALE_PARAM,
  isLocale,
} from "@/i18n/routing";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Resolves the request locale from `?lang=`, falling back to the cookie set by
 * an earlier choice. The result is forwarded to the server on a header (read by
 * `src/i18n/request.ts`) and persisted so links without the parameter keep the
 * visitor's language.
 */
export default function proxy(request: NextRequest) {
  const requested = request.nextUrl.searchParams.get(LOCALE_PARAM);
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;

  const locale = isLocale(requested)
    ? requested
    : isLocale(remembered)
      ? remembered
      : DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER, locale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  if (isLocale(requested) && requested !== remembered) {
    response.cookies.set(LOCALE_COOKIE, requested, {
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Everything except API routes, Next internals and files with an extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
