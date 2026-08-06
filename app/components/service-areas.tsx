"use client";

import { SectionHeading } from "@/app/components/section-heading";
import { useLocale } from "@/lib/i18n/locale-provider";

type ServiceAreasProps = {
  areas: string[];
  location: string;
};

export function ServiceAreas({ areas, location }: ServiceAreasProps) {
  const { dict } = useLocale();

  if (!areas.length) return null;

  return (
    <section id="areas" className="section-shell bg-elevated">
      <div className="section-inner">
        <SectionHeading
          eyebrow={dict.areas.eyebrow}
          title={dict.areas.title}
          description={dict.areas.description.replace("{location}", location)}
        />
        <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 md:max-w-none">
          {areas.map((area) => (
            <li
              key={area}
              className="text-[15px] font-medium tracking-tight text-foreground sm:text-[17px]"
            >
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
