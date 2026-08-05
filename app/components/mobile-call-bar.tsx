"use client";

import { Phone } from "lucide-react";
import type { ContactPerson } from "@/lib/content";
import { telHref } from "@/lib/site";

type MobileCallBarProps = {
  contacts: ContactPerson[];
};

export function MobileCallBar({ contacts }: MobileCallBarProps) {
  if (!contacts.length) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-black/96 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-px bg-gold/20">
        {contacts.map((c) => (
          <a
            key={c.phone}
            href={telHref(c.phone)}
            className="flex h-14 items-center justify-center gap-2 bg-background font-display text-xs uppercase tracking-wider text-gold transition-colors active:bg-surface-hover"
          >
            <Phone className="size-3.5" />
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}
