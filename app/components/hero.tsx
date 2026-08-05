"use client";

import Image from "next/image";
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
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-end overflow-hidden pb-28 pt-28 sm:items-center sm:pb-32 sm:pt-32"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.imageUrl}
          alt="Star Fabrication metal workshop — welding and steel work"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hero-image-zoom"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.25)_38%,rgba(0,0,0,0.5)_72%,rgba(255,255,255,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-white via-white/85 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div className="hero-fade-up">
          <p className="mb-5 text-sm font-semibold tracking-wide text-gold sm:text-[15px]">
            {hero.tagline}
          </p>

          <div className="flex justify-center">
            <StarLogo size="lg" showTamil={Boolean(nameTamil)} tone="on-dark" />
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-[19px] leading-snug text-white/90 sm:text-[22px] sm:leading-snug">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a href="#contact">
              <Button variant="gold" size="lg">
                {hero.ctaPrimary}
              </Button>
            </a>
            <a href={telHref(primaryPhone)}>
              <Button variant="on-dark" size="lg">
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
