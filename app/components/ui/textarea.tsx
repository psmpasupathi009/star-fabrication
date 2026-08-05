import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-y border border-white/15 bg-surface px-3.5 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-gold/55 focus:ring-1 focus:ring-gold/35 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
