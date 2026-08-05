"use client";

import { useEffect, useState } from "react";
import {
  Car,
  DoorClosed,
  Fence,
  Factory,
  Grid3x3,
  Home,
  Layers,
  PanelTop,
  Shield,
  Warehouse,
  WavesLadder,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import type { ServiceData } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  grill: Grid3x3,
  gate: Fence,
  railing: Shield,
  staircase: WavesLadder,
  "compound-wall": Fence,
  roofing: Warehouse,
  "cement-sheet": Layers,
  "parking-shed": Car,
  "rolling-shutter": PanelTop,
  stainless: Wrench,
  "main-door": DoorClosed,
  "kerala-set": Home,
  industrial: Factory,
  general: Wrench,
};

type ServicesProps = {
  services: ServiceData[];
};

export function Services({ services }: ServicesProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = services.find((s) => s.slug === activeSlug) ?? null;
  const ActiveIcon = active
    ? icons[active.icon] ?? icons[active.slug] ?? Wrench
    : Wrench;

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveSlug(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="services" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What we make"
          title="Fabrication services"
          description="From residential detail work to industrial structures — tap a service for full details."
        />

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = icons[service.icon] ?? icons[service.slug] ?? Wrench;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveSlug(service.slug)}
                className="group relative border border-white/10 bg-surface/75 p-5 text-left hover:border-gold/50 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-gold opacity-0 group-hover:opacity-100" />
                <span className="inline-flex size-11 items-center justify-center border border-gold/25 bg-gold/8 text-gold group-hover:border-gold/50">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <p className="mt-3 font-display text-[0.65rem] uppercase tracking-[0.2em] text-gold/80">
                  View details
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-black/90 p-4 sm:items-center"
          onClick={() => setActiveSlug(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-detail-title"
        >
          <div
            className="relative max-h-[85dvh] w-full max-w-lg overflow-y-auto border border-gold/25 bg-surface p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex size-10 items-center justify-center text-muted hover:text-gold"
              aria-label="Close"
              onClick={() => setActiveSlug(null)}
            >
              <X className="size-5" />
            </button>

            <span className="inline-flex size-12 items-center justify-center border border-gold/30 bg-gold/10 text-gold">
              <ActiveIcon className="size-6" />
            </span>
            <h3
              id="service-detail-title"
              className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-foreground"
            >
              {active.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {active.details || active.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" onClick={() => setActiveSlug(null)}>
                <Button size="lg" className="w-full sm:w-auto">
                  Request a quote
                </Button>
              </a>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => setActiveSlug(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
