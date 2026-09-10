import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  isLocale,
} from "./routing";

/**
 * The locale is chosen by the `?lang=` query parameter (resolved in
 * middleware, which forwards it on a request header) and otherwise falls back
 * to the visitor's remembered choice, then to English.
 */
export default getRequestConfig(async () => {
  const fromHeader = (await headers()).get(LOCALE_HEADER);
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;

  const locale = isLocale(fromHeader)
    ? fromHeader
    : isLocale(fromCookie)
      ? fromCookie
      : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
