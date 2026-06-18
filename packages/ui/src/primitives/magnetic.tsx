"use client";

import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

export interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Strength of pull, 0–1. Default 0.35. */
  strength?: number;
  /** Radius in px around the element where magnetism kicks in. Default 80. */
  radius?: number;
  /** Element tag. */
  as?: React.ElementType;
}

export function Magnetic({
  strength = 0.35,
  radius = 80,
  as: Comp = "div",
  className,
  children,
  style,
  ...props
}: MagneticProps) {
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;

    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    };
    const handlePointerLeave = () => {
      cancelAnimationFrame(rafId);
      el.style.transform = "translate(0,0)";
    };

    window.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, [strength, radius]);

  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("inline-block will-change-transform", className)}
      style={{ transition: "transform 250ms var(--ease-out)", ...style }}
      {...props}
    >
      {children}
    </Comp>
  );
}
