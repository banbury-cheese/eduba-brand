"use client";

import * as React from "react";
import { cn } from "../lib/utils";

/*
 * Timing model mirrors the GSAP ScrambleText settings used on the
 * eduba-ledger homepage (duration 0.8s, speed 0.8, uppercase charset,
 * no reveal delay): characters lock in left→right linearly over the
 * duration, while the not-yet-revealed tail re-randomizes on a throttled
 * interval — NOT every animation frame, which read as 60fps noise.
 */
const CHARSETS = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
} as const;

const DEFAULT_DURATION = 800;
const DEFAULT_SPEED = 0.8;

export interface ScrambleTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  /** Trigger: 'hover' (default), 'view' (on intersection), or 'manual' (controlled). */
  trigger?: "hover" | "view" | "manual";
  duration?: number;
  /** How fast unrevealed characters cycle (GSAP-style; higher = faster). */
  speed?: number;
  /** Charset preset or a custom string of characters. */
  chars?: keyof typeof CHARSETS | (string & {});
  /** When trigger="manual", set this to control scramble. */
  active?: boolean;
}

export function useScramble({
  text,
  duration = DEFAULT_DURATION,
  speed = DEFAULT_SPEED,
  chars = "upperCase",
}: {
  text: string;
  duration?: number;
  speed?: number;
  chars?: ScrambleTextProps["chars"];
}) {
  const [output, setOutput] = React.useState(text);
  const rafRef = React.useRef<number | null>(null);
  const startRef = React.useRef<number | null>(null);

  // Keep the resting output in sync if `text` changes between runs.
  React.useEffect(() => setOutput(text), [text]);

  const run = React.useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setOutput(text);
      return;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const charset = CHARSETS[chars as keyof typeof CHARSETS] ?? (chars as string);
    // GSAP refreshes scrambled glyphs roughly every 50ms at speed 1.
    const refreshEvery = Math.max(16, 50 / Math.max(speed, 0.05));
    let lastShuffle = Number.NEGATIVE_INFINITY;
    let tail: string[] = [];

    const tick = (time: number) => {
      if (startRef.current === null) startRef.current = time;
      const elapsed = time - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * text.length);

      if (time - lastShuffle >= refreshEvery) {
        lastShuffle = time;
        tail = Array.from(
          { length: text.length },
          () => charset[(Math.random() * charset.length) | 0] ?? "",
        );
      }

      let next = "";
      for (let i = 0; i < text.length; i++) {
        next += i < revealed || text[i] === " " ? text[i] : tail[i];
      }
      setOutput(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [text, duration, speed, chars]);

  React.useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { output, run };
}

export function ScrambleText({
  text,
  trigger = "hover",
  duration,
  speed,
  chars,
  active,
  className,
  ...props
}: ScrambleTextProps) {
  const { output, run } = useScramble({ text, duration, speed, chars });
  const elRef = React.useRef<HTMLSpanElement | null>(null);

  React.useEffect(() => {
    if (trigger === "manual" && active) run();
  }, [active, run, trigger]);

  React.useEffect(() => {
    if (trigger !== "view") return;
    const el = elRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger, run]);

  return (
    <span
      ref={elRef}
      className={cn("inline-block whitespace-nowrap tabular-nums", className)}
      onPointerEnter={trigger === "hover" ? run : undefined}
      {...props}
    >
      {output}
    </span>
  );
}
