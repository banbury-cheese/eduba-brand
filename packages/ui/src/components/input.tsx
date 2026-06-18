"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-9 w-full rounded-sm border border-border bg-card px-3 py-1",
        "font-sans text-[length:var(--eb-fs-body-sm)] text-foreground",
        "placeholder:text-muted-foreground placeholder:font-mono placeholder:uppercase placeholder:tracking-[0.08em] placeholder:text-[10px]",
        "transition-colors duration-[var(--duration-tooltip)] ease-out",
        "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:font-mono file:uppercase file:text-[10px] file:font-bold file:text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
