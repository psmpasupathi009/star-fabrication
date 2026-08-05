"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, Phone, X } from "lucide-react";
import { StarLogo } from "@/app/components/star-logo";
import type { ContactPerson } from "@/lib/content";
import { navLinks, telHref } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

type AuthUser = { email: string; role: string } | null;

type SiteHeaderProps = {
  contacts: ContactPerson[];
};

export function SiteHeader({ contacts }: SiteHeaderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || open
            ? "border-b border-gold/15 bg-black/92 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
          <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
            <StarLogo size="sm" />
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-xs uppercase tracking-[0.2em] text-muted hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            {isAdmin ? (
              <>
                <span className="max-w-35 truncate text-xs text-muted">{user?.email}</span>
                <Link
                  href="/admin/dashboard"
                  className="inline-flex h-9 items-center gap-1.5 border border-gold/30 px-3 font-display text-[0.65rem] uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-black"
                >
                  <LayoutDashboard className="size-3" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-9 items-center gap-1.5 border border-white/20 px-3 font-display text-[0.65rem] uppercase tracking-wider text-muted transition-colors hover:text-white"
                >
                  <LogOut className="size-3" />
                  Log out
                </button>
              </>
            ) : (
              contacts.map((c) => (
                <a
                  key={c.phone}
                  href={telHref(c.phone)}
                  className="inline-flex h-9 items-center gap-1.5 border border-gold/30 px-3 font-display text-[0.65rem] uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-black"
                >
                  <Phone className="size-3" />
                  {c.phoneDisplay}
                </a>
              ))
            )}
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/98 pt-20 transition-all duration-300 md:hidden",
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1 px-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 font-display text-2xl uppercase tracking-wider text-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            {isAdmin ? (
              <>
                <Link
                  href="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center gap-2 bg-gold font-display text-sm font-semibold uppercase tracking-wider text-black"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-12 items-center justify-center gap-2 border border-white/20 font-display text-sm uppercase tracking-wider text-white"
                >
                  Log out
                </button>
              </>
            ) : (
              contacts.map((c) => (
                <a
                  key={c.phone}
                  href={telHref(c.phone)}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center gap-2 bg-gold font-display text-sm font-semibold uppercase tracking-wider text-black"
                >
                  <Phone className="size-4" />
                  Call {c.name}
                </a>
              ))
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
