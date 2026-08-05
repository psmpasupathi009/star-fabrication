import { SectionHeading } from "@/app/components/section-heading";
import { testimonials } from "@/lib/testimonials";

type TestimonialsProps = {
  googleReviewsUrl?: string | null;
};

export function Testimonials({ googleReviewsUrl }: TestimonialsProps) {
  return (
    <section id="testimonials" className="section-shell bg-white">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Word of mouth"
          title="What customers say"
          description="Neighbors and local businesses who trusted us with their metalwork."
        />
        <ul className="mx-auto grid max-w-4xl gap-8 sm:gap-10 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.quote} className="text-center md:text-left">
              <blockquote className="text-[16px] leading-relaxed text-muted sm:text-[17px]">
                “{t.quote}”
              </blockquote>
              <p className="mt-4 text-sm font-semibold text-foreground">{t.name}</p>
              <p className="mt-0.5 text-sm text-gold-dim">{t.place}</p>
            </li>
          ))}
        </ul>
        {googleReviewsUrl ? (
          <div className="mt-10 flex justify-center">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full border border-black/15 px-7 text-[15px] font-medium text-foreground hover:bg-black/[0.04]"
            >
              See Google reviews
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
