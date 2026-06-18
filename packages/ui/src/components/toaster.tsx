"use client";

import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      duration={4000}
      gap={8}
      offset={16}
      toastOptions={{
        classNames: {
          toast:
            "group border border-border bg-popover text-popover-foreground rounded-md p-4 font-sans text-[14px] flex gap-3 items-start",
          title: "font-mono uppercase tracking-[0.08em] text-[11px] font-bold",
          description: "text-muted-foreground text-[length:var(--eb-fs-body-sm)] leading-relaxed",
          actionButton:
            "bg-primary text-primary-foreground rounded-sm px-2.5 py-1 font-mono uppercase tracking-[0.06em] text-[10px] font-bold",
          cancelButton:
            "bg-muted text-muted-foreground rounded-sm px-2.5 py-1 font-mono uppercase tracking-[0.06em] text-[10px] font-bold",
          closeButton: "bg-transparent text-muted-foreground hover:text-foreground",
          success: "[&_[data-icon]]:text-[var(--eb-success)]",
          error: "[&_[data-icon]]:text-destructive",
          warning: "[&_[data-icon]]:text-[var(--eb-warning)]",
          info: "[&_[data-icon]]:text-primary",
        },
      }}
      {...props}
    />
  );
}

export { toast };
