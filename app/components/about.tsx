"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import type { AboutData } from "@/lib/content";
import { telHref } from "@/lib/site";

type AboutProps = {
  about: AboutData;
};

export function About({ about }: AboutProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
        />

        <div className="flex flex-col items-center gap-4 text-center">
          <Button type="button" size="lg" onClick={() => setOpen(true)}>
            Learn more about us
          </Button>
          {about.footerNote ? (
            <p className="max-w-xl text-sm leading-relaxed text-muted">{about.footerNote}</p>
          ) : null}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-black/90 p-4 sm:items-center"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-detail-title"
        >
          <div
            className="relative max-h-[88dvh] w-full max-w-3xl overflow-y-auto border border-gold/25 bg-surface p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex size-10 items-center justify-center text-muted hover:text-gold"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>

            <p className="font-display text-xs uppercase tracking-[0.28em] text-gold">
              {about.eyebrow}
            </p>
            <h3
              id="about-detail-title"
              className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-foreground sm:text-3xl"
            >
              {about.title}
            </h3>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted sm:text-base">
              {about.details.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {about.people.length > 0 ? (
              <div className="mt-10">
                <p className="font-display text-xs uppercase tracking-[0.22em] text-gold">
                  Owners
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {about.people.map((p) => (
                    <div
                      key={`${p.name}-${p.phone}`}
                      className="border border-white/10 bg-background/60 p-4"
                    >
                      {p.imageUrl ? (
                        <div className="relative mb-4 aspect-square w-full max-w-40 overflow-hidden border border-gold/20">
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            sizes="160px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <p className="font-display text-xl font-semibold uppercase tracking-wide text-foreground">
                        {p.name}
                      </p>
                      {p.title ? (
                        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-gold">
                          {p.title}
                        </p>
                      ) : null}
                      {p.phone ? (
                        <a
                          href={telHref(p.phone)}
                          className="mt-3 inline-block text-sm text-muted hover:text-gold"
                        >
                          {p.phoneDisplay || p.phone}
                        </a>
                      ) : null}
                      {p.extra ? (
                        <p className="mt-3 text-sm leading-relaxed text-muted">{p.extra}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-8">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
