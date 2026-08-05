import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-[17px] text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
