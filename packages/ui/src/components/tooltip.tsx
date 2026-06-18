"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "../lib/utils";

/** Wraps the app once. Skip-delay 300ms so subsequent tooltips open instantly. */
export const TooltipProvider = ({
  skipDelayDuration = 300,
  delayDuration = 400,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider
    skipDelayDuration={skipDelayDuration}
    delayDuration={delayDuration}
    {...props}
  />
);

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-sm border border-border bg-primary px-2 py-1",
        "font-mono uppercase tracking-[0.08em] text-[10px] font-bold text-primary-foreground",
        "[transform-origin:var(--radix-tooltip-content-transform-origin)]",
        "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
        "data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        "[transition-duration:var(--duration-tooltip)] [transition-timing-function:var(--ease-out)]",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
