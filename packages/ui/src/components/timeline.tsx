import * as React from "react";
import { cn } from "../lib/utils";

/*
 * Timeline — a vertical sequence of events on a left rail. Composable:
 *   <Timeline>
 *     <TimelineItem>
 *       <TimelineTime>jun 2026</TimelineTime>
 *       <TimelineTitle>shipped v0.1</TimelineTitle>
 *       <TimelineDescription>…</TimelineDescription>
 *     </TimelineItem>
 *   </Timeline>
 */

export const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("flex flex-col", className)} {...props} />
  ),
);
Timeline.displayName = "Timeline";

export interface TimelineItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /** Emphasize this node's dot (e.g. the current/latest event). */
  active?: boolean;
  /** Hide the connector line below (use on the last item). Auto-handled via last: too. */
  last?: boolean;
}

export const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  ({ className, active, last, children, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "relative pl-7 pb-6 last:pb-0",
        // rail: a dashed line down the left, hidden on the last item
        "before:absolute before:left-[3.5px] before:top-2 before:bottom-0 before:w-px before:border-l before:border-dashed before:border-border",
        last && "before:hidden",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1 block h-2 w-2 rounded-full ring-4 ring-background",
          active ? "bg-primary" : "bg-border",
        )}
      />
      <div className="flex flex-col gap-1">{children}</div>
    </li>
  ),
);
TimelineItem.displayName = "TimelineItem";

export const TimelineTime = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "font-mono uppercase tracking-[0.1em] text-[10px] font-semibold text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TimelineTime.displayName = "TimelineTime";

export const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-sans text-[length:var(--eb-fs-body)] font-semibold leading-snug text-foreground",
      className,
    )}
    {...props}
  />
));
TimelineTitle.displayName = "TimelineTitle";

export const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-sans text-[13px] leading-relaxed text-muted-foreground", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";
