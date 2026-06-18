"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface UnderlineDrawProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Trigger style: hover (default) or always-on / animated-in. */
  trigger?: "hover" | "always";
  /** Thickness in px. */
  thickness?: number;
}

export function UnderlineDraw({
  trigger = "hover",
  thickness = 1,
  className,
  children,
  ...props
}: UnderlineDrawProps) {
  return (
    <span
      className={cn(
        "group/underline relative inline-block cursor-pointer",
        "after:content-[''] after:absolute after:left-0 after:-bottom-0.5",
        "after:h-[var(--ud-thickness)] after:w-full after:bg-current after:origin-left",
        "after:transition-transform after:duration-[var(--duration-modal)] after:[transition-timing-function:var(--ease-out)]",
        trigger === "hover"
          ? "after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100"
          : "after:scale-x-100",
        className,
      )}
      style={{ "--ud-thickness": `${thickness}px` } as React.CSSProperties}
      {...props}
    >
      {children}
    </span>
  );
}
