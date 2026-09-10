export const LOCALES = ["en", "hi", "mr", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Query parameter that selects the language, e.g. `/products?lang=hi`. */
export const LOCALE_PARAM = "lang";

/** Remembers the last chosen language across navigations. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Header the middleware uses to hand the resolved locale to the server. */
export const LOCALE_HEADER = "x-ndipl-locale";

/** Locales written right-to-left; used for the `dir` attribute. */
const RTL_LOCALES: Locale[] = ["ar"];

export function isRtl(locale: string) {
  return RTL_LOCALES.includes(locale as Locale);
}

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && LOCALES.includes(value as Locale);
}

export const LOCALE_LABELS: Record<Locale, { name: string; short: string }> = {
  en: { name: "English", short: "EN" },
  hi: { name: "हिन्दी", short: "HI" },
  mr: { name: "मराठी", short: "MR" },
  ar: { name: "العربية", short: "AR" },
};
