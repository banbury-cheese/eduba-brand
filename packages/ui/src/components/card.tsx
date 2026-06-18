import * as React from "react";
import type { EdubaTheme } from "../lib/theme-provider";
import { cn } from "../lib/utils";

/** Cards can override the page theme per-card. Only the shipped themes apply. */
type CardTheme = EdubaTheme;

const cardThemeStyles: Record<CardTheme, React.CSSProperties> = {
  paper: {
    backgroundColor: "var(--eb-theme-paper-bg)",
    color: "var(--eb-theme-paper-title)",
    borderColor: "var(--eb-theme-paper-border)",
    ["--card-dot" as never]: "var(--eb-theme-paper-dots)",
  },
  wine: {
    backgroundColor: "var(--eb-theme-wine-bg)",
    color: "var(--eb-theme-wine-title)",
    borderColor: "var(--eb-theme-wine-border)",
    ["--card-dot" as never]: "var(--eb-theme-wine-dots)",
  },
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply a brand theme palette to just this card (overrides ambient theme). */
  theme?: CardTheme;
  /** Adds the eduba.io-style colored "tail" shadow below the card (matches Services cards). */
  tail?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme, tail, style, ...props }, ref) => {
    const themeStyle = theme ? cardThemeStyles[theme] : undefined;
    return (
      <div
        ref={ref}
        data-card-theme={theme}
        className={cn(
          "relative rounded-lg border bg-card text-card-foreground shadow-card",
          "transition-[border-color] duration-[var(--duration-press)] ease-out",
          tail &&
            [
              "after:content-['']",
              "after:absolute after:left-0 after:right-0 after:top-full",
              "after:h-[clamp(24px,4vh,56px)] after:bg-[currentColor]",
              "after:bg-[var(--card-tail-color,inherit)] after:rounded-b-md",
              "after:pointer-events-none",
              "after:[background-color:inherit]",
            ].join(" "),
          className,
        )}
        style={{ ...themeStyle, ...style }}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dashed border below the header — matches eduba.io card-id pattern. */
  dashedDivider?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, dashedDivider, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1.5 p-6 pb-4",
        dashedDivider && "border-b border-dashed border-[currentColor]/25",
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardId = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "font-mono uppercase tracking-[0.08em] text-[12px] font-bold opacity-70",
        className,
      )}
      {...props}
    />
  ),
);
CardId.displayName = "CardId";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-sans font-semibold lowercase text-[19px] leading-snug tracking-[-0.01em]",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-sans text-[length:var(--eb-fs-body-sm)] leading-relaxed opacity-70",
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** First-line indent of 30px — matches eduba.io card-body editorial detail. */
  indent?: boolean;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, indent, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6 pt-4", indent && "[&_p]:indent-[30px]", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export const CardDots = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("inline-flex items-center gap-[3px]", className)}
      {...props}
    >
      <span className="block h-[3px] w-[3px] rounded-full bg-[var(--card-dot,currentColor)]" />
      <span className="block h-[3px] w-[3px] rounded-full bg-[var(--card-dot,currentColor)]" />
      <span className="block h-[3px] w-[3px] rounded-full bg-[var(--card-dot,currentColor)]" />
    </span>
  ),
);
CardDots.displayName = "CardDots";
