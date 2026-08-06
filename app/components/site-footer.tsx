"use client";

import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "@/app/components/language-switcher";
import { StarLogo } from "@/app/components/star-logo";
import type { ContactPerson, LocalizedSite } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/locale-provider";
import { navLinks, telHref } from "@/lib/site";

type SiteFooterProps = {
  site: LocalizedSite;
  contacts: ContactPerson[];
  locale: Locale;
  nameEn?: string;
  nameTamil?: string | null;
  isAdmin?: boolean;
};

export function SiteFooter({
  site,
  contacts,
  locale,
  nameEn = "Star Fabrication",
  nameTamil,
  isAdmin,
}: SiteFooterProps) {
  const { dict } = useLocale();

  return (
    <footer className="border-t border-black/5 bg-elevated text-[12px] leading-relaxed text-muted">
      <div className="section-inner grid gap-8 py-10 sm:gap-10 sm:py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-14">
        <div className="md:col-span-2 lg:col-span-1">
          <StarLogo
            nameEn={nameEn}
            nameTamil={nameTamil}
            locale={locale}
            size="sm"
            tone="on-light"
          />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed">
            {site.tagline}. {dict.footer.taglineSuffix} {site.location}.
          </p>
          <div className="mt-4">
            <LanguageSwitcher locale={locale} />
          </div>
        </div>

        <div>
          <p className="mb-3 font-semibold text-foreground">{dict.footer.explore}</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-foreground hover:underline">
                  {dict.nav[link.key]}
                </a>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-foreground hover:underline">
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold text-foreground">{dict.footer.contact}</p>
          <ul className="space-y-2">
            {contacts.map((c) => (
              <li key={c.phone}>
                <a
                  href={telHref(c.phone)}
                  className="inline-flex items-center gap-2 hover:text-foreground hover:underline"
                >
                  <Phone className="size-3 shrink-0 text-gold-dim" />
                  <span>{c.phoneDisplay}</span>
                </a>
              </li>
            ))}
            <li className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 size-3 shrink-0 text-gold-dim" />
              <span>
                {site.address}
                {site.pincode ? ` — ${site.pincode}` : ""}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="section-inner flex flex-col items-start justify-between gap-3 py-4 sm:flex-row sm:items-center sm:py-5">
          <p>
            Copyright © {new Date().getFullYear()} {site.name}. {dict.footer.copyright}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-foreground hover:underline">
              {dict.privacy.title}
            </Link>
            <Link
              href={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className="hover:text-foreground hover:underline"
            >
              {dict.footer.admin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
