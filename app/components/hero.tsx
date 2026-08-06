"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { StarLogo } from "@/app/components/star-logo";
import { Button } from "@/app/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import type { LocalizedHero } from "@/lib/content";
import { telHref } from "@/lib/site";

type HeroProps = {
  hero: LocalizedHero;
  primaryPhone: string;
  nameEn: string;
  nameTamil?: string | null;
  locale: Locale;
};

export function Hero({
  hero,
  primaryPhone,
  nameEn,
  nameTamil,
  locale,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowVideo, setAllowVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoSrc = hero.videoUrl?.trim() || "/gallery/hero.mp4";

  // Enable video after mount (respect reduced-motion)
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAllowVideo(!reduce);
  }, []);

  // Keep background video playing; image is only poster/fallback
  useEffect(() => {
    if (!allowVideo) return;
    const el = videoRef.current;
    if (!el) return;

    let cancelled = false;
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;

    const markPlaying = () => {
      if (!cancelled) setVideoPlaying(true);
    };

    const tryPlay = () => {
      el.play()
        .then(markPlaying)
        .catch(() => {
          // Retry once after a short delay (autoplay policies / buffering)
          if (cancelled) return;
          window.setTimeout(() => {
            if (cancelled) return;
            el.play().then(markPlaying).catch(() => setVideoPlaying(false));
          }, 400);
        });
    };

    el.addEventListener("playing", markPlaying);
    el.addEventListener("canplay", tryPlay);
    tryPlay();

    return () => {
      cancelled = true;
      el.removeEventListener("playing", markPlaying);
      el.removeEventListener("canplay", tryPlay);
    };
  }, [allowVideo, videoSrc]);

  return (
    <section
      id="top"
      className="relative flex min-h-dvh items-end overflow-hidden pb-20 pt-24 sm:items-center sm:pb-28 sm:pt-28 lg:pb-32"
    >
      <div className="absolute inset-0 bg-[#111]">
        {/* Poster / fallback while video loads or if motion is reduced */}
        <Image
          src={hero.imageUrl}
          alt={
            videoPlaying
              ? ""
              : "Star Fabrication metal workshop — welding and steel work"
          }
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${
            videoPlaying ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={videoPlaying}
        />

        {allowVideo ? (
          <video
            ref={videoRef}
            key={videoSrc}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoPlaying ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={hero.imageUrl}
            onPlaying={() => setVideoPlaying(true)}
            onError={() => {
              setAllowVideo(false);
              setVideoPlaying(false);
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.28)_42%,rgba(0,0,0,0.62)_100%)]" />

      <div className="relative z-10 section-inner text-center">
        <div className="hero-fade-up mx-auto max-w-3xl">
          <p className="mb-4 text-[13px] font-semibold tracking-wide text-gold sm:mb-5 sm:text-sm">
            {hero.tagline}
          </p>

          <div className="flex justify-center">
            <StarLogo
              size="lg"
              tone="on-dark"
              nameEn={nameEn}
              nameTamil={nameTamil}
              locale={locale}
            />
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
