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
    <footer className="relative border-t border-gold/15 bg-black/75">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/45 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <StarLogo showTamil={Boolean(site.nameTamil)} size="sm" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.tagline}. Metal fabrication crafted in {site.location}.
          </p>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">Contact</p>
          <ul className="mt-4 space-y-3">
            {contacts.map((c) => (
              <li key={c.phone}>
                <a
                  href={telHref(c.phone)}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
                >
                  <Phone className="size-3.5 shrink-0" />
                  {c.name} ({c.title}) — {c.phoneDisplay}
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-2 text-sm text-muted">
              <MapPin className="size-3.5 shrink-0" />
              {site.location}
              {site.locationTamil ? ` · ${site.locationTamil}` : ""}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={isAdmin ? "/admin/dashboard" : "/admin/login"}
              className="uppercase tracking-wider transition-colors hover:text-gold"
            >
              Admin
            </Link>
            <a href="#top" className="uppercase tracking-wider transition-colors hover:text-gold">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
