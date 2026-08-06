import type { Locale } from "@/lib/i18n/config";

/** Prefer Tamil when locale is ta and a non-empty Tamil string exists; else English. */
export function pickLocalized(
  en: string | null | undefined,
  ta: string | null | undefined,
  locale: Locale
): string {
  const english = (en ?? "").trim();
  const tamil = (ta ?? "").trim();
  if (locale === "ta" && tamil) return tamil;
  return english || tamil;
}

export function pickLocalizedNullable(
  en: string | null | undefined,
  ta: string | null | undefined,
  locale: Locale
): string | null {
  const value = pickLocalized(en, ta, locale);
  return value || null;
}
