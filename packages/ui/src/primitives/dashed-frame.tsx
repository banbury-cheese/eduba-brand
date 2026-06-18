"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface DashedFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the border animates (subtle marching-ants on hover). */
  animate?: boolean;
  thickness?: number;
  gap?: number;
  color?: string;
}

export function DashedFrame({
  animate = false,
  thickness = 1,
  gap = 6,
  color,
  className,
  children,
  style,
  ...props
}: DashedFrameProps) {
  return (
    <div
      className={cn(
        "relative",
        animate &&
          "[@media(hover:hover){&:hover}]:before:animate-[dashed-march_1.5s_linear_infinite]",
        "before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none",
        "before:border before:border-dashed",
        className,
      )}
      style={
        {
          "--dash-thickness": `${thickness}px`,
          "--dash-gap": `${gap}px`,
          "--dash-color": color ?? "currentColor",
        } as React.CSSProperties
      }
      {...props}
    >
      <style>{`
        @keyframes dashed-march {
          to { background-position: ${gap * 2}px 0; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, var(--dash-color) 0 ${gap}px, transparent ${gap}px ${gap * 2}px)`,
          backgroundSize: `${gap * 2}px ${thickness}px`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "0 0",
          height: thickness,
        }}
      />
      <div style={style}>{children}</div>
    </div>
  );
}
