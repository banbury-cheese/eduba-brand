"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";
import { cn } from "../lib/utils";

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    dashed?: boolean;
  }
>(({ className, orientation = "horizontal", decorative = true, dashed, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0",
      dashed
        ? orientation === "horizontal"
          ? "h-px w-full bg-[image:linear-gradient(to_right,var(--color-border)_50%,transparent_50%)] bg-[length:8px_1px] bg-repeat-x"
          : "w-px h-full bg-[image:linear-gradient(to_bottom,var(--color-border)_50%,transparent_50%)] bg-[length:1px_8px] bg-repeat-y"
        : orientation === "horizontal"
          ? "h-px w-full bg-border"
          : "w-px h-full bg-border",
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;
