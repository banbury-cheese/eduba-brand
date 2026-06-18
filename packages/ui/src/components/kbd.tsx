import * as React from "react";
import { cn } from "../lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center min-w-[1.5em] h-5 px-1",
        "font-mono uppercase text-[10px] font-bold tracking-[0.05em]",
        "rounded-sm border border-border bg-muted text-foreground",
        "shadow-[inset_0_-1px_0_var(--color-border)]",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  ),
);
Kbd.displayName = "Kbd";

export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function KbdGroup({ className, ...props }: KbdGroupProps) {
  return <span className={cn("inline-flex items-center gap-1", className)} {...props} />;
}
