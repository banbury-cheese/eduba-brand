"use client";

import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

export interface HoverParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation in degrees. */
  intensity?: number;
}

export function HoverParallax({
  intensity = 6,
  className,
  children,
  style,
  ...props
}: HoverParallaxProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (prefersReducedMotion()) return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mql.matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(600px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`;
      });
    };
    const handleLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(600px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform [transform-style:preserve-3d]", className)}
      style={{ transition: "transform 250ms var(--ease-out)", ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
