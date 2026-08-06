"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type AppleCarouselProps = {
  children: ReactNode;
  className?: string;
  /** Extra class on the scroll track */
  trackClassName?: string;
  /** Label for aria */
  label?: string;
  /** Full-bleed rail: cards align to page gutter and peek past the right edge */
  bleed?: boolean;
};

export function AppleCarousel({
  children,
  className,
  trackClassName,
  label = "Carousel",
  bleed = false,
}: AppleCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      ro.disconnect();
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges, children]);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-carousel-item]");
    const styles = first ? getComputedStyle(el) : null;
    const gap = styles ? parseFloat(styles.columnGap || styles.gap || "20") || 20 : 20;
    const amount = first ? first.offsetWidth + gap : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        className={cn(
          "flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory sm:gap-5 [&::-webkit-scrollbar]:hidden",
          bleed && "carousel-bleed-track",
          trackClassName
        )}
      >
        {children}
      </div>

      <div
        className={cn(
          "mt-5 flex justify-end gap-2 sm:mt-6",
          bleed && "section-inner"
        )}
      >
        <button
          type="button"
          aria-label="Previous"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          className="inline-flex size-10 items-center justify-center rounded-full bg-white text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.12)] ring-1 ring-black/5 disabled:cursor-default disabled:opacity-35 sm:size-11"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          className="inline-flex size-10 items-center justify-center rounded-full bg-white text-foreground shadow-[0_2px_12px_rgba(0,0,0,0.12)] ring-1 ring-black/5 disabled:cursor-default disabled:opacity-35 sm:size-11"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

export function AppleCarouselItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-carousel-item
      className={cn("shrink-0 snap-start", className)}
    >
      {children}
    </div>
  );
}
