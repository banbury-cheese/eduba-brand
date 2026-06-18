"use client";

import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

export interface SplitTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  mode?: "char" | "word" | "line";
  trigger?: "view" | "mount";
  /** Stagger per item, ms (30–80ms reads well). */
  stagger?: number;
  /** Total animation duration per char/word/line, ms. */
  duration?: number;
}

export function SplitText({
  text,
  mode = "word",
  trigger = "view",
  stagger = 50,
  duration = 600,
  className,
  ...props
}: SplitTextProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  // Always start hidden — even for trigger="mount". Starting active meant the
  // first paint was already the end state, so nothing ever transitioned.
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (trigger === "mount") {
      // Two frames: let the hidden state paint, then flip so it transitions.
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
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  const items: string[] =
    mode === "char" ? text.split("") : mode === "word" ? text.split(" ") : text.split("\n");

  const isReduced = typeof window !== "undefined" && prefersReducedMotion();

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text} {...props}>
      {items.map((piece, i) => (
        <React.Fragment key={`${piece}-${i}`}>
          <span
            aria-hidden="true"
            className="inline-block will-change-[opacity,transform]"
            style={{
              opacity: active || isReduced ? 1 : 0,
              transform: active || isReduced ? "translateY(0)" : "translateY(0.4em)",
              transition: `opacity ${duration}ms var(--ease-out) ${i * stagger}ms, transform ${duration}ms var(--ease-out) ${i * stagger}ms`,
              whiteSpace: mode === "line" ? "pre" : "normal",
            }}
          >
            {piece === " " ? "\u00A0" : piece}
          </span>
          {/* Word gaps live OUTSIDE the inline-block spans — a trailing space
              inside one collapses, which ran all the words together. */}
          {mode === "word" && i < items.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}
