"use client";

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

/*
 * Banner — a full-width announcement / notice bar. Distinct from Alert (a
 * boxed, in-flow message): Banner spans its container, is single-line-ish,
 * and is typically pinned to the top of a page or section. Dismissible.
 */
const bannerVariants = cva(
  [
    "flex w-full items-center gap-3 px-4 py-2.5",
    "font-sans text-[length:var(--eb-fs-body-sm)]",
    "[&>svg]:size-4 [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [&_a]:text-primary-foreground",
        info: "bg-muted text-foreground [&>svg]:text-primary",
        success: [
          "bg-[color-mix(in_oklab,var(--eb-success)_12%,var(--color-background))] text-foreground",
          "[&>svg]:text-[var(--eb-success)]",
        ].join(" "),
        warning: [
          "bg-[color-mix(in_oklab,var(--eb-warning)_14%,var(--color-background))] text-foreground",
          "[&>svg]:text-[var(--eb-warning)]",
        ].join(" "),
        destructive: [
          "bg-[color-mix(in_oklab,var(--eb-danger)_12%,var(--color-background))] text-foreground",
          "[&>svg]:text-destructive",
        ].join(" "),
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, dismissible, onDismiss, children, ...props }, ref) => {
    const [dismissed, setDismissed] = React.useState(false);
    if (dismissed) return null;
    return (
      <div
        ref={ref}
        role="region"
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
        {dismissible ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => {
              setDismissed(true);
              onDismiss?.();
            }}
            className="-mr-1 shrink-0 cursor-pointer rounded-sm p-1 text-current/70 transition-colors hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    );
  },
);
Banner.displayName = "Banner";

/** Mono "tag" lead-in for a banner, e.g. <BannerTitle>new</BannerTitle>. */
export const BannerTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "shrink-0 font-mono uppercase tracking-[0.1em] text-[10px] font-bold",
        className,
      )}
      {...props}
    />
  ),
);
BannerTitle.displayName = "BannerTitle";

export { bannerVariants };
