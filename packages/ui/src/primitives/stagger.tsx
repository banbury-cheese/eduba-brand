"use client";

import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

interface StaggerContextValue {
  active: boolean;
  gap: number;
  duration: number;
}

const StaggerContext = React.createContext<StaggerContextValue | null>(null);
/* Per-item index is injected by <Stagger> around each direct child — a render
   counter would drift between server render and client hydration. */
const StaggerIndexContext = React.createContext(0);

export interface StaggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger between items in ms (30–80ms reads well). Default 50. */
  gap?: number;
  /** Per-item duration in ms. */
  duration?: number;
  /** Trigger: view (intersection) or mount. */
  trigger?: "view" | "mount";
}

export function Stagger({
  gap = 50,
  duration = 400,
  trigger = "view",
  className,
  children,
  ...props
}: StaggerProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  // Starts false even for trigger="mount" — starting active meant items were
  // already at their end state on first paint, so nothing ever animated.
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (trigger === "mount") {
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setActive(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  const ctx = React.useMemo(() => ({ active, gap, duration }), [active, gap, duration]);

  return (
    <div ref={ref} className={cn(className)} {...props}>
      <StaggerContext.Provider value={ctx}>
        {React.Children.map(children, (child, i) => (
          <StaggerIndexContext.Provider value={i}>{child}</StaggerIndexContext.Provider>
        ))}
      </StaggerContext.Provider>
    </div>
  );
}

export interface StaggerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  /** Override per-item index (otherwise taken from position within <Stagger>). */
  index?: number;
}

export function StaggerItem({
  as: Comp = "div",
  index,
  className,
  style,
  ...props
}: StaggerItemProps) {
  const ctx = React.useContext(StaggerContext);
  const positionIndex = React.useContext(StaggerIndexContext);
  const ownIndex = index ?? positionIndex;
  const isReduced = typeof window !== "undefined" && prefersReducedMotion();
  const active = ctx?.active ?? true;
  const delay = (ctx?.gap ?? 50) * ownIndex;
  const duration = ctx?.duration ?? 400;

  return (
    <Comp
      className={cn(className)}
      style={{
        opacity: active || isReduced ? 1 : 0,
        transform: active || isReduced ? "translate3d(0,0,0)" : "translateY(8px)",
        transition: `opacity ${duration}ms var(--ease-out) ${delay}ms, transform ${duration}ms var(--ease-out) ${delay}ms`,
        ...style,
      }}
      {...props}
    />
  );
}
