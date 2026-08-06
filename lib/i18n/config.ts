export const LOCALES = ["en", "ta"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "sf_locale";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "ta";
}

export function parseLocale(value: string | null | undefined): Locale {
  if (value === "ta") return "ta";
  return "en";
}
