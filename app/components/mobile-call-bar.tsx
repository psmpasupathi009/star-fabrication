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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2">
        {contacts.map((c) => (
          <a
            key={c.phone}
            href={telHref(c.phone)}
            className="flex h-14 items-center justify-center gap-2 border-r border-black/5 text-sm font-medium text-foreground last:border-r-0 active:bg-elevated"
          >
            <Phone className="size-3.5 text-gold-dim" />
            {c.name}
          </a>
        ))}
      </div>
    </div>
  );
}
