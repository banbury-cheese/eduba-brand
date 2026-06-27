"use client";

import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "../lib/utils";
import { FilmGrain } from "../primitives/film-grain";
import { useScramble } from "../primitives/scramble-text";

/*
 * FrameShell — the signature eduba "frame": a fixed dark-brown shell wrapping an
 * inner paper surface that scrolls, with a mono top nav whose labels scramble on
 * hover. Mirrors the .frame > .topNav > .contentWrapper structure from eduba.io.
 *
 * Deliberately GSAP-free: the label scramble reuses the dependency-light
 * `useScramble` hook (same timing model as the site's GSAP ScrambleText), and the
 * chip hover (scaleX + colour swap) is pure CSS. Nothing here pulls an optional
 * peer, so it ships from the main barrel.
 *
 * Layout lives on the orphaned `--eb-frame` / `--eb-frame-padding` tokens so the
 * brown frame colour and inset are themeable without prop drilling.
 */

// Eduba logomark (20×17, two paths) — the default brand mark in <FrameNavBrand>.
const EdubaMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    overflow="visible"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6449 5.37454C14.1291 5.37454 15.3322 4.17141 15.3322 2.68727C15.3322 1.20313 14.1291 0 12.6449 0C11.1608 0 9.95767 1.20313 9.95767 2.68727C9.95767 2.88914 9.97993 3.08582 10.0221 3.27498C10.1034 3.63943 10.0779 4.03564 9.85072 4.33202C9.50365 4.78485 8.84405 4.8297 8.30273 4.64944C8.03569 4.56051 7.75001 4.51235 7.45308 4.51235C5.96895 4.51235 4.76581 5.71548 4.76581 7.19962C4.76581 7.46426 4.80407 7.71996 4.87534 7.96149C5.08124 8.65923 5.17445 9.46975 4.7319 10.0472L4.68089 10.1138C4.24349 10.6844 3.44883 10.8108 2.72989 10.7996C2.71571 10.7994 2.7015 10.7993 2.68727 10.7993C1.20313 10.7993 0 12.0024 0 13.4865C0 14.9707 1.20313 16.1738 2.68727 16.1738C4.17141 16.1738 5.37454 14.9707 5.37454 13.4865C5.37454 13.3059 5.35673 13.1295 5.32276 12.9589C5.19808 12.3327 5.17437 11.637 5.56281 11.1302L6.1003 10.4289C6.41001 10.0248 6.94397 9.88685 7.45308 9.88685C7.9624 9.88685 8.4966 10.0248 8.80643 10.4291L9.41984 11.2294C9.79779 11.7225 9.78579 12.3964 9.67586 13.008C9.64795 13.1633 9.63337 13.3232 9.63337 13.4865C9.63337 14.9707 10.8365 16.1738 12.3206 16.1738C13.8048 16.1738 15.0079 14.9707 15.0079 13.4865C15.0079 12.0024 13.8048 10.7993 12.3206 10.7993C12.2921 10.7993 12.2637 10.7997 12.2354 10.8006C11.4997 10.8235 10.6795 10.7058 10.2317 10.1216L10.1744 10.0468C9.7319 9.46943 9.82505 8.659 10.0309 7.96132C10.1021 7.71983 10.1404 7.46419 10.1404 7.19962C10.1404 7.1147 10.1364 7.0307 10.1287 6.9478C10.0912 6.54464 10.1398 6.12194 10.3861 5.80058C10.7798 5.28693 11.5145 5.21091 12.1507 5.32919C12.3109 5.35897 12.4761 5.37454 12.6449 5.37454Z"
      fill="currentColor"
    />
    <path
      d="M20.0004 8.91127C20.0004 10.3955 18.7972 11.5986 17.3131 11.5986C15.829 11.5986 14.6258 10.3955 14.6258 8.91127C14.6258 7.42713 15.829 6.224 17.3131 6.224C18.7972 6.224 20.0004 7.42713 20.0004 8.91127Z"
      fill="currentColor"
    />
  </svg>
);

// ===== FrameShell ============================================================

export interface FrameShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Top navigation row — typically a <FrameNav>. Sits in the first grid row. */
  nav?: React.ReactNode;
  /** Optional bottom row (status bar, dock, CTA). Adds a third grid row when set. */
  footer?: React.ReactNode;
  /** Render the brand film-grain overlay over the whole frame. Default true. */
  grain?: boolean;
  /** Class for the inner scrollable "paper" surface. */
  paperClassName?: string;
  /** Ref to the scrollable paper element (e.g. to reset scroll on route change). */
  paperRef?: React.Ref<HTMLElement>;
}

export const FrameShell = React.forwardRef<HTMLDivElement, FrameShellProps>(
  (
    { nav, footer, grain = true, paperClassName, paperRef, className, style, children, ...props },
    ref,
  ) => {
    const pad = "var(--eb-frame-padding)";
    return (
      <div
        ref={ref}
        // Frame inset is 8px, dropping to 5px at the phone breakpoint (<=425px),
        // mirroring eduba.io's .frame. No grid gap: the space under the nav comes
        // solely from <FrameNav>'s padding-bottom, exactly like the site.
        className={cn(
          "fixed inset-0 grid overflow-hidden max-[425px]:[--eb-frame-padding:5px]",
          className,
        )}
        style={{
          gridTemplateRows: footer ? "auto 1fr auto" : "auto 1fr",
          height: "100svh",
          background: "var(--eb-frame)",
          paddingTop: `calc(${pad} + env(safe-area-inset-top))`,
          paddingRight: `calc(${pad} + env(safe-area-inset-right))`,
          paddingBottom: `calc(${pad} + env(safe-area-inset-bottom))`,
          paddingLeft: `calc(${pad} + env(safe-area-inset-left))`,
          ...style,
        }}
        {...props}
      >
        {nav}
        <main
          ref={paperRef}
          className={cn(
            "relative overflow-x-hidden overflow-y-auto rounded-sm bg-background text-foreground",
            paperClassName,
          )}
          style={{
            transition: "background-color 320ms var(--ease-in-out), color 320ms var(--ease-in-out)",
          }}
        >
          {children}
        </main>
        {footer}
        {grain ? <FilmGrain /> : null}
      </div>
    );
  },
);
FrameShell.displayName = "FrameShell";

// ===== FrameNav ==============================================================

export type FrameNavProps = React.HTMLAttributes<HTMLElement>;

export const FrameNav = React.forwardRef<HTMLElement, FrameNavProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "flex items-center justify-between",
        // Spacing matches eduba.io .topNav exactly across breakpoints:
        // desktop padding 0 2px 7px 3px; <=tablet(800) 2px 2px 8px; <=phone(425) 2px 0 6px.
        "gap-3 max-[425px]:gap-1.5",
        "pt-0 pr-[2px] pb-[7px] pl-[3px]",
        "max-[800px]:pt-[2px] max-[800px]:pr-[2px] max-[800px]:pb-[8px] max-[800px]:pl-[2px]",
        "max-[425px]:pt-[2px] max-[425px]:pr-0 max-[425px]:pb-[6px] max-[425px]:pl-0",
        "font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--eb-cream)]",
        className,
      )}
      {...props}
    />
  ),
);
FrameNav.displayName = "FrameNav";

/** Convenience cluster for one side of the nav (e.g. the right-hand link group). */
export const FrameNavGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex min-w-0 items-center gap-[18px]", className)} {...props} />
  ),
);
FrameNavGroup.displayName = "FrameNavGroup";

// ===== FrameNavBrand =========================================================

export interface FrameNavBrandProps extends React.HTMLAttributes<HTMLElement> {
  /** Wordmark text — scrambles on hover. */
  label: string;
  /** Brand mark to the left of the label. Defaults to the Eduba logomark. */
  logo?: React.ReactNode;
  /** Render as the child element (e.g. a Next.js <Link>) instead of an <a>. */
  asChild?: boolean;
}

export const FrameNavBrand = React.forwardRef<HTMLElement, FrameNavBrandProps>(
  ({ label, logo, asChild = false, className, ...props }, ref) => {
    const { output, run, reset } = useScramble({ text: label });
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref as never}
        aria-label={label}
        onPointerEnter={run}
        onPointerLeave={reset}
        className={cn(
          "group inline-flex min-w-0 cursor-pointer items-center gap-2.5 text-inherit no-underline",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className="flex h-[11px] shrink-0 items-center transition-transform duration-[var(--eb-dur-hover)] ease-out group-hover:scale-110 [&_svg]:h-full [&_svg]:w-auto"
        >
          {logo ?? <EdubaMark />}
        </span>
        <span aria-hidden="true" className="inline-block whitespace-nowrap">
          {output}
        </span>
      </Comp>
    );
  },
);
FrameNavBrand.displayName = "FrameNavBrand";

// ===== FrameNavLink ==========================================================

export interface FrameNavLinkProps extends React.HTMLAttributes<HTMLElement> {
  /** Link text — scrambles on hover. */
  label: string;
  /** Render as the child element (e.g. a Next.js <Link>) instead of an <a>. */
  asChild?: boolean;
}

export const FrameNavLink = React.forwardRef<HTMLElement, FrameNavLinkProps>(
  ({ label, asChild = false, className, ...props }, ref) => {
    const { output, run, reset } = useScramble({ text: label });
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref as never}
        aria-label={label}
        onPointerEnter={run}
        onPointerLeave={reset}
        className={cn(
          "inline-flex cursor-pointer items-center text-inherit no-underline opacity-100 transition-opacity duration-[var(--eb-dur-hover)] ease-out [@media(hover:hover){&:hover}]:opacity-90",
          className,
        )}
        {...props}
      >
        <span aria-hidden="true" className="inline-block whitespace-nowrap">
          {output}
        </span>
      </Comp>
    );
  },
);
FrameNavLink.displayName = "FrameNavLink";

// ===== FrameNavChip ==========================================================

export interface FrameNavChipProps extends React.HTMLAttributes<HTMLElement> {
  /** Chip text — scrambles on hover. */
  label: string;
  /**
   * `default` — light-pink pill that brightens to paper on hover.
   * `primary` — black pill with a pulsing green dot; inverts to paper on hover.
   */
  variant?: "default" | "primary";
  /** Optional leading icon (e.g. the dots-grid mark). */
  icon?: React.ReactNode;
  /** Show the pulsing green status dot. Defaults to true for `primary`. */
  dot?: boolean;
  /**
   * Class for the text label span. Pair with an `icon` and a responsive
   * `max-[800px]:hidden` to collapse the chip to icon-only on small screens,
   * the way eduba.io's nav does at the tablet breakpoint.
   */
  labelClassName?: string;
  /** Render as the child element (e.g. a Next.js <Link>) instead of an <a>. */
  asChild?: boolean;
}

export const FrameNavChip = React.forwardRef<HTMLElement, FrameNavChipProps>(
  (
    { label, variant = "default", icon, dot, labelClassName, asChild = false, className, ...props },
    ref,
  ) => {
    const { output, run, reset } = useScramble({ text: label });
    const Comp = asChild ? Slot : "a";
    const showDot = dot ?? variant === "primary";

    // Resting foreground colour, set on the chip (the label inherits it).
    const content = variant === "primary" ? "text-eb-white" : "text-eb-dark-brown";

    // Hover flip for the primary pill (white -> dark brown). This MUST live on a
    // DESCENDANT (the content span), not the chip itself: `group-hover:` targets
    // descendants of the hovered `.group`, and the chip IS the group, so putting
    // it on the chip never fires. Keeping it on `group-hover:` (not `hover:`) also
    // keeps it in sync with the background flip on touch (`hover:` is gated by
    // @media(hover:hover), `group-hover:` is not).
    const contentHover = variant === "primary" ? "group-hover:text-eb-dark-brown" : "";

    // The pill background sits behind the content so it can scale on hover
    // without nudging the label. transform-origin is the centre by default.
    const bg =
      variant === "primary"
        ? "bg-black group-hover:bg-[var(--eb-white)] group-hover:border-[var(--eb-cream)]"
        : "bg-[var(--eb-light-pink)] group-hover:bg-[var(--eb-white)]";

    return (
      <Comp
        ref={ref as never}
        aria-label={label}
        onPointerEnter={run}
        onPointerLeave={reset}
        className={cn(
          "group relative inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-sm px-3 py-[3px] no-underline",
          "transition-colors duration-[var(--eb-dur-chip)] ease-out",
          content,
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-sm border border-transparent",
            // Tailwind v4 animates scale via the `scale` property, not `transform`
            // — transition that, or the pill snaps instead of easing. The resting
            // `scale-100` keeps a value present so it eases 1 -> 1.04 (never none).
            "scale-100 transition-[scale,background-color,border-color] duration-[var(--eb-dur-chip)] ease-out",
            "group-hover:scale-x-[1.04]",
            bg,
          )}
        />
        <span
          className={cn(
            "relative z-[1] inline-flex items-center gap-2 transition-colors duration-[var(--eb-dur-chip)] ease-out",
            contentHover,
          )}
        >
          {showDot ? (
            <span
              aria-hidden="true"
              className="inline-block rounded-full"
              style={{
                width: 5,
                height: 5,
                background: "var(--eb-green-dot)",
                animation: "var(--animate-dot-blink)",
              }}
            />
          ) : null}
          {icon ? (
            <span
              aria-hidden="true"
              className="inline-flex shrink-0 items-center transition-transform duration-[var(--eb-dur-hover)] ease-out group-hover:scale-110 [&_svg_path]:fill-current"
            >
              {icon}
            </span>
          ) : null}
          <span aria-hidden="true" className={cn("inline-block whitespace-nowrap", labelClassName)}>
            {output}
          </span>
        </span>
      </Comp>
    );
  },
);
FrameNavChip.displayName = "FrameNavChip";
