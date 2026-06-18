"use client";

import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

export interface ImageRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction the reveal travels. */
  direction?: "up" | "down" | "left" | "right";
  /** Reveal duration in ms. */
  duration?: number;
  /** IntersectionObserver threshold (view trigger only). */
  threshold?: number;
  /** Reveal only the first time (view trigger only). Default true. */
  once?: boolean;
  /** "view" reveals on scroll into view (default); "mount" reveals right after mount. */
  trigger?: "view" | "mount";
}

export function ImageReveal({
  direction = "up",
  duration = 900,
  threshold = 0.25,
  once = true,
  trigger = "view",
  className,
  children,
  style,
  ...props
}: ImageRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    if (trigger === "mount") {
      // Paint the clipped state first, then flip on the next frame so it
      // transitions instead of jumping straight to the revealed state.
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setRevealed(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    const el = ref.current;
    if (!el) return;
    // Fail open: if IO is unavailable, reveal immediately rather than leaving
    // the content permanently clipped to nothing.
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setRevealed(false);
          }
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once, trigger]);

  const isReduced = typeof window !== "undefined" && prefersReducedMotion();
  const fromClip =
    direction === "up"
      ? "inset(100% 0 0 0)"
      : direction === "down"
        ? "inset(0 0 100% 0)"
        : direction === "left"
          ? "inset(0 0 0 100%)"
          : "inset(0 100% 0 0)";

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        clipPath: revealed || isReduced ? "inset(0 0 0 0)" : fromClip,
        transition: `clip-path ${duration}ms var(--ease-out)`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
