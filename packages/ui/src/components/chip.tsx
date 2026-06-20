import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

/*
 * Chip — an interactive, sentence-case pill. Distinct from Badge (static, mono,
 * uppercase status tag): a Chip can be clicked/selected and removed (×).
 */
const chipVariants = cva(
  [
    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border",
    "font-sans text-[13px] leading-none",
    "transition-colors duration-[var(--duration-press)] ease-out",
    "[&_svg]:size-3.5",
  ],
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-foreground",
        outline: "border-border bg-transparent text-foreground",
        solid: "border-primary bg-primary text-primary-foreground",
      },
      size: {
        sm: "px-2.5 py-1 text-[12px]",
        md: "px-3 py-1.5",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  /** Renders a trailing × that calls this when clicked. */
  onRemove?: () => void;
  /** Visual pressed state (for filter/toggle chips). */
  selected?: boolean;
}

export const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  ({ className, variant, size, onRemove, selected, onClick, children, ...props }, ref) => {
    const interactive = onClick != null;
    return (
      <span
        ref={ref}
        onClick={onClick}
        {...(interactive
          ? {
              role: "button",
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
                }
              },
            }
          : {})}
        data-selected={selected}
        className={cn(
          chipVariants({ variant, size }),
          interactive && "cursor-pointer hover:border-primary/50",
          selected && "border-primary bg-accent text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          className,
        )}
        {...props}
      >
        {children}
        {onRemove ? (
          <button
            type="button"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="-mr-1 cursor-pointer rounded-full p-0.5 text-current/70 transition-colors hover:text-current"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </span>
    );
  },
);
Chip.displayName = "Chip";

export { chipVariants };
