"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/site";

type WhatsAppFabProps = {
  phone: string;
  /** Hide on mobile when call bar already has WhatsApp */
  hideOnMobile?: boolean;
};

export function WhatsAppFab({ phone, hideOnMobile = true }: WhatsAppFabProps) {
  if (!phone) return null;
  const href = whatsappUrl(
    "Hello Star Fabrication, I’d like a quote for metal fabrication work.",
    phone
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={
        hideOnMobile
          ? "fixed bottom-6 right-5 z-40 hidden size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 md:inline-flex"
          : "fixed bottom-20 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 md:bottom-6"
      }
    >
      <MessageCircle className="size-7" strokeWidth={2} />
    </a>
  );
}
