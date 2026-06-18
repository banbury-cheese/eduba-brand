import * as React from "react";
import { cn } from "../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-sm",
        "bg-[linear-gradient(110deg,var(--color-muted)_25%,var(--color-accent)_50%,var(--color-muted)_75%)]",
        "bg-[length:200%_100%] animate-shimmer",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}
