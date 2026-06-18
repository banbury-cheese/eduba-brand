"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-sm border border-border bg-card px-3 py-2",
        "font-sans text-[length:var(--eb-fs-body-sm)] leading-relaxed text-foreground resize-y",
        "placeholder:text-muted-foreground placeholder:font-mono placeholder:uppercase placeholder:tracking-[0.08em] placeholder:text-[10px]",
        "transition-colors duration-[var(--duration-tooltip)] ease-out",
        "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
