import { cn } from "@/lib/utils/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-14 max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="hidden h-px w-10 bg-gold/80 sm:block" />
          <p className="font-display text-[0.7rem] uppercase tracking-[0.32em] text-gold sm:text-xs">
            {eyebrow}
          </p>
          <span className="hidden h-px w-10 bg-gold/80 sm:block" />
        </div>
      ) : null}
      <h2 className="font-display text-3xl font-bold uppercase tracking-[0.045em] text-foreground sm:text-4xl md:text-[2.85rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
