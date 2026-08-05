import { cn } from "@/lib/utils/cn";

type StarLogoProps = {
  className?: string;
  showTamil?: boolean;
  size?: "sm" | "md" | "lg";
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

export function StarLogo({ className, showTamil = false, size = "md" }: StarLogoProps) {
  const sizes = {
    sm: { icon: "size-5", word: "text-lg tracking-[0.08em]", tamil: "text-[0.65rem]" },
    md: { icon: "size-6", word: "text-xl tracking-[0.1em] sm:text-2xl", tamil: "text-xs" },
    lg: { icon: "size-8", word: "text-3xl tracking-[0.12em] sm:text-5xl md:text-6xl", tamil: "text-sm sm:text-base" },
  }[size];

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        <StarIcon className={sizes.icon} />
        <span className={cn("font-display font-bold uppercase leading-none", sizes.word)}>
          <span className="text-gold">Star</span>{" "}
          <span className="text-white">Fabrication</span>
        </span>
        <StarIcon className={cn(sizes.icon, "hidden sm:block")} />
      </div>
      {showTamil ? (
        <span className={cn("mt-1 text-muted", sizes.tamil)}>ஸ்டார் பேப்ரிக்கேஷன்</span>
      ) : null}
    </div>
  );
}
