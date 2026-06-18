"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "../lib/utils";

export const Tabs = TabsPrimitive.Root;

/*
 * TabsList renders a single underline indicator that slides between the
 * active triggers instead of each trigger flipping its own border — the
 * border flip is what made tab changes feel like a hard cut.
 */
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const composedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref],
  );
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0, ready: false });

  React.useLayoutEffect(() => {
    const list = innerRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
      if (!active) {
        setIndicator((prev) => ({ ...prev, width: 0 }));
        return;
      }
      setIndicator((prev) => ({
        left: active.offsetLeft,
        width: active.offsetWidth,
        // First measurement positions the indicator without transitioning.
        ready: prev.ready || prev.width > 0,
      }));
    };

    measure();
    // Radix flips data-state attributes on value change; fonts/resize move offsets.
    const mutations = new MutationObserver(measure);
    mutations.observe(list, { attributes: true, attributeFilter: ["data-state"], subtree: true });
    const resizes = new ResizeObserver(measure);
    resizes.observe(list);
    return () => {
      mutations.disconnect();
      resizes.disconnect();
    };
  }, []);

  return (
    <TabsPrimitive.List
      ref={composedRef}
      className={cn("relative inline-flex items-center gap-1 border-b border-border", className)}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-px h-[2px] rounded-full bg-primary"
        style={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.width > 0 ? 1 : 0,
          transition: indicator.ready
            ? "left var(--duration-dropdown) var(--ease-out), width var(--duration-dropdown) var(--ease-out)"
            : "none",
        }}
      />
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-2",
      "font-mono uppercase tracking-[0.08em] text-[11px] font-semibold text-muted-foreground",
      "transition-colors duration-[var(--duration-dropdown)] ease-out",
      "hover:text-foreground",
      "data-[state=active]:text-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-1",
      "data-[state=active]:duration-[var(--duration-modal)] data-[state=active]:ease-out",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
