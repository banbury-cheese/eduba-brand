import * as React from "react";
import { cn } from "../lib/utils";

export const InputGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center h-9 w-full rounded-sm border border-border bg-card",
        "transition-colors duration-[var(--duration-tooltip)] ease-out",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
        className,
      )}
      {...props}
    />
  ),
);
InputGroup.displayName = "InputGroup";

export const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { position?: "start" | "end" }
>(({ className, position = "start", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-2.5 text-muted-foreground",
      "font-mono uppercase tracking-[0.08em] text-[10px] font-bold",
      position === "start" ? "border-r border-border" : "border-l border-border",
      "[&_svg]:size-3.5 [&_svg]:text-current",
      className,
    )}
    {...props}
  />
));
InputGroupAddon.displayName = "InputGroupAddon";

export const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex-1 h-full bg-transparent px-3 outline-none",
      "font-sans text-[length:var(--eb-fs-body-sm)] text-foreground",
      "placeholder:text-muted-foreground placeholder:font-mono placeholder:uppercase placeholder:tracking-[0.08em] placeholder:text-[10px]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
InputGroupInput.displayName = "InputGroupInput";

export const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "h-full px-2.5 inline-flex items-center justify-center",
      "font-mono uppercase tracking-[0.08em] text-[10px] font-bold",
      "text-muted-foreground hover:text-foreground",
      "border-l border-border first:border-l-0 first:border-r",
      "transition-colors duration-[var(--duration-press)] ease-out active:scale-[0.97]",
      "focus-visible:outline-none focus-visible:bg-muted",
      "[&_svg]:size-3.5",
      className,
    )}
    {...props}
  />
));
InputGroupButton.displayName = "InputGroupButton";
