"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { faqItems } from "@/lib/faq";
import { cn } from "@/lib/utils/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell bg-white">
      <div className="section-inner">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="Site visits, materials, timelines, and payment — answered briefly."
        />
        <ul className="mx-auto max-w-2xl divide-y divide-black/8 border-y border-black/8">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[16px] font-semibold tracking-tight text-foreground sm:text-[17px]">
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
                  <p className="pb-5 pr-8 text-[15px] leading-relaxed text-muted sm:text-[16px]">
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
