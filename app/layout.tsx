import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Tamil, Oswald } from "next/font/google";
import "./globals.css";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { getSiteUrl, site } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name} | Metal Fabrication in ${site.location}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/gallery/og.jpg", width: 1600, height: 1066, alt: site.name }],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale === "ta" ? "ta" : "en"}
      className={`${dmSans.variable} ${oswald.variable} ${notoTamil.variable} h-full antialiased`}
    >
      <body
        id="top"
        className={`flex min-h-full flex-col font-sans ${locale === "ta" ? "font-tamil-ui" : ""}`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
        >
          {dict.skipToContent}
        </a>
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
