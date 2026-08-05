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
        "mb-10 max-w-3xl sm:mb-12 md:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-2 text-[13px] font-semibold tracking-tight text-gold-dim sm:mb-3 sm:text-sm">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[clamp(1.85rem,5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-tight text-foreground">
        {title}
      </h2>
      <div
        className={cn(
          "mt-4 h-1 w-10 rounded-full bg-gold sm:mt-5 sm:w-12",
          align === "center" && "mx-auto"
        )}
        aria-hidden
      />
      {description ? (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-[17px] md:text-[19px]",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
