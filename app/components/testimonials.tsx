import { SectionHeading } from "@/app/components/section-heading";
import { Button } from "@/app/components/ui/button";
import { testimonials } from "@/lib/testimonials";

type TestimonialsProps = {
  googleReviewsUrl?: string | null;
};

export function Testimonials({ googleReviewsUrl }: TestimonialsProps) {
  return (
    <section id="testimonials" className="section-shell bg-elevated">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Word of mouth"
          title="What customers say"
          description="Neighbors and local businesses who trusted us with their metalwork."
        />
        <ul className="mx-auto grid max-w-3xl gap-10 md:max-w-none md:grid-cols-3 md:gap-12">
          {testimonials.map((t) => (
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
                See Google reviews
              </Button>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
