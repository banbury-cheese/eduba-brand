"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-mono uppercase tracking-[0.06em] text-[11px] font-semibold",
    "rounded-sm border",
    "transition-[background-color,color,border-color,transform] duration-[var(--duration-press)] ease-out",
    "active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-foreground border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
        outline:
          "bg-transparent text-foreground border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
      },
      size: {
        sm: "h-7 px-2",
        md: "h-9 px-3",
        lg: "h-11 px-4",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
));
Toggle.displayName = TogglePrimitive.Root.displayName;
