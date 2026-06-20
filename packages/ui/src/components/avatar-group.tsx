import * as React from "react";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback } from "./avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show at most this many avatars; the rest collapse into a +N tile. */
  max?: number;
}

/**
 * Overlapping stack of <Avatar>s with a "+N" overflow tile. Each item gets a
 * ring in the page background color so the overlap reads as separation.
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    const shown = typeof max === "number" ? items.slice(0, max) : items;
    const overflow = items.length - shown.length;

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {shown.map((child, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: positional avatar stack
            key={i}
            className="-ml-2.5 rounded-full ring-2 ring-background first:ml-0"
          >
            {child}
          </div>
        ))}
        {overflow > 0 ? (
          <div className="-ml-2.5 rounded-full ring-2 ring-background">
            <Avatar>
              <AvatarFallback className="bg-muted text-muted-foreground">
                +{overflow}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : null}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";
