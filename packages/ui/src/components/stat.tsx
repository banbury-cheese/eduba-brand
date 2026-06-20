import * as React from "react";
import { cn } from "../lib/utils";

/* =============================================================================
   Stat / Metric — a labelled big-number block with an optional trend delta.
   Composable, but the common case is the prop form: <Stat label value delta />.
   ============================================================================= */

export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  value?: React.ReactNode;
  /** Trend delta, e.g. "+12%". Rendered with a direction arrow + color. */
  delta?: React.ReactNode;
  direction?: "up" | "down" | "neutral";
  /** Quiet supporting line under the value. */
  hint?: React.ReactNode;
}

export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, label, value, delta, direction = "neutral", hint, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props}>
      {label != null ? <StatLabel>{label}</StatLabel> : null}
      {value != null ? (
        <div className="flex items-baseline gap-2">
          <StatValue>{value}</StatValue>
          {delta != null ? <StatDelta direction={direction}>{delta}</StatDelta> : null}
        </div>
      ) : null}
      {hint != null ? <StatHint>{hint}</StatHint> : null}
      {children}
    </div>
  ),
);
Stat.displayName = "Stat";

export const StatLabel = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "font-mono uppercase tracking-[0.1em] text-[10px] font-semibold text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
StatLabel.displayName = "StatLabel";

export const StatValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "font-sans text-3xl font-semibold leading-none tracking-[-0.01em] tabular-nums text-foreground",
        className,
      )}
      {...props}
    />
  ),
);
StatValue.displayName = "StatValue";

export interface StatDeltaProps extends React.HTMLAttributes<HTMLSpanElement> {
  direction?: "up" | "down" | "neutral";
}

export const StatDelta = React.forwardRef<HTMLSpanElement, StatDeltaProps>(
  ({ className, direction = "neutral", children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-0.5 font-mono text-[11px] font-bold tabular-nums",
        direction === "up" && "text-[var(--eb-success)]",
        direction === "down" && "text-destructive",
        direction === "neutral" && "text-muted-foreground",
        className,
      )}
      {...props}
    >
      {direction !== "neutral" ? (
        <svg viewBox="0 0 12 12" aria-hidden="true" className="h-2.5 w-2.5">
          <path
            d={direction === "up" ? "M6 2.5v7M3 5.5L6 2.5l3 3" : "M6 9.5v-7M3 6.5L6 9.5l3-3"}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {children}
    </span>
  ),
);
StatDelta.displayName = "StatDelta";

export const StatHint = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-sans text-[13px] leading-snug text-muted-foreground", className)}
    {...props}
  />
));
StatHint.displayName = "StatHint";

/* =============================================================================
   DescriptionList — mono term / value rows with dashed dividers. The editorial
   "spec sheet" pattern (as used on the docs landing INDEX panel).
   ============================================================================= */

export const DescriptionList = React.forwardRef<
  HTMLDListElement,
  React.HTMLAttributes<HTMLDListElement>
>(({ className, ...props }, ref) => (
  <dl ref={ref} className={cn("flex flex-col", className)} {...props} />
));
DescriptionList.displayName = "DescriptionList";

export interface DescriptionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  term: React.ReactNode;
}

/** One term/value row. Pass the value as children. */
export const DescriptionItem = React.forwardRef<HTMLDivElement, DescriptionItemProps>(
  ({ className, term, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-baseline justify-between gap-4 border-b border-dashed border-[currentColor]/15 py-2.5 last:border-0",
        className,
      )}
      {...props}
    >
      <dt className="font-mono uppercase tracking-[0.1em] text-[10px] font-semibold text-muted-foreground">
        {term}
      </dt>
      <dd className="text-right font-sans text-[length:var(--eb-fs-body-sm)] text-foreground">
        {children}
      </dd>
    </div>
  ),
);
DescriptionItem.displayName = "DescriptionItem";
