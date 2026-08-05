"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AppleCarousel, AppleCarouselItem } from "@/app/components/apple-carousel";
import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import type { ServiceData } from "@/lib/content";
import { resolveServiceImage } from "@/lib/service-images";

type ServicesProps = {
  services: ServiceData[];
};

export function Services({ services }: ServicesProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = services.find((s) => s.slug === activeSlug) ?? null;
  const activeImage = active
    ? resolveServiceImage(active.slug, active.imageUrl)
    : null;

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
    <section id="services" className="section-shell bg-elevated">
      <div className="section-inner">
        <SectionHeading
          eyebrow="What we make"
          title="Fabrication services"
          description="Swipe or use the arrows — open a service for details or visit its page."
        />
      </div>

      {services.length > 0 ? (
        <div className="section-bleed">
          <AppleCarousel label="Fabrication services">
            {services.map((service) => {
              const imageSrc = resolveServiceImage(service.slug, service.imageUrl);
              return (
                <AppleCarouselItem
                  key={service.id}
                  className="w-[min(82vw,17rem)] sm:w-[19rem] lg:w-[20rem]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveSlug(service.slug)}
                    className="group relative aspect-4/5 w-full overflow-hidden rounded-3xl bg-[#1d1d1f] text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Image
                      src={imageSrc}
                      alt={service.title}
                      fill
                      sizes="(max-width: 640px) 78vw, 20rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
                    <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                      <span className="block font-display text-xl font-bold uppercase tracking-tight text-white sm:text-2xl">
                        {service.title}
                      </span>
                      <span className="mt-1.5 line-clamp-2 block text-[14px] leading-snug text-white/80 sm:mt-2 sm:text-[15px]">
                        {service.description}
                      </span>
                      <span className="mt-2.5 inline-flex items-center gap-1 text-[14px] font-medium text-gold sm:mt-3 sm:text-[15px]">
                        Learn more <span aria-hidden>›</span>
                      </span>
                    </span>
                  </button>
                </AppleCarouselItem>
              );
            })}
          </AppleCarousel>
        </div>
      ) : null}

      {active && activeImage ? (
        <div
          className="fixed inset-0 z-60 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setActiveSlug(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-detail-title"
        >
          <div
            className="relative max-h-[88dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-muted shadow-sm hover:text-foreground"
              aria-label="Close"
              onClick={() => setActiveSlug(null)}
            >
              <X className="size-4" />
            </button>

            <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-3xl bg-elevated">
              <Image
                src={activeImage}
                alt={active.title}
                fill
                sizes="(max-width: 640px) 100vw, 32rem"
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 sm:p-8">
              <h3
                id="service-detail-title"
                className="font-display text-2xl font-bold uppercase tracking-tight text-foreground"
              >
                {active.title}
              </h3>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">
                {active.details || active.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={`/services/${active.slug}`} onClick={() => setActiveSlug(null)}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Full page
                  </Button>
                </Link>
                <a href="#contact" onClick={() => setActiveSlug(null)}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Request a quote
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
