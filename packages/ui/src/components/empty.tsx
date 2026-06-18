import * as React from "react";
import { cn } from "../lib/utils";

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-md border border-dashed border-border bg-card p-10 text-center",
        className,
      )}
      {...props}
    />
  ),
);
Empty.displayName = "Empty";

export const EmptyMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mb-2 flex h-12 w-12 items-center justify-center rounded-full",
        "bg-muted text-muted-foreground [&_svg]:size-6",
        className,
      )}
      {...props}
    />
  ),
);
EmptyMedia.displayName = "EmptyMedia";

export const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-mono uppercase tracking-[0.1em] text-[12px] font-bold text-foreground",
      className,
    )}
    {...props}
  />
));
EmptyTitle.displayName = "EmptyTitle";

export const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "max-w-sm font-sans text-[length:var(--eb-fs-body-sm)] text-muted-foreground leading-relaxed",
      className,
    )}
    {...props}
  />
));
EmptyDescription.displayName = "EmptyDescription";

export const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-3 items-center", className)} {...props} />
  ),
);
EmptyContent.displayName = "EmptyContent";

export const EmptyActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex gap-2 mt-2", className)} {...props} />
  ),
);
EmptyActions.displayName = "EmptyActions";
