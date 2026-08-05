import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { StarLogo } from "@/app/components/star-logo";
import type { ContactPerson, SiteData } from "@/lib/content";
import { navLinks, telHref } from "@/lib/site";

type SiteFooterProps = {
  site: SiteData;
  contacts: ContactPerson[];
  isAdmin?: boolean;
};

export function SiteFooter({ site, contacts, isAdmin }: SiteFooterProps) {
  return (
    <footer className="border-t border-black/5 bg-elevated text-[12px] leading-relaxed text-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <StarLogo showTamil={Boolean(site.nameTamil)} size="sm" tone="on-light" />
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed">
            {site.tagline}. Metal fabrication crafted in {site.location}.
          </p>
        </div>

        <div>
          <p className="mb-3 font-semibold text-foreground">Explore</p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-foreground hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 font-semibold text-foreground">Contact</p>
          <ul className="space-y-2">
            {contacts.map((c) => (
              <li key={c.phone}>
                <a
                  href={telHref(c.phone)}
                  className="inline-flex items-center gap-2 hover:text-foreground hover:underline"
                >
                  <Phone className="size-3 shrink-0 text-gold-dim" />
                  {c.name} — {c.phoneDisplay}
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-3 shrink-0 text-gold-dim" />
              {site.location}
              {site.locationTamil ? ` · ${site.locationTamil}` : ""}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>
            Copyright © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className="hover:text-foreground hover:underline"
            >
              Admin
            </Link>
            <a href="#top" className="hover:text-foreground hover:underline">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
