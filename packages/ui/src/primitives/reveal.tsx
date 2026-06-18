"use client";

import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  /** Distance to translate during reveal, e.g. "20px" or "1em". */
  distance?: string;
  /** Direction of translate. */
  direction?: "up" | "down" | "left" | "right";
  /** IntersectionObserver threshold (0–1). */
  threshold?: number;
  /** Animate only once. Default true. */
  once?: boolean;
  /** Delay in ms. */
  delay?: number;
  /** Duration in ms. */
  duration?: number;
}

export function Reveal({
  as: Comp = "div",
  distance = "16px",
  direction = "up",
  threshold = 0.2,
  once = true,
  delay = 0,
  duration = 600,
  className,
  style,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.disconnect();
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  const isReduced = typeof window !== "undefined" && prefersReducedMotion();
  const axis = direction === "up" || direction === "down" ? "Y" : "X";
  const sign = direction === "up" || direction === "left" ? 1 : -1;

  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(className)}
      style={{
        opacity: visible || isReduced ? 1 : 0,
        transform:
          visible || isReduced ? "translate3d(0,0,0)" : `translate${axis}(${sign}${distance})`,
        transition: `opacity ${duration}ms var(--ease-out) ${delay}ms, transform ${duration}ms var(--ease-out) ${delay}ms`,
        ...style,
      }}
      {...props}
    />
  );
}
