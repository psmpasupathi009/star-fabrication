import * as React from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "gold" | "outline" | "ghost" | "on-dark";
type ButtonSize = "default" | "sm" | "lg";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold text-black hover:brightness-110 active:brightness-95 focus-visible:ring-gold/50",
  outline:
    "border border-gold/40 bg-transparent text-fg hover:border-gold hover:bg-gold/10 active:bg-gold/15 focus-visible:ring-gold/40",
  ghost:
    "bg-transparent text-fg hover:bg-white/8 active:bg-white/12 focus-visible:ring-gold/30",
  "on-dark":
    "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 active:bg-white/20 focus-visible:ring-white/40",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-xs",
  lg: "h-12 px-7 text-base sm:h-[3.25rem]",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "gold",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-display font-semibold uppercase tracking-wider outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
