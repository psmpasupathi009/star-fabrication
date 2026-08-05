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
        "mb-12 max-w-3xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-tight text-gold-dim">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold uppercase leading-[1.02] tracking-tight text-foreground">
        {title}
      </h2>
      <div
        className={cn(
          "mt-5 h-1 w-12 rounded-full bg-gold",
          align === "center" && "mx-auto"
        )}
        aria-hidden
      />
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-[19px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
