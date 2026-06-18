import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 whitespace-nowrap",
    "font-mono uppercase tracking-[0.1em] text-[10px] font-bold",
    "px-1.5 py-0.5 rounded-sm border",
    "transition-colors duration-[var(--duration-tooltip)] ease-out",
  ],
  {
    variants: {
      variant: {
        default: "bg-transparent text-primary border-primary",
        solid: "bg-primary text-primary-foreground border-primary",
        secondary: "bg-secondary text-secondary-foreground border-secondary",
        outline: "bg-transparent text-foreground border-border",
        muted: "bg-muted text-muted-foreground border-transparent",
        success: "bg-transparent text-[var(--eb-success)] border-[var(--eb-success)]",
        warning: "bg-transparent text-[var(--eb-warning)] border-[var(--eb-warning)]",
        destructive: "bg-transparent text-destructive border-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
