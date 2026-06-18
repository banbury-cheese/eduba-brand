"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { cn } from "../lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    /** Dashed separator instead of solid (matches eduba.io FAQ pattern). */
    dashed?: boolean;
  }
>(({ className, dashed, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      dashed ? "border-b border-dashed border-border" : "border-b border-border",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** Icon style: "chevron" (default) or "plus" (FAQ-style plus that rotates into an X). */
  iconVariant?: "chevron" | "plus";
}

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, iconVariant = "chevron", ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 py-4 text-left",
        "font-sans font-semibold text-[length:var(--eb-fs-card-title)] lowercase text-foreground",
        "transition-all duration-[var(--duration-press)] ease-out",
        "hover:text-primary",
        iconVariant === "chevron" && "[&[data-state=open]>svg]:rotate-180",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
      {iconVariant === "chevron" ? (
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-press)] ease-out"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Plus that rotates into an X — eduba.io FAQ pattern.
        <span
          aria-hidden="true"
          className="relative inline-block h-3.5 w-3.5 shrink-0 text-muted-foreground"
        >
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          <span
            className={cn(
              "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current",
              "transition-transform duration-[var(--duration-press)] ease-out",
              "group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0",
            )}
          />
        </span>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      "transition-[height] duration-[var(--duration-dropdown)] ease-[var(--ease-in-out)]",
    )}
    {...props}
  >
    <div
      className={cn(
        "pb-4 pt-0 font-sans text-[length:var(--eb-fs-body-sm)] leading-relaxed text-muted-foreground",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
