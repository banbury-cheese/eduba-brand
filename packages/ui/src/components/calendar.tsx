"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "../lib/utils";
import { buttonVariants } from "./button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/*
 * Day-state styling lives on the <td> (react-day-picker applies modifier
 * classes there); the inner day button stays color-neutral (`text-inherit`)
 * so selected/today colors always pair correctly in both themes. The
 * `day-selected` marker class lets `today` and the button's hover styles
 * defer to the selected state without relying on cascade order.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-3",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "font-mono uppercase tracking-[0.08em] text-[11px] font-bold",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-7 w-7 absolute left-1 top-1 text-muted-foreground hover:text-foreground",
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-7 w-7 absolute right-1 top-1 text-muted-foreground hover:text-foreground",
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "text-muted-foreground w-9 font-mono uppercase tracking-[0.08em] text-[10px] font-bold",
        week: "flex w-full mt-1",
        day: "group/day h-9 w-9 rounded-md p-0 text-center relative",
        day_button: cn(
          "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-0",
          "bg-transparent font-sans text-[13px] font-medium text-inherit",
          "transition-colors duration-[var(--duration-press)] ease-out",
          "hover:bg-accent hover:text-accent-foreground",
          // Inside a selected cell the cell paints the state — keep the button quiet.
          "group-[.day-selected]/day:hover:bg-transparent group-[.day-selected]/day:hover:text-inherit",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          "disabled:pointer-events-none",
        ),
        range_start: "day-selected rounded-r-none rounded-l-md bg-primary text-primary-foreground",
        range_end: "day-selected rounded-l-none rounded-r-md bg-primary text-primary-foreground",
        selected: "day-selected bg-primary text-primary-foreground",
        today:
          "font-semibold [&:not(.day-selected)]:bg-accent [&:not(.day-selected)]:text-accent-foreground",
        outside: "text-muted-foreground/60 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground/50",
        range_middle: "day-selected rounded-none !bg-accent !text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
