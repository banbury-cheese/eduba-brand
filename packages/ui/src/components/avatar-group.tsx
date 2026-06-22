import * as React from "react";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback } from "./avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show at most this many avatars; the rest collapse into a +N tile. */
  max?: number;
}

/*
 * Overlapping stack of <Avatar>s with a "+N" overflow tile. The separating
 * ring is the page background, applied to each avatar directly — and the
 * avatar's own border is dropped here (border-transparent) so it reads as a
 * single clean ring rather than two concentric outlines.
 */
const RING = "-ml-2.5 border-transparent ring-2 ring-background first:ml-0";

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, children, ...props }, ref) => {
    const items = React.Children.toArray(children).filter(
      React.isValidElement,
    ) as React.ReactElement<{ className?: string }>[];
    const shown = typeof max === "number" ? items.slice(0, max) : items;
    const overflow = items.length - shown.length;

    return (
      <div ref={ref} className={cn("flex items-center", className)} {...props}>
        {shown.map((child, i) =>
          React.cloneElement(child, {
            key: child.key ?? i,
            className: cn(RING, child.props.className),
          }),
        )}
        {overflow > 0 ? (
          <Avatar className={RING}>
            <AvatarFallback>+{overflow}</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";
