"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface RatingProps {
  value?: number;
  onValueChange?: (value: number) => void;
  /** Number of stars. Default 5. */
  max?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  "aria-label"?: string;
}

const SIZES = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-7 w-7" } as const;

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="currentColor">
    <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2 5.06 16.8 6 11.3l-4-3.9 5.53-.8L10 1.6Z" />
  </svg>
);

export function Rating({
  value = 0,
  onValueChange,
  max = 5,
  readOnly = false,
  size = "md",
  className,
  "aria-label": ariaLabel,
}: RatingProps) {
  const [hover, setHover] = React.useState<number | null>(null);
  const interactive = !readOnly && onValueChange != null;
  const shown = hover ?? value;

  return (
    <div
      role={interactive ? "radiogroup" : "img"}
      aria-label={ariaLabel ?? `Rating: ${value} of ${max}`}
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => setHover(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < shown;
        const star = (
          <Star className={cn(SIZES[size], filled ? "text-[var(--eb-warning)]" : "text-border")} />
        );
        if (!interactive) {
          // biome-ignore lint/suspicious/noArrayIndexKey: fixed star positions
          return <span key={i}>{star}</span>;
        }
        return (
          <button
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed star positions
            key={i}
            type="button"
            role="radio"
            aria-checked={value === i + 1}
            aria-label={`${i + 1} star${i ? "s" : ""}`}
            onMouseEnter={() => setHover(i + 1)}
            onFocus={() => setHover(i + 1)}
            onBlur={() => setHover(null)}
            onClick={() => onValueChange?.(value === i + 1 ? 0 : i + 1)}
            className="cursor-pointer rounded-sm transition-transform duration-[var(--duration-press)] ease-out hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {star}
          </button>
        );
      })}
    </div>
  );
}
