import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../lib/utils";

const itemVariants = cva(
  [
    "flex w-full items-center gap-3 rounded-sm",
    "transition-colors duration-[var(--duration-press)] ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
  ],
  {
    variants: {
      variant: {
        default: "hover:bg-accent",
        muted: "bg-muted",
        outline: "border border-border",
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  asChild?: boolean;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} className={cn(itemVariants({ variant, size }), className)} {...props} />;
  },
);
Item.displayName = "Item";

export interface ItemMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "icon" renders a bordered tile around the glyph — anchors the row visually. */
  variant?: "default" | "icon";
}

export const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex shrink-0 items-center justify-center [&_svg]:text-muted-foreground",
        variant === "icon"
          ? "size-9 rounded-sm border border-border bg-muted/50 [&_svg]:size-4"
          : "[&_svg]:size-5",
        className,
      )}
      {...props}
    />
  ),
);
ItemMedia.displayName = "ItemMedia";

export const ItemContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0 flex-1 flex flex-col gap-0.5", className)} {...props} />
  ),
);
ItemContent.displayName = "ItemContent";

export const ItemTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "font-sans font-semibold text-[length:var(--eb-fs-body)] leading-snug tracking-[-0.01em] text-foreground truncate",
        className,
      )}
      {...props}
    />
  ),
);
ItemTitle.displayName = "ItemTitle";

export const ItemDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "font-sans text-[13px] text-muted-foreground leading-snug line-clamp-2",
      className,
    )}
    {...props}
  />
));
ItemDescription.displayName = "ItemDescription";

export const ItemActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex shrink-0 items-center gap-1", className)} {...props} />
  ),
);
ItemActions.displayName = "ItemActions";

export const ItemGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div role="list" ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
  ),
);
ItemGroup.displayName = "ItemGroup";

export const ItemSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("h-px w-full bg-border", className)} {...props} />
  ),
);
ItemSeparator.displayName = "ItemSeparator";
