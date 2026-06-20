"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface Step {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  /** Index of the current (active) step, 0-based. Earlier steps are complete. */
  value: number;
  orientation?: "horizontal" | "vertical";
  /** Make completed/visited steps clickable. */
  onValueChange?: (index: number) => void;
}

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
    <path
      d="M3 8.5l3.5 3L13 4.5"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, value, orientation = "horizontal", onValueChange, ...props }, ref) => {
    const vertical = orientation === "vertical";
    return (
      <div
        ref={ref}
        className={cn("flex", vertical ? "flex-col" : "items-start", className)}
        {...props}
      >
        {steps.map((step, i) => {
          const state = i < value ? "complete" : i === value ? "current" : "upcoming";
          const isLast = i === steps.length - 1;
          const clickable = onValueChange != null && i <= value;

          const indicator = (
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-bold tabular-nums",
                "transition-colors duration-[var(--duration-press)] ease-out",
                state === "complete" && "border-primary bg-primary text-primary-foreground",
                state === "current" && "border-primary bg-background text-primary",
                state === "upcoming" && "border-border bg-background text-muted-foreground",
              )}
            >
              {state === "complete" ? <CheckIcon /> : i + 1}
            </span>
          );

          const labels = (
            <span
              className={cn(
                "flex flex-col gap-0.5",
                vertical ? "pt-0.5" : "items-center text-center",
              )}
            >
              <span
                className={cn(
                  "font-mono uppercase tracking-[0.08em] text-[11px] font-semibold leading-none",
                  state === "upcoming" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {step.label}
              </span>
              {step.description ? (
                <span className="font-sans text-[12px] leading-snug text-muted-foreground">
                  {step.description}
                </span>
              ) : null}
            </span>
          );

          if (vertical) {
            return (
              <div key={step.label} className="flex gap-3 pb-5 last:pb-0">
                <div className="flex flex-col items-center">
                  {clickable ? (
                    <button
                      type="button"
                      onClick={() => onValueChange?.(i)}
                      className="cursor-pointer"
                    >
                      {indicator}
                    </button>
                  ) : (
                    indicator
                  )}
                  {!isLast ? (
                    <span
                      className={cn(
                        "my-1 w-px flex-1 border-l border-dashed",
                        i < value ? "border-primary" : "border-border",
                      )}
                    />
                  ) : null}
                </div>
                {labels}
              </div>
            );
          }

          return (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-2">
                {clickable ? (
                  <button
                    type="button"
                    onClick={() => onValueChange?.(i)}
                    className="cursor-pointer"
                  >
                    {indicator}
                  </button>
                ) : (
                  indicator
                )}
                {labels}
              </div>
              {!isLast ? (
                <span
                  className={cn(
                    "mt-3.5 h-px flex-1 border-t border-dashed",
                    i < value ? "border-primary" : "border-border",
                  )}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);
Stepper.displayName = "Stepper";
