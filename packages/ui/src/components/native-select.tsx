import * as React from "react";
import { cn } from "../lib/utils";

export interface NativeSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Classes for the inner <select>. Layout classes (width etc.) belong on `className`, which styles the wrapper. */
  selectClassName?: string;
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ className, selectClassName, children, ...props }, ref) => (
    /* className lands on the wrapper so the chevron always stays inside the field,
       whatever width the consumer sets. */
    <div className={cn("relative inline-flex w-full", className)}>
      <select
        ref={ref}
        className={cn(
          "h-10 w-full cursor-pointer appearance-none rounded-md border border-border bg-background py-2 pl-3.5 pr-10",
          "font-sans text-[length:var(--eb-fs-body-sm)] text-foreground shadow-card",
          "transition-[border-color,box-shadow] duration-[var(--duration-tooltip)] ease-out",
          "hover:border-primary/40",
          "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          selectClassName,
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ),
);
NativeSelect.displayName = "NativeSelect";
