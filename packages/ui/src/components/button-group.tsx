import * as React from "react";
import { cn } from "../lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-orientation={orientation}
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? [
              "flex-row",
              "[&>*]:rounded-none",
              "[&>*:first-child]:rounded-l-sm",
              "[&>*:last-child]:rounded-r-sm",
              "[&>*:not(:first-child)]:-ml-px",
              "[&>*]:focus-visible:relative [&>*]:focus-visible:z-10",
            ].join(" ")
          : [
              "flex-col",
              "[&>*]:rounded-none",
              "[&>*:first-child]:rounded-t-sm",
              "[&>*:last-child]:rounded-b-sm",
              "[&>*:not(:first-child)]:-mt-px",
              "[&>*]:focus-visible:relative [&>*]:focus-visible:z-10",
            ].join(" "),
        className,
      )}
      {...props}
    />
  ),
);
ButtonGroup.displayName = "ButtonGroup";
