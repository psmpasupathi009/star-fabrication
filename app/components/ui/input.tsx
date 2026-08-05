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
        "flex h-12 w-full rounded-xl border border-border bg-surface px-4 text-[17px] text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
