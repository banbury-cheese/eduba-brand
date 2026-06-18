import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

export const alertVariants = cva(
  [
    "relative w-full rounded-md border p-4",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-[18px] [&>svg]:size-4",
    "[&>svg~*]:pl-7",
  ],
  {
    variants: {
      variant: {
        default: "bg-card border-border [&>svg]:text-muted-foreground",
        info: "bg-muted/60 border-border [&>svg]:text-primary [&_[data-slot=alert-title]]:text-primary",
        success: [
          "border-[var(--eb-success)]/35 bg-[color-mix(in_oklab,var(--eb-success)_7%,var(--color-card))]",
          "[&>svg]:text-[var(--eb-success)] [&_[data-slot=alert-title]]:text-[var(--eb-success)]",
        ].join(" "),
        warning: [
          "border-[var(--eb-warning)]/35 bg-[color-mix(in_oklab,var(--eb-warning)_7%,var(--color-card))]",
          "[&>svg]:text-[var(--eb-warning)] [&_[data-slot=alert-title]]:text-[var(--eb-warning)]",
        ].join(" "),
        destructive: [
          "border-destructive/35 bg-[color-mix(in_oklab,var(--eb-danger)_7%,var(--color-card))]",
          "[&>svg]:text-destructive [&_[data-slot=alert-title]]:text-destructive",
        ].join(" "),
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  ),
);
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    data-slot="alert-title"
    className={cn(
      "mb-1.5 font-mono uppercase tracking-[0.08em] text-[11px] font-bold leading-none text-foreground",
      className,
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "font-sans text-[length:var(--eb-fs-body-sm)] leading-relaxed text-muted-foreground",
      "[&_a]:font-medium [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";
