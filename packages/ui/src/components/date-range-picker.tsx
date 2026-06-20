"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import { cn } from "../lib/utils";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export type { DateRange };

export interface DateRangePickerProps {
  value?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  /** Months shown side by side in the popover. Default 2. */
  numberOfMonths?: number;
  className?: string;
  disabled?: boolean;
}

const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
const fmtFull = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

export function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Pick a range",
  numberOfMonths = 2,
  className,
  disabled,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const label =
    value?.from && value?.to
      ? `${fmt(value.from)} – ${fmtFull(value.to)}`
      : value?.from
        ? fmtFull(value.from)
        : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full cursor-pointer items-center gap-2.5 rounded-md border border-border bg-background px-3.5 py-2 text-left",
            "font-sans text-[length:var(--eb-fs-body-sm)] text-foreground shadow-card",
            "transition-[border-color,box-shadow] duration-[var(--duration-tooltip)] ease-out",
            "hover:border-primary/40",
            "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted-foreground"
          >
            <rect
              x="2"
              y="3"
              width="12"
              height="11"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M2 6h12M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span
            className={cn(
              "line-clamp-1",
              !label &&
                "font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground",
            )}
          >
            {label ?? placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onValueChange}
          numberOfMonths={numberOfMonths}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
