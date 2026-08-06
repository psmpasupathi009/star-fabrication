"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AppleCarousel, AppleCarouselItem } from "@/app/components/apple-carousel";
import { SectionHeading } from "@/app/components/section-heading";

export type GalleryViewItem = {
  id: string;
  url: string;
  type: string;
  caption: string | null;
  alt: string | null;
};

const CAROUSEL_CARD =
  "w-[min(85vw,24rem)] sm:w-[26rem] lg:w-[30rem]";

type GalleryProps = {
  items: GalleryViewItem[];
};

export function Gallery({ items }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    if (items.length === 0) return;
    setActive((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
  }, [items.length]);

  const goNext = useCallback(() => {
    if (items.length === 0) return;
    setActive((i) => (i === null ? 0 : (i + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, goPrev, goNext]);

  const item = active !== null ? items[active] : null;

  return (
    <section id="gallery" className="section-shell bg-white">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Our work"
          title="Project gallery"
          description="Swipe the rail or use the arrows — tap a photo to open it full screen."
        />

        {items.length === 0 ? (
          <div className="rounded-3xl bg-elevated px-5 py-16 text-center sm:px-6 sm:py-20">
            <p className="text-sm font-semibold text-foreground">Projects coming soon</p>
            <p className="mx-auto mt-2 max-w-sm text-[15px] text-muted sm:text-[17px]">
              New fabrication work will appear here shortly.
            </p>
          </div>
        ) : null}
      </div>

      {items.length > 0 ? (
        <div className="section-bleed">
          <AppleCarousel label="Project gallery" bleed>
            {items.map((g, i) => (
              <AppleCarouselItem key={g.id} className={CAROUSEL_CARD}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-elevated text-left shadow-[0_2px_12px_rgba(0,0,0,0.04)] ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  {g.type === "video" ? (
                    <video
                      src={g.url}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={g.url}
                      alt={g.alt || g.caption || "Gallery project"}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 26rem, 30rem"
                      className="object-cover"
                    />
                  )}
                  {g.caption ? (
                    <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/65 to-transparent px-5 pb-4 pt-12 text-[15px] font-medium text-white sm:text-[16px]">
                      {g.caption}
                    </span>
                  ) : null}
                </button>
              </AppleCarouselItem>
            ))}
          </AppleCarousel>
        </div>
      ) : null}

      {item && active !== null ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt || item.caption || "Gallery image"}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-20 inline-flex size-10 items-center justify-center rounded-full bg-white text-foreground"
            aria-label="Close gallery"
            onClick={() => setActive(null)}
          >
            <X className="size-5" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground sm:left-6"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground sm:right-6"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}

          <div
            className="relative flex h-[min(82dvh,760px)] w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-3xl bg-black">
              {item.type === "video" ? (
                <video
                  src={item.url}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={item.url}
                  alt={item.alt || item.caption || "Gallery image"}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3">
              <p className="min-w-0 truncate text-sm font-medium text-foreground">
                {item.caption || item.alt || "Project"}
              </p>
              <p className="shrink-0 text-sm text-muted">
                {active + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
