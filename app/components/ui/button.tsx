import * as React from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "black" | "gold" | "outline" | "ghost" | "on-dark";
type ButtonSize = "default" | "sm" | "lg";

const variants: Record<ButtonVariant, string> = {
  black:
    "bg-[#1d1d1f] text-white hover:bg-black focus-visible:ring-foreground/30",
  gold: "bg-gold text-[#1d1d1f] hover:brightness-105 focus-visible:ring-gold/50",
  outline:
    "border border-black/15 bg-transparent text-foreground hover:bg-black/[0.04] focus-visible:ring-foreground/20",
  ghost:
    "bg-transparent text-foreground hover:bg-black/[0.04] focus-visible:ring-foreground/20",
  "on-dark":
    "border border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white/40",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-xs",
  lg: "h-12 px-7 text-[15px] sm:h-12",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export function Button({
  className,
  variant = "black",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
