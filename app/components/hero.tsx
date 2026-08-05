"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StarLogo } from "@/app/components/star-logo";
import { Button } from "@/app/components/ui/button";
import type { ContactPerson, HeroData } from "@/lib/content";
import { telHref } from "@/lib/site";

type HeroProps = {
  hero: HeroData;
  primaryPhone: string;
  nameTamil?: string | null;
};

export function Hero({ hero, primaryPhone, nameTamil }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(true);
  const videoSrc = hero.videoUrl?.trim() || "/gallery/hero.mp4";

  useEffect(() => {
    let cancelled = false;

    async function start() {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (!cancelled) setUseVideo(false);
        return;
      }
      const el = videoRef.current;
      if (!el) return;
      el.muted = true;
      try {
        await el.play();
      } catch {
        if (!cancelled) setUseVideo(false);
      }
    }

    void start();
    return () => {
      cancelled = true;
    };
  }, [videoSrc]);

  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-end overflow-hidden pb-20 pt-24 sm:items-center sm:pb-28 sm:pt-28 lg:pb-32"
    >
      <div className="absolute inset-0 bg-[#111]">
        <Image
          src={hero.imageUrl}
          alt={
            useVideo
              ? ""
              : "Star Fabrication metal workshop — welding and steel work"
          }
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center ${useVideo ? "opacity-0" : "opacity-100 hero-image-zoom"}`}
          aria-hidden={useVideo}
        />

        {useVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.imageUrl}
            onError={() => setUseVideo(false)}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.28)_42%,rgba(0,0,0,0.62)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div className="hero-fade-up mx-auto max-w-3xl">
          <p className="mb-4 text-[13px] font-semibold tracking-wide text-gold sm:mb-5 sm:text-sm">
            {hero.tagline}
          </p>

          <div className="flex justify-center">
            <StarLogo size="lg" showTamil={Boolean(nameTamil)} tone="on-dark" />
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-snug text-white/90 sm:mt-7 sm:text-[21px] lg:text-[22px]">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 px-2 sm:mt-9 sm:flex-row sm:items-center sm:gap-4 sm:px-0">
            <a href="#contact" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="w-full sm:w-auto">
                {hero.ctaPrimary}
              </Button>
            </a>
            <a href={telHref(primaryPhone)} className="w-full sm:w-auto">
              <Button variant="on-dark" size="lg" className="w-full sm:w-auto">
                {hero.ctaSecondary}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export type { ContactPerson };
