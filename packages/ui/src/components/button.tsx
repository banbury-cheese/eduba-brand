"use client";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "rounded-sm font-mono uppercase tracking-[0.06em] text-[11px] font-semibold",
    "transition-[transform,background-color,color,border-color,opacity] duration-[var(--duration-press)] ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary [@media(hover:hover){&:hover}]:bg-eb-deep-wine",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary [@media(hover:hover){&:hover}]:bg-accent",
        outline:
          "bg-transparent text-primary border border-primary [@media(hover:hover){&:hover}]:bg-primary [@media(hover:hover){&:hover}]:text-primary-foreground",
        ghost:
          "bg-transparent text-foreground border border-transparent [@media(hover:hover){&:hover}]:bg-muted",
        link: "bg-transparent text-primary underline-offset-4 border-0 [@media(hover:hover){&:hover}]:underline",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive [@media(hover:hover){&:hover}]:opacity-90",
        glow:
          // Cream pill with an animated brown-pink gradient halo that blooms on hover.
          // Matches eduba.io's primary CTA pattern.
          [
            "relative isolate",
            "bg-secondary text-primary border border-primary/40",
            "before:content-[''] before:absolute before:-inset-px before:-z-10 before:rounded-[inherit]",
            "before:bg-[linear-gradient(45deg,#f3c3c5,#d8bfc0,#ead5d6,#a2777a,#d8bfc0)]",
            "before:bg-[length:300%_300%] before:opacity-0 before:blur-[10px]",
            "before:transition-opacity before:duration-[var(--eb-dur-hover)] before:ease-out",
            "[@media(hover:hover){&:hover}]:before:opacity-90",
            "[@media(hover:hover){&:hover}]:before:animate-[glow-sweep_4s_linear_infinite]",
          ].join(" "),
      },
      size: {
        sm: "h-7 px-2.5 text-[10px]",
        md: "h-9 px-3.5",
        lg: "h-11 px-5 text-[12px]",
        icon: "h-9 w-9 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
