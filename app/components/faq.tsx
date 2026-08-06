"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";
import { cn } from "@/lib/utils/cn";

export function Faq() {
  const { dict } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell bg-white">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.faq.eyebrow}
          title={dict.faq.title}
          description={dict.faq.description}
        />
        <ul className="mx-auto max-w-3xl divide-y divide-black/8 border-y border-black/8">
          {dict.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left sm:py-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[17px] font-semibold tracking-tight text-foreground">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-1 size-4 shrink-0 text-muted transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen ? (
                  <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted sm:pb-6 sm:text-[17px]">
                    {item.answer}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
