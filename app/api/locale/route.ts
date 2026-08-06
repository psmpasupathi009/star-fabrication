import { NextRequest, NextResponse } from "next/server";
import { isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { locale?: string };
    if (!isLocale(body.locale)) {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }
    const locale: Locale = body.locale;
    const res = NextResponse.json({ locale });
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      httpOnly: false,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
