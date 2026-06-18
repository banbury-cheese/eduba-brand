"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { prefersReducedMotion } from "../lib/motion";
import { cn } from "../lib/utils";

export interface HoldToConfirmProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Hold duration in ms. Default 1800 — destructive actions deserve a real pause. */
  hold?: number;
  /** Triggered when the hold completes. */
  onConfirm?: () => void;
  /** Use Slot to pass an existing button. Note: the contrasting fill label is skipped (children can't be duplicated into a Slot). */
  asChild?: boolean;
}

export const HoldToConfirm = React.forwardRef<HTMLButtonElement, HoldToConfirmProps>(
  ({ hold = 1800, onConfirm, asChild, className, children, ...props }, ref) => {
    const [progress, setProgress] = React.useState(0);
    const startTimeRef = React.useRef<number | null>(null);
    const rafRef = React.useRef<number | null>(null);
    const Comp = asChild ? Slot : "button";

    const start = React.useCallback(() => {
      if (prefersReducedMotion()) {
        onConfirm?.();
        return;
      }
      startTimeRef.current = performance.now();
      const tick = (time: number) => {
        if (startTimeRef.current === null) return;
        const elapsed = time - startTimeRef.current;
        const p = Math.min(elapsed / hold, 1);
        setProgress(p);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          onConfirm?.();
          startTimeRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }, [hold, onConfirm]);

    const cancel = React.useCallback(() => {
      startTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Asymmetric snap-back: releasing rewinds fast, holding fills slow.
      const startProgress = progress;
      const startTime = performance.now();
      const snap = (time: number) => {
        const t = Math.min((time - startTime) / 200, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setProgress(startProgress * (1 - eased));
        if (t < 1) rafRef.current = requestAnimationFrame(snap);
      };
      rafRef.current = requestAnimationFrame(snap);
    }, [progress]);

    const clip = `inset(0 calc(100% - var(--progress, 0%)) 0 0)`;

    return (
      <Comp
        ref={ref}
        type="button"
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        className={cn(
          "relative isolate overflow-hidden",
          "active:scale-[0.97] transition-transform duration-[var(--duration-press)] ease-out",
          "select-none touch-none",
          className,
        )}
        style={{ "--progress": `${progress * 100}%` } as React.CSSProperties}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {children}
            {/* The fill carries its own copy of the label in the contrast
                color, clipped to the progress region — otherwise a red label
                drowns in the red fill as it sweeps across. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 z-10 pointer-events-none inline-flex items-center justify-center gap-2 bg-destructive text-[var(--eb-white)]"
              style={{ clipPath: clip }}
            >
              {children}
            </span>
          </>
        )}
      </Comp>
    );
  },
);
HoldToConfirm.displayName = "HoldToConfirm";
