import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/lib/i18n/config";

type StarLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** on-dark = over photos; on-light = default public pages */
  tone?: "on-light" | "on-dark";
  nameEn?: string;
  nameTamil?: string | null;
  locale?: Locale;
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0 text-gold", className)}
      aria-hidden
    >
      <path d="M12 2.5l2.6 6.3 6.9.6-5.2 4.5 1.5 6.7L12 16.8 6.2 20.6l1.5-6.7L2.5 9.4l6.9-.6L12 2.5z" />
    </svg>
  );
}

export function StarLogo({
  className,
  size = "md",
  tone = "on-light",
  nameEn = "Star Fabrication",
  nameTamil = "ஸ்டார் பேப்ரிக்கேஷன்",
  locale = "en",
}: StarLogoProps) {
  const sizes = {
    sm: { icon: "size-5", word: "text-lg tracking-[0.06em]", tamil: "text-[0.65rem]" },
    md: { icon: "size-6", word: "text-xl tracking-[0.08em] sm:text-2xl", tamil: "text-xs" },
    lg: {
      icon: "size-8 sm:size-10",
      word: "text-[clamp(2.75rem,6vw,4.5rem)] tracking-[0.04em]",
      tamil: "text-sm sm:text-base",
    },
  }[size];

  const wordColor = tone === "on-dark" ? "text-white" : "text-foreground";
  const secondaryColor = tone === "on-dark" ? "text-white/70" : "text-muted";
  const tamil = (nameTamil || "ஸ்டார் பேப்ரிக்கேஷன்").trim();
  const isTa = locale === "ta";

  const englishMark = (
    <div className="flex items-center gap-2 sm:gap-3">
      <StarIcon className={sizes.icon} />
      <span className={cn("font-display font-bold uppercase leading-none", sizes.word)}>
        <span className="text-gold">Star</span>{" "}
        <span className={wordColor}>Fabrication</span>
      </span>
      <StarIcon className={cn(sizes.icon, "hidden sm:block")} />
    </div>
  );

  if (isTa) {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="flex items-center gap-2 sm:gap-3">
          <StarIcon className={sizes.icon} />
          <span
            className={cn(
              "font-bold leading-none",
              sizes.word,
              wordColor,
              "font-[family-name:var(--font-tamil)]"
            )}
          >
            {tamil}
          </span>
          <StarIcon className={cn(sizes.icon, "hidden sm:block")} />
        </div>
        <span className={cn("mt-2 font-display uppercase", sizes.tamil, secondaryColor)}>
          {nameEn}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {englishMark}
      {tamil ? (
        <span
          className={cn(
            "mt-2 font-[family-name:var(--font-tamil)]",
            sizes.tamil,
            secondaryColor
          )}
        >
          {tamil}
        </span>
      ) : null}
    </div>
  );
}
