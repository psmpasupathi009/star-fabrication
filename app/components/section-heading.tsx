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
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-[13px] font-semibold tracking-tight text-gold-dim sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[clamp(1.75rem,4.2vw,3rem)] font-bold uppercase leading-[1.08] tracking-tight text-foreground">
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-1 w-10 rounded-full bg-gold sm:w-12",
          align === "center" && "mx-auto"
        )}
        aria-hidden
      />
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[17px] leading-relaxed text-muted md:text-[19px]",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
