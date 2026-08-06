"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, Phone, X } from "lucide-react";
import { LanguageSwitcher } from "@/app/components/language-switcher";
import { StarLogo } from "@/app/components/star-logo";
import type { ContactPerson } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/locale-provider";
import { navLinks, telHref } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

type AuthUser = { email: string; role: string } | null;

type SiteHeaderProps = {
  contacts: ContactPerson[];
  locale: Locale;
  nameEn?: string;
  nameTamil?: string | null;
};

export function SiteHeader({
  contacts,
  locale,
  nameEn = "Star Fabrication",
  nameTamil,
}: SiteHeaderProps) {
  const { dict } = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser>(null);
  const primary = contacts[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data: { user?: AuthUser }) => {
        if (data.user?.role?.toUpperCase() === "ADMIN") {
          setUser(data.user);
        }
      })
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/me", { method: "DELETE" });
    setUser(null);
    router.push("/");
  }

  const isAdmin = user?.role?.toUpperCase() === "ADMIN";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
          scrolled || open
            ? "border-black/5 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            : "border-transparent bg-white/40 backdrop-blur-md"
        )}
      >
        <div className="section-inner flex h-(--header-h) items-center justify-between gap-3 sm:gap-4">
          <Link href="/#top" className="min-w-0 shrink" onClick={() => setOpen(false)}>
            <StarLogo
              size="sm"
              tone="on-light"
              nameEn={nameEn}
              nameTamil={nameTamil}
              locale={locale}
              showSecondary={false}
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:gap-7 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[12px] font-normal tracking-tight text-foreground/80 hover:text-foreground"
              >
                {dict.nav[link.key]}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex lg:gap-3">
            <LanguageSwitcher locale={locale} />
            {isAdmin ? (
              <>
                <span className="hidden max-w-35 truncate text-xs text-muted lg:inline">
                  {user?.email}
                </span>
                <Link
                  href="/admin/dashboard"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#1d1d1f] px-3 text-xs font-medium text-white hover:bg-black"
                >
                  <LayoutDashboard className="size-3" />
                  {dict.header.dashboard}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/10 px-3 text-xs font-medium text-muted hover:text-foreground"
                >
                  <LogOut className="size-3" />
                  {dict.header.logOut}
                </button>
              </>
            ) : primary ? (
              <a
                href={telHref(primary.phone)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-gold px-3.5 text-xs font-semibold text-[#1d1d1f] hover:brightness-105"
              >
                <Phone className="size-3.5" />
                <span className="hidden sm:inline">{primary.phoneDisplay}</span>
                <span className="sm:hidden">{dict.header.call}</span>
              </a>
            ) : null}
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher locale={locale} compact />
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center text-foreground"
              aria-label={open ? dict.header.closeMenu : dict.header.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-60 bg-white pt-16 transition-opacity md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <nav
          className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto px-6 pb-[calc(5.5rem+env(safe-area-inset-bottom))]"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={open ? undefined : -1}
              onClick={() => setOpen(false)}
              className="border-b border-black/5 py-4 text-2xl font-semibold tracking-tight text-foreground"
            >
              {dict.nav[link.key]}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            {isAdmin ? (
              <>
                <Link
                  href="/admin/dashboard"
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#1d1d1f] text-sm font-medium text-white"
                >
                  {dict.header.dashboard}
                </Link>
                <button
                  type="button"
                  tabIndex={open ? undefined : -1}
                  onClick={logout}
                  className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 text-sm font-medium"
                >
                  {dict.header.logOut}
                </button>
              </>
            ) : (
              contacts.map((c) => (
                <a
                  key={c.phone}
                  href={telHref(c.phone)}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold text-sm font-medium text-[#1d1d1f]"
                >
                  <Phone className="size-4" />
                  {dict.header.call} {c.name}
                </a>
              ))
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
