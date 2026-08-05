"use client";

import { MessageCircle, Phone } from "lucide-react";
import type { ContactPerson } from "@/lib/content";
import { telHref, whatsappUrl } from "@/lib/site";

type MobileCallBarProps = {
  contacts: ContactPerson[];
  whatsappPhone: string;
};

export function MobileCallBar({ contacts, whatsappPhone }: MobileCallBarProps) {
  const primary = contacts[0];
  if (!primary && !whatsappPhone) return null;

  const wa = whatsappPhone || primary?.phone;
  const callPhone = primary?.phone;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/8 bg-white/95 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-2">
        {callPhone ? (
          <a
            href={telHref(callPhone)}
            className="flex h-14 items-center justify-center gap-2 border-r border-black/5 text-sm font-medium text-foreground active:bg-elevated"
          >
            <Phone className="size-3.5 text-gold-dim" />
            Call
          </a>
        ) : (
          <span className="flex h-14 items-center justify-center text-sm text-muted">Call</span>
        )}
        {wa ? (
          <a
            href={whatsappUrl(
              "Hello Star Fabrication, I’d like a quote for metal fabrication work.",
              wa
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2 text-sm font-medium text-foreground active:bg-elevated"
          >
            <MessageCircle className="size-3.5 text-[#25D366]" />
            WhatsApp
          </a>
        ) : null}
      </div>
    </div>
  );
}
