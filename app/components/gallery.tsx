"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";

/** Latest photos shown on the homepage: 3 columns × 3 rows */
const PREVIEW_COUNT = 9;

export type GalleryViewItem = {
  id: string;
  url: string;
  type: string;
  caption: string | null;
  alt: string | null;
};

type GalleryProps = {
  items: GalleryViewItem[];
};

export function Gallery({ items }: GalleryProps) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const visibleItems = useMemo(
    () => (expanded ? items : items.slice(0, PREVIEW_COUNT)),
    [expanded, items]
  );
  const hiddenCount = Math.max(0, items.length - PREVIEW_COUNT);

  const openAt = useCallback(
    (indexInVisible: number) => {
      const id = visibleItems[indexInVisible]?.id;
      if (!id) return;
      const fullIndex = items.findIndex((g) => g.id === id);
      setActive(fullIndex >= 0 ? fullIndex : indexInVisible);
    },
    [items, visibleItems]
  );

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
    <section id="gallery" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our work"
          title="Project gallery"
          description="Latest fabrication projects — open any photo, or view the full collection."
        />

        {items.length === 0 ? (
          <div className="border border-dashed border-gold/25 bg-surface/50 px-6 py-20 text-center">
            <p className="font-display text-sm uppercase tracking-[0.22em] text-gold">
              Projects coming soon
            </p>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
              New fabrication work will appear here shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {visibleItems.map((g, i) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => openAt(i)}
                  className="group relative aspect-square overflow-hidden border border-white/10 bg-surface text-left hover:border-gold/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
                      sizes="(max-width: 768px) 33vw, 20vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent opacity-70 group-hover:opacity-90" />
                  {g.caption ? (
                    <span className="absolute bottom-0 left-0 right-0 truncate px-2 pb-2 font-display text-[0.65rem] uppercase tracking-wider text-white sm:px-3 sm:text-xs">
                      {g.caption}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            {hiddenCount > 0 ? (
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                {!expanded ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setExpanded(true)}
                  >
                    <Images className="size-4" />
                    View all photos ({items.length})
                  </Button>
                ) : (
                  <Button type="button" variant="ghost" onClick={() => setExpanded(false)}>
                    Show latest only
                  </Button>
                )}
                <p className="text-xs text-muted">
                  {expanded
                    ? `Showing all ${items.length} projects`
                    : `Showing latest ${Math.min(PREVIEW_COUNT, items.length)} of ${items.length}`}
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>

      {item && active !== null ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/94 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={item.alt || item.caption || "Gallery image"}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center border border-white/15 bg-black/50 text-white hover:border-gold/50 hover:text-gold"
            aria-label="Close gallery"
            onClick={() => setActive(null)}
          >
            <X className="size-6" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/50 text-white hover:border-gold/50 hover:text-gold sm:left-4 sm:size-12"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
              >
                <ChevronLeft className="size-7" />
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-white/15 bg-black/50 text-white hover:border-gold/50 hover:text-gold sm:right-4 sm:size-12"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
              >
                <ChevronRight className="size-7" />
              </button>
            </>
          ) : null}

          <div
            className="relative flex h-[min(82dvh,760px)] w-full max-w-5xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative min-h-0 flex-1">
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

            <div className="mt-3 flex items-center justify-between gap-4 border border-white/10 bg-surface/90 px-4 py-3">
              <p className="min-w-0 truncate font-display text-xs uppercase tracking-[0.18em] text-white sm:text-sm">
                {item.caption || item.alt || "Project"}
              </p>
              <p className="shrink-0 font-display text-xs tracking-wider text-gold">
                {active + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
