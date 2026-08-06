"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import type { LocalizedAbout } from "@/lib/content";
import { useLocale } from "@/lib/i18n/locale-provider";
import { telHref } from "@/lib/site";

type AboutProps = {
  about: LocalizedAbout;
};

export function About({ about }: AboutProps) {
  const { dict } = useLocale();
  const [open, setOpen] = useState(false);

  const processSteps = [
    { title: dict.about.processMeasure, text: dict.about.processMeasureText },
    { title: dict.about.processFabricate, text: dict.about.processFabricateText },
    { title: dict.about.processInstall, text: dict.about.processInstallText },
  ];

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
    <section id="about" className="section-shell bg-white">
      <div className="section-inner">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          description={about.description}
        />

        <ol className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-3 sm:gap-10">
          {processSteps.map((step, i) => (
            <li key={step.title} className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dim">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-lg font-bold uppercase tracking-tight text-foreground sm:text-xl">
                {step.title}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted sm:text-[17px]">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12 sm:gap-5">
          <button type="button" className="apple-link-gold" onClick={() => setOpen(true)}>
            {dict.about.learnMore} <span aria-hidden>›</span>
          </button>
          {about.footerNote ? (
            <p className="max-w-2xl px-1 text-[15px] leading-relaxed text-muted sm:text-[17px]">
              {about.footerNote}
            </p>
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
            className="relative max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded-full bg-elevated text-muted hover:text-foreground sm:right-4 sm:top-4"
              aria-label={dict.about.close}
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </button>

            <p className="pr-10 text-sm font-semibold text-gold-dim">{about.eyebrow}</p>
            <h3
              id="about-detail-title"
              className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl"
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
                <p className="text-sm font-semibold text-foreground">{dict.about.owners}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {about.people.map((p) => (
                    <div
                      key={`${p.name}-${p.phone}`}
                      className="rounded-2xl bg-elevated p-5"
                    >
                      {p.imageUrl ? (
                        <div className="relative mb-4 aspect-square w-full max-w-40 overflow-hidden rounded-2xl ring-1 ring-black/5">
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            sizes="160px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className="mb-4 flex aspect-square w-full max-w-40 items-center justify-center rounded-2xl bg-white text-2xl font-display font-bold uppercase text-gold-dim ring-1 ring-black/5"
                          aria-hidden
                        >
                          {p.name.slice(0, 1)}
                        </div>
                      )}
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
                {dict.about.close}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
