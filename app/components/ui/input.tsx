import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full border border-white/15 bg-surface px-3.5 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-gold/55 focus:ring-1 focus:ring-gold/35 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
