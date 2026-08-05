"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
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
      className="relative flex min-h-dvh items-end overflow-hidden pb-28 pt-28 sm:items-center sm:pb-24 sm:pt-24"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.imageUrl}
          alt="Welder fabricating metal with bright sparks"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.38em] text-accent-red sm:text-sm">
            <span className="hidden h-px w-8 bg-accent-red/70 sm:block" />
            {hero.tagline}
          </p>

          <div>
            <StarLogo size="lg" showTamil={Boolean(nameTamil)} />
          </div>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contact">
              <Button size="lg" className="min-w-40">
                {hero.ctaPrimary}
              </Button>
            </a>
            <a href={telHref(primaryPhone)}>
              <Button size="lg" variant="on-dark" className="min-w-40">
                <Phone className="size-4" />
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
