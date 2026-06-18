"use client";

import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

export interface NumberTickerProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  duration?: number;
  decimals?: number;
  trigger?: "view" | "mount";
}

export function useNumberTicker({
  to,
  duration = 1200,
  decimals = 0,
  from = 0,
  active = true,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  from?: number;
  active?: boolean;
}) {
  const [value, setValue] = React.useState(from);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }
    // Anchor to the first rAF timestamp — performance.now() captured here can
    // sit AFTER the first frame's timestamp, which made progress (and the
    // first painted value) go negative.
    let start: number | null = null;
    const startVal = value;
    const tick = (time: number) => {
      if (start === null) start = time;
      const progress = Math.min(Math.max((time - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(startVal + (to - startVal) * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, duration, active]);

  return Number(value.toFixed(decimals));
}

export function NumberTicker({
  value,
  duration = 1200,
  decimals = 0,
  trigger = "view",
  className,
  ...props
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  // Starts false even for trigger="mount" so the count-up runs after paint.
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (trigger !== "view") {
      setActive(true);
      return;
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
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  const display = useNumberTicker({ to: value, duration, decimals, active });

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {decimals > 0
        ? display.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : Math.round(display).toLocaleString()}
    </span>
  );
}
