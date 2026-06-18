/**
 * Motion constants — single source of truth for JS/TS code that needs the
 * same easing curves and durations as the CSS variables in tokens.css.
 *
 * Used by motion primitives (GSAP-backed) and hooks. Components themselves
 * should prefer the CSS variables (e.g. `transition-timing-function: var(--ease-out)`)
 * rather than importing these.
 */

export const eases = {
  // Default UI eases
  out: [0.23, 1, 0.32, 1] as const,
  inOut: [0.77, 0, 0.175, 1] as const,
  drawer: [0.32, 0.72, 0, 1] as const,

  // Brand-expressive — primitives only
  springPop: [0.34, 1.56, 0.64, 1] as const,
  elastic: [0.34, 1.48, 0.64, 1] as const,
  settle: [0.22, 0.61, 0.36, 1] as const,
  symmetric: [0.45, 0.05, 0.55, 0.95] as const,
  panel: [0.16, 1, 0.3, 1] as const,
};

export const durations = {
  press: 120,
  tooltip: 175,
  dropdown: 200,
  modal: 300,
  drawer: 400,
  hover: 220,
  chip: 180,
  panel: 520,
};

export const cssEase = {
  out: "cubic-bezier(0.23, 1, 0.32, 1)",
  inOut: "cubic-bezier(0.77, 0, 0.175, 1)",
  drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
  springPop: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  elastic: "cubic-bezier(0.34, 1.48, 0.64, 1)",
  settle: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  symmetric: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
  panel: "cubic-bezier(0.16, 1, 0.3, 1)",
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
