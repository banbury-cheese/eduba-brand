"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Seconds per loop. Default 14. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Vertical scroll instead of horizontal. */
  vertical?: boolean;
  /** Gap between items in px. */
  gap?: number;
}

export function Marquee({
  speed = 14,
  direction = "left",
  pauseOnHover = true,
  vertical = false,
  gap = 32,
  className,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group/marquee flex overflow-hidden",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
      style={{ "--marquee-gap": `${gap}px` } as React.CSSProperties}
      {...props}
    >
      {[0, 1].map((idx) => (
        <div
          key={idx}
          aria-hidden={idx === 1}
          className={cn(
            "flex shrink-0 items-center",
            vertical ? "flex-col" : "flex-row",
            pauseOnHover &&
              "[.group-hover\\/marquee\\:paused]:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]",
          )}
          style={{
            gap: gap,
            paddingInline: vertical ? 0 : gap / 2,
            paddingBlock: vertical ? gap / 2 : 0,
            animation: `${vertical ? "marquee-vertical" : "marquee"} ${speed}s linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% - var(--marquee-gap))); }
        }
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to   { transform: translateY(calc(-100% - var(--marquee-gap))); }
        }
      `}</style>
    </div>
  );
}
