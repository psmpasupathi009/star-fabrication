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
    <section id="about" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
        />

        <div className="flex flex-col items-center gap-5 text-center">
          <button type="button" className="apple-link-gold" onClick={() => setOpen(true)}>
            Learn more <span aria-hidden>›</span>
          </button>
          {about.footerNote ? (
            <p className="max-w-xl text-[15px] leading-relaxed text-muted">{about.footerNote}</p>
          ) : null}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-detail-title"
        >
          <div
            className="relative max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-elevated text-muted hover:text-foreground"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </button>

            <p className="text-sm font-semibold text-gold-dim">{about.eyebrow}</p>
            <h3
              id="about-detail-title"
              className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-foreground"
            >
              {about.title}
            </h3>

            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted">
              {about.details.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {about.people.length > 0 ? (
              <div className="mt-10">
                <p className="text-sm font-semibold text-foreground">Owners</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {about.people.map((p) => (
                    <div
                      key={`${p.name}-${p.phone}`}
                      className="rounded-2xl bg-elevated p-5"
                    >
                      {p.imageUrl ? (
                        <div className="relative mb-4 aspect-square w-full max-w-36 overflow-hidden rounded-2xl">
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            sizes="144px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <p className="font-display text-xl font-semibold uppercase tracking-tight text-foreground">
                        {p.name}
                      </p>
                      {p.title ? (
                        <p className="mt-1 text-sm text-gold-dim">{p.title}</p>
                      ) : null}
                      {p.phone ? (
                        <a
                          href={telHref(p.phone)}
                          className="mt-3 inline-block text-sm text-muted hover:text-foreground"
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
