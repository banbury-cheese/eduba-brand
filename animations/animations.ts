/**
 * Eduba Animation Patterns
 *
 * Copy-paste GSAP and CSS animation patterns used across all Eduba products.
 * Requires: gsap (npm install gsap)
 * Register plugins once at app entry: gsap.registerPlugin(ScrambleTextPlugin)
 *
 * CRITICAL RULES:
 * 1. Always call gsap.killTweensOf(target) before animating the same target.
 * 2. Never set transform-box or transform-origin in CSS for SVG elements
 *    that GSAP animates with transformOrigin — let GSAP own SVG transforms.
 * 3. Use will-change: transform on frequently animated elements.
 */

import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

// ─── Easing constants ────────────────────────────────────────────────────────

export const ease = {
  /** Spring pop — for scale/appear interactions */
  spring: "back.out(2)",
  /** Subtle elastic nudge — for translate interactions */
  nudge: "back.out(1.5)",
  /** Smooth settle — default exit/reset */
  settle: "power2.out",
  /** Symmetric in-out — for rotations, toggles */
  symmetric: "power2.inOut",
  /** Panel open — fast in, slow settle */
  panel: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** CSS spring — for NavArrow hover (use in CSS transition property) */
  cssSpring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  /** CSS elastic — for resource card icon hover */
  cssElastic: "cubic-bezier(0.34, 1.48, 0.64, 1)",
} as const;

// ─── Logo interaction ────────────────────────────────────────────────────────
// The logo SVG has two paths: [data-logo-body] and [data-logo-node].
// The standalone node (right circle) nudges outward on hover.

export function animateLogo(logoSectionEl: HTMLElement) {
  const svg = logoSectionEl.querySelector(".logoIcon svg") as SVGElement | null;
  const node = svg?.querySelector("[data-logo-node]") as SVGElement | null;
  if (!svg) return;
  gsap.killTweensOf([svg, node].filter(Boolean));
  gsap.to(svg, { scale: 1.14, duration: 0.22, ease: ease.spring, transformOrigin: "50% 50%" });
  if (node) gsap.to(node, { x: 2, duration: 0.28, ease: ease.nudge });
}

export function resetLogo(logoSectionEl: HTMLElement) {
  const svg = logoSectionEl.querySelector(".logoIcon svg") as SVGElement | null;
  const node = svg?.querySelector("[data-logo-node]") as SVGElement | null;
  if (!svg) return;
  gsap.killTweensOf([svg, node].filter(Boolean));
  gsap.to(svg, { scale: 1, duration: 0.3, ease: ease.settle, transformOrigin: "50% 50%" });
  if (node) gsap.to(node, { x: 0, duration: 0.3, ease: ease.settle });
}

// ─── Nav chip hover ──────────────────────────────────────────────────────────
// The chip has a .navChipBg element that scales and changes color on hover.

export function animateChipEnter(
  chipEl: HTMLElement,
  opts: { backgroundColor: string; color: string; scaleX?: number; borderColor?: string },
) {
  const bg = chipEl.querySelector("[class*='navChipBg']") as HTMLElement | null;
  if (bg) {
    gsap.killTweensOf(bg);
    gsap.to(bg, {
      backgroundColor: opts.backgroundColor,
      borderColor: opts.borderColor ?? "transparent",
      scaleX: opts.scaleX ?? 1.04,
      duration: 0.18,
      ease: ease.settle,
    });
  }
  gsap.killTweensOf(chipEl);
  gsap.to(chipEl, { color: opts.color, duration: 0.18, ease: ease.settle });
}

export function animateChipLeave(
  chipEl: HTMLElement,
  opts: { backgroundColor: string; color: string; borderColor?: string },
) {
  const bg = chipEl.querySelector("[class*='navChipBg']") as HTMLElement | null;
  if (bg) {
    gsap.killTweensOf(bg);
    gsap.to(bg, {
      backgroundColor: opts.backgroundColor,
      borderColor: opts.borderColor ?? "transparent",
      scaleX: 1,
      duration: 0.18,
      ease: ease.settle,
    });
  }
  gsap.killTweensOf(chipEl);
  gsap.to(chipEl, { color: opts.color, duration: 0.18, ease: ease.settle });
}

// ─── Scramble text ───────────────────────────────────────────────────────────
// Store original text in element.dataset.originalLabel on first call.

export function scrambleText(el: HTMLElement | null, activeColor: string) {
  if (!el) return;
  if (!el.dataset.originalLabel) el.dataset.originalLabel = el.textContent ?? "";
  gsap.killTweensOf(el);
  gsap.to(el, { color: activeColor, duration: 0.2, ease: ease.settle });
  gsap.to(el, {
    duration: 0.8,
    scrambleText: {
      text: el.dataset.originalLabel,
      chars: "upperCase",
      revealDelay: 0,
      speed: 0.8,
    },
  });
}

export function resetScrambleText(el: HTMLElement | null, restingColor: string) {
  if (!el) return;
  gsap.killTweensOf(el);
  el.textContent = el.dataset.originalLabel ?? el.textContent ?? "";
  gsap.to(el, { color: restingColor, duration: 0.2, ease: ease.settle });
}

// ─── Dots grid animation ─────────────────────────────────────────────────────
// 16 SVG <path data-dot> elements in the Clief Notes nav button.
// CRITICAL: no transform-box/transform-origin in CSS for [data-dot].

export function animateDots(buttonEl: HTMLElement) {
  const dots = buttonEl.querySelectorAll("[data-dot]");
  gsap.killTweensOf(dots);
  gsap.to(dots, {
    scale: 1.55,
    transformOrigin: "50% 50%",
    duration: 0.12,
    stagger: 0.024,
    ease: "power2.out",
    yoyo: true,
    repeat: 1,
  });
}

export function resetDots(buttonEl: HTMLElement) {
  const dots = buttonEl.querySelectorAll("[data-dot]");
  gsap.killTweensOf(dots);
  gsap.to(dots, {
    scale: 1,
    transformOrigin: "50% 50%",
    duration: 0.18,
    stagger: 0.01,
    ease: "power2.inOut",
  });
}

// ─── Contact form open/close ─────────────────────────────────────────────────
// arrowRef: the SVG arrow inside the trigger button
// contentRef: the main page content that blurs behind the form

export function openContactForm(
  arrowRef: SVGSVGElement | null,
  contentRef: HTMLElement | null,
  formPanelRef: HTMLDivElement | null,
) {
  gsap.to(arrowRef, { rotate: 180, duration: 0.38, ease: ease.symmetric });
  if (contentRef) gsap.to(contentRef, { filter: "blur(7px)", duration: 0.45, ease: ease.settle });

  // Stagger in form fields after panel has started opening
  setTimeout(() => {
    const fields = formPanelRef?.querySelectorAll("[data-field]") ?? [];
    gsap.fromTo(
      fields,
      { opacity: 0, y: 7 },
      { opacity: 1, y: 0, duration: 0.26, stagger: 0.055, ease: ease.settle },
    );
  }, 90);
}

export function closeContactForm(
  arrowRef: SVGSVGElement | null,
  contentRef: HTMLElement | null,
) {
  gsap.to(arrowRef, { rotate: 0, duration: 0.32, ease: ease.symmetric });
  if (contentRef) gsap.to(contentRef, { filter: "blur(0px)", duration: 0.32, ease: ease.settle });
}

// ─── Panel expand (CSS) ───────────────────────────────────────────────────────
// Use grid-template-rows instead of max-height — handles arbitrary content height.
// Apply .panelOpen class to trigger. The inner element needs min-height: 0.
//
// .panel {
//   display: grid;
//   grid-template-rows: 0fr;
//   transition: grid-template-rows 0.52s cubic-bezier(0.16, 1, 0.3, 1);
// }
// .panel.panelOpen {
//   grid-template-rows: 1fr;
// }
// .panelInner {
//   overflow: hidden;
//   min-height: 0;
// }

// ─── Green dot pulse (CSS keyframe) ──────────────────────────────────────────
// Used on the primary CTA email button in the nav.
// Add this CSS class to a 5×5px green circle element.
//
// .dot {
//   width: 5px;
//   height: 5px;
//   background-color: #25CA58;
//   border-radius: 50%;
//   animation: dotBlink 2s ease-in-out infinite;
// }
// @keyframes dotBlink {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.15; }
// }

// ─── NavArrow hover (CSS) ────────────────────────────────────────────────────
// The double-chevron icon nudges left/right on hover.
// Set --arrow-hover-x as a CSS custom property on the element.
//
// HTML: <span style="--arrow-hover-x: -3px">  (back direction)
//       <span style="--arrow-hover-x: 3px">   (forward direction)
//
// .wrap:hover .iconPositioner {
//   transform: translateX(var(--arrow-hover-x, -3px));
// }
// .iconPositioner {
//   transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
// }

// ─── Resource card icon hover (CSS) ──────────────────────────────────────────
// All resource card SVG node elements use this base transition:
//
// [class*="resourceNode"],
// [class*="resourceLink"] {
//   transform-box: fill-box;
//   transform-origin: center;
//   transition: transform 0.42s cubic-bezier(0.34, 1.48, 0.64, 1);
// }
//
// Per-icon transforms on .resourceCard:hover:
//
// Scribe (fork opens):
//   .resourceScribeNodeTopLeft    → translate(-2.5px, -3px)
//   .resourceScribeNodeBottomLeft → translate(-2.5px, 3px)
//   .resourceScribeNodeRight      → translate(2px, 0)
//
// Study Arcade (corners breathe):
//   .resourceStudyArcadeNodeTl → translate(-2.5px, -2.5px)
//   .resourceStudyArcadeNodeTr → translate(2.5px, -2.5px)
//   .resourceStudyArcadeNodeBl → translate(-2.5px, 2.5px)   transition-delay: 0.04s
//   .resourceStudyArcadeNodeBr → translate(2.5px, 2.5px)    transition-delay: 0.04s
//
// Vox Meet (EQ bars pulse, staggered):
//   .resourceVoxNodeTallTop    → translateY(-5px)
//   .resourceVoxNodeTallBottom → translateY(3px)    transition-delay: 0.03s
//   .resourceVoxNodeMidTop     → translateY(-3.5px) transition-delay: 0.07s
//   .resourceVoxNodeMidBottom  → translateY(2.5px)  transition-delay: 0.1s
//   .resourceVoxNodeSmallBottom→ translateY(2px)    transition-delay: 0.14s
//
// Clief Notes (checkmark traces):
//   .resourceCliefNodeTop    → translate(2.5px, -2px)
//   .resourceCliefNodeCenter → translate(1px, 1.5px)  transition-delay: 0.05s
//   .resourceCliefNodeLeft   → translate(-2px, 1px)   transition-delay: 0.1s
//
// Substack (grid expands from center):
//   .resourceSubstackNodeTl     → translate(-2.5px, -2.5px)
//   .resourceSubstackNodeTr     → translate(2.5px, -2.5px)
//   .resourceSubstackNodeBl     → translate(-2.5px, 2.5px)  transition-delay: 0.04s
//   .resourceSubstackNodeBr     → translate(2.5px, 2.5px)   transition-delay: 0.04s
//   .resourceSubstackNodeCenter → scale(1.22)                transition-delay: 0.02s
//                                 transition-timing-function: cubic-bezier(0.34, 1.8, 0.64, 1)
