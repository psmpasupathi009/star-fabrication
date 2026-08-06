"use client";

import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import { useLocale } from "@/lib/i18n/locale-provider";

type TestimonialsProps = {
  googleReviewsUrl?: string | null;
};

export function Testimonials({ googleReviewsUrl }: TestimonialsProps) {
  const { dict } = useLocale();

  return (
    <section id="testimonials" className="section-shell bg-elevated">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.testimonials.eyebrow}
          title={dict.testimonials.title}
          description={dict.testimonials.description}
        />
        <ul className="mx-auto grid max-w-3xl gap-10 md:max-w-none md:grid-cols-3 md:gap-12">
          {dict.testimonials.items.map((t) => (
            <li key={t.quote} className="text-center md:text-left">
              <blockquote className="text-[17px] leading-relaxed text-muted">
                “{t.quote}”
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-foreground">{t.name}</p>
              <p className="mt-0.5 text-sm text-gold-dim">{t.place}</p>
            </li>
          ))}
        </ul>
        {googleReviewsUrl ? (
          <div className="mt-12 flex justify-center">
            <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                {dict.testimonials.seeReviews}
              </Button>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
