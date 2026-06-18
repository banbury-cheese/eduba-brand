"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import { Label } from "./label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal";
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        "flex gap-2",
        orientation === "vertical" ? "flex-col" : "flex-row items-center",
        className,
      )}
      {...props}
    />
  ),
);
Field.displayName = "Field";

export const FieldLabel = Label;

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-sans text-[length:var(--eb-fs-body-sm)] text-muted-foreground leading-relaxed",
      className,
    )}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) return null;
  return (
    <p
      ref={ref}
      role="alert"
      className={cn(
        "font-mono uppercase tracking-[0.1em] text-[10px] font-semibold text-destructive",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
FieldError.displayName = "FieldError";

export const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
  ),
);
FieldGroup.displayName = "FieldGroup";

export const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>
>(({ className, ...props }, ref) => (
  <fieldset
    ref={ref}
    className={cn(
      "flex flex-col gap-4 border border-border rounded-md p-5",
      "[&>legend]:px-2 [&>legend]:font-mono [&>legend]:uppercase [&>legend]:tracking-[0.1em] [&>legend]:text-[11px] [&>legend]:font-bold",
      className,
    )}
    {...props}
  />
));
FieldSet.displayName = "FieldSet";

export const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement>
>(({ className, ...props }, ref) => (
  <legend
    ref={ref}
    className={cn(
      "font-mono uppercase tracking-[0.1em] text-[11px] font-bold text-foreground",
      className,
    )}
    {...props}
  />
));
FieldLegend.displayName = "FieldLegend";
