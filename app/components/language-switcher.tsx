"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
  compact?: boolean;
};

export function LanguageSwitcher({
  locale,
  className,
  compact = false,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  async function setLocale(next: Locale) {
    if (next === locale || pending) return;
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: next }),
    });
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-white/80 p-0.5 text-[11px] font-semibold tracking-tight",
        compact ? "gap-0" : "gap-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        disabled={pending}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "en"
            ? "bg-[#1d1d1f] text-white"
            : "text-muted hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        disabled={pending}
        aria-pressed={locale === "ta"}
        onClick={() => setLocale("ta")}
        className={cn(
          "rounded-full px-2.5 py-1 transition-colors",
          locale === "ta"
            ? "bg-[#1d1d1f] text-white"
            : "text-muted hover:text-foreground"
        )}
      >
        தமிழ்
      </button>
    </div>
  );
}
