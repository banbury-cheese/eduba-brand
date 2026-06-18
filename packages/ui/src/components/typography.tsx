import * as React from "react";
import { cn } from "../lib/utils";

type AsProp<E extends React.ElementType> = { as?: E };
type PropsWithAs<E extends React.ElementType, P> = P &
  AsProp<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof P | "as">;

export function H1<E extends React.ElementType = "h1">({
  as,
  className,
  ...props
}: PropsWithAs<E, {}>) {
  const Comp = (as ?? "h1") as React.ElementType;
  return (
    <Comp
      className={cn(
        "font-sans font-bold text-[length:var(--eb-fs-hero-sector)] leading-[var(--eb-lh-hero)]",
        "tracking-[var(--eb-ls-display)] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H2<E extends React.ElementType = "h2">({
  as,
  className,
  ...props
}: PropsWithAs<E, {}>) {
  const Comp = (as ?? "h2") as React.ElementType;
  return (
    <Comp
      className={cn(
        "font-sans font-bold text-[length:var(--eb-fs-section)] leading-[var(--eb-lh-section)]",
        "tracking-[var(--eb-ls-display)] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H3<E extends React.ElementType = "h3">({
  as,
  className,
  ...props
}: PropsWithAs<E, {}>) {
  const Comp = (as ?? "h3") as React.ElementType;
  return (
    <Comp
      className={cn(
        "font-sans font-semibold text-[length:var(--eb-fs-cta)] leading-[var(--eb-lh-section)]",
        "text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function H4<E extends React.ElementType = "h4">({
  as,
  className,
  ...props
}: PropsWithAs<E, {}>) {
  const Comp = (as ?? "h4") as React.ElementType;
  return (
    <Comp
      className={cn("font-sans font-semibold text-xl leading-snug text-foreground", className)}
      {...props}
    />
  );
}

export function H5<E extends React.ElementType = "h5">({
  as,
  className,
  ...props
}: PropsWithAs<E, {}>) {
  const Comp = (as ?? "h5") as React.ElementType;
  return (
    <Comp
      className={cn("font-sans font-medium text-lg leading-snug text-foreground", className)}
      {...props}
    />
  );
}

export function H6<E extends React.ElementType = "h6">({
  as,
  className,
  ...props
}: PropsWithAs<E, {}>) {
  const Comp = (as ?? "h6") as React.ElementType;
  return (
    <Comp
      className={cn("font-sans font-medium text-base leading-snug text-foreground", className)}
      {...props}
    />
  );
}

export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans font-light text-[length:var(--eb-fs-body)] leading-[var(--eb-lh-body)] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans font-light text-xl leading-relaxed text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Large({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("font-sans text-lg font-medium text-foreground", className)} {...props} />
  );
}

export function Small({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn("font-sans text-[length:var(--eb-fs-body-sm)] text-foreground", className)}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans text-[length:var(--eb-fs-body-sm)] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Mono({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <span
      className={cn(
        "font-mono uppercase tracking-[0.1em] text-[length:var(--eb-fs-tag)] font-bold",
        className,
      )}
      {...props}
    />
  );
}

export function Blockquote({
  className,
  ...props
}: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "mt-6 border-l-2 border-primary pl-6 italic font-sans text-[length:var(--eb-fs-body)] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "font-mono text-[0.875em] bg-muted text-foreground px-1 py-0.5 rounded-sm",
        className,
      )}
      {...props}
    />
  );
}

/**
 * SectionLabel — eduba.io's signature `001 / SERVICES` section header.
 * Mono uppercase pair: leading numeric index, slash, label.
 */
export interface SectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  index: string | number;
  label: string;
}
export function SectionLabel({ index, label, className, ...props }: SectionLabelProps) {
  const idx = typeof index === "number" ? String(index).padStart(3, "0") : index;
  return (
    <div
      className={cn(
        "inline-flex items-baseline gap-2.5",
        "font-mono uppercase tracking-[0.1em] text-[length:var(--eb-fs-section-label)] font-bold text-foreground",
        className,
      )}
      {...props}
    >
      <span className="tabular-nums">{idx}</span>
      <span aria-hidden="true" className="opacity-50">
        /
      </span>
      <span>{label}</span>
    </div>
  );
}

/**
 * BrownBand — the eduba.io brown-gradient CTA band background.
 * Use as a wrapper around CTAs/call-out sections.
 */
export function BrownBand({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md p-6 text-[var(--eb-white)]",
        "bg-[image:var(--eb-brown-gradient)]",
        className,
      )}
      {...props}
    />
  );
}

export const Typography = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Mono,
  Blockquote,
  InlineCode,
};
