import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  parseLocale,
  type Locale,
} from "@/lib/i18n/config";

function preferTamilFromAcceptLanguage(header: string | null): boolean {
  if (!header) return false;
  const parts = header.split(",").map((p) => p.trim().toLowerCase());
  for (const part of parts) {
    const tag = part.split(";")[0]?.trim() ?? "";
    if (tag === "ta" || tag.startsWith("ta-")) return true;
  }
  return false;
}

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (fromCookie === "en" || fromCookie === "ta") {
    return fromCookie;
  }

  const hdrs = await headers();
  if (preferTamilFromAcceptLanguage(hdrs.get("accept-language"))) {
    return "ta";
  }

  return DEFAULT_LOCALE;
}

export { parseLocale };
