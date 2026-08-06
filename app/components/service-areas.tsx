import { SectionHeading } from "@/app/components/section-heading";

type ServiceAreasProps = {
  areas: string[];
  location: string;
};

export function ServiceAreas({ areas, location }: ServiceAreasProps) {
  if (!areas.length) return null;

  return (
    <section id="areas" className="section-shell bg-elevated">
      <div className="section-inner">
        <SectionHeading
          eyebrow="Where we work"
          title="Service areas"
          description={`Based in ${location} — we fabricate and install across these towns and nearby villages.`}
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
