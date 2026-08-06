"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils/cn";

export function BackToTopFab() {
  const { dict } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="/#top"
      aria-label={dict.footer.backToTop}
      className={cn(
        "fixed right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#1d1d1f] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-[opacity,transform] hover:scale-105",
        "bottom-20 md:bottom-24",
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <ArrowUp className="size-6" strokeWidth={2.25} />
    </a>
  );
}
