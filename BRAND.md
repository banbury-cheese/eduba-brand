# Eduba Brand System
> **For AI agents:** Start with `AGENT_BRIEF.md`. Use this file as the deep reference and rationale. If this document conflicts with token files or the brief, prefer the token files first, then `AGENT_BRIEF.md`.

---

## 1. Identity

**Company:** Eduba  
**Tagline (never used as tagline):** When not to use AI  
**Core positioning:** A veteran-owned AI consulting and training firm. We help organizations figure out which problems belong to AI, which belong to traditional software, which belong to people, and which should not be built at all.  
**Founded by:** Jake van Clief — 8 years USMC (cryptographic systems, F-35/F-18 avionics), MSc Future Governance (University of Edinburgh), published AI ethics researcher.  
**Email:** theceo@eduba.io  
**Logo text:** THE FACES OF INTERFACE

**Brand personality:** Calm authority. Architectural precision. Restrained warmth. Think: a precision instrument made from warm materials. Never loud, never minimal to the point of coldness.

---

## 2. Colors

Use these exact values. No substitutions.

| Token | Hex | Usage |
|---|---|---|
| `$dark-brown` | `#5D3136` | Primary. Nav backgrounds, headings, borders, interactive elements, frame background. |
| `$white` | `#FEFBF6` | Warm white. Default light surface, content area background, text on dark. |
| `$cream` | `#EAD5D6` | Secondary accent. Borders on hover, chip backgrounds, subtle dividers. |
| `$skin` | `#F9ECDF` | Warm card/section fill. Inner container backgrounds. |
| `$text-dark` | `#4A2C2A` | Body text on light surfaces. |
| `$light-brown` | `#A2777A` | Muted text, meta labels, secondary UI. |
| `$light-pink` | `#D8BFC0` | Card borders, chip resting state, corner arrow accent. |
| `$subtitle` | `#7D5658` | Secondary headings on light. |
| `$brown-gradient` | `linear-gradient(358deg, #492526 1.79%, #5D4143 97.65%)` | SVG fills for display title text only. |
| Green dot | `#25CA58` | Pulsing status indicator on primary CTA only. |
| Success | `#1A9C43` | Form submit success state. |

### Card/Section Themes
Five named themes used for content cards and service sections:

| Name | Background | Title text |
|---|---|---|
| rose | `#D8BFC1` | `#5D3136` |
| mediumBrown | `#7B5A5C` | `#FEFBF6` |
| paper | `#FFFFFF` | `#5D3136` |
| skin | `#F9ECDF` | `#5D3136` |
| darkWine | `#5D3136` | `#FEFBF6` |

---

## 3. Typography

### Fonts

**Diatype** — content & editorial font (self-hosted, files in `/fonts/`)
- `diatype-bold.woff2` → `font-weight: 700`
- `diatype-med.woff2` → `font-weight: 500`
- `diatype-reg.woff2` → `font-weight: 300`
- Used for: all body text, headings, titles, descriptions, card text, hero text, subtitles, FAQ content — everything read at length

**IBM Plex Mono** — system/UI accent font (Google Fonts or `@fontsource/ibm-plex-mono`)
- Used for: page indices (`/001`), page tags, nav links, buttons, section labels, card IDs, step indices/titles, metadata, CTAs, form inputs

**How they work together:**
- `body` sets `font-family: IBM Plex Mono` — governs the app shell (home page, nav bar)
- Sector/content pages set `font-family: Diatype` on their root container — flips the base for all content
- IBM Plex Mono is then re-applied individually to system/accent elements within content pages

**Mental model:** IBM Plex Mono = machine/system voice. Diatype = human/editorial voice. The shell speaks in system voice. Content experiences speak in human voice.

### Font loading (CSS)
```css
@font-face {
  font-family: "Diatype";
  font-weight: 700;
  font-display: swap;
  src: url(/fonts/diatype-bold.woff2) format("woff2");
}
@font-face {
  font-family: "Diatype";
  font-weight: 500;
  font-display: swap;
  src: url(/fonts/diatype-med.woff2) format("woff2");
}
@font-face {
  font-family: "Diatype";
  font-weight: 300;
  font-display: swap;
  src: url(/fonts/diatype-reg.woff2) format("woff2");
}
```

### Type Scale

**Diatype — content elements (normal/lowercase case)**

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero display (home) | `clamp(120px, 20vw, 280px)` | 700 | line-height: 0.85, letter-spacing: -0.02em |
| Hero title (sector) | `clamp(44px, 5vw, 92px)` | 700 | white-space: pre-line |
| Section heading | `clamp(28px, 3.4vw, 44px)` | 700 | line-height: 1.1 |
| CTA title | `clamp(26px, 3.4vw, 40px)` | 700 | line-height: 1.1 |
| Body / subtitle | `14–15px` | 300 | line-height: 1.6, color: $subtitle |
| Card title | `15px` | 700 | text-transform: **lowercase** |
| FAQ question | `14px` | 600 | text-transform: **lowercase** |

**IBM Plex Mono — system/accent elements (always uppercase)**

| Role | Size | Weight | Notes |
|---|---|---|---|
| Page index | `11px` | 700 | letter-spacing: 0.2em |
| Page tag | `11px` | 700 | letter-spacing: 0.1em |
| Section meta label | `16px` | 700 | |
| Card ID | `12px` | 700 | letter-spacing: 0.05em |
| Step index/title | `12px` | 600 | letter-spacing: 0.1em |
| Nav links / shell UI | `11px` | 600 | |
| Buttons (all) | `11–14px` | 600–700 | |
| Form inputs | `9px` | 400 | |
| Micro label | `7px` | 700 | letter-spacing: 0.09em |

**Key case rules:** Diatype elements are normal/sentence case or lowercase — never uppercase. IBM Plex Mono elements are always uppercase — no exceptions. Note the intentional `text-transform: lowercase` on card titles and FAQ questions (Diatype, all-lower).

---

## 4. Layout

**Approach:** Preferred flagship/public-facing shell. Use a fixed app-shell when the experience should feel authored, framed, and editorial. Do not force this pattern onto dense internal tools by default.

```scss
html, body {
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'IBM Plex Mono', monospace;
  background-color: #5D3136;   // The dark brown frame is always visible
  color: #4A2C2A;
  -webkit-font-smoothing: antialiased;
  isolation: isolate;           // Required for film grain blend mode
}
```

**Frame structure:**
```
┌─────────────────────────────────┐  background: #5D3136
│  top nav (auto height)          │  padding: 8px (5px mobile)
├─────────────────────────────────┤
│                                 │
│  content area (1fr)             │  background: #FEFBF6
│  border-radius: 4px             │  overflow-y: auto
│  (main content scrolls here)    │
│                                 │
├─────────────────────────────────┤
│  bottom nav (auto height)       │
└─────────────────────────────────┘
```

Grid: `display: grid; grid-template-rows: auto 1fr auto; height: 100svh;`

---

## 5. Spacing

| Token | Value | Usage |
|---|---|---|
| `$frame-padding` | `12px` | Base unit |
| `$content-padding` | `40px` | Primary content areas |
| `$section-gap` | `60px` | Between major sections |
| `$radius-sm` | `4px` | Most components — default border radius |
| `$radius-md` | `8px` | Cards |
| `$radius-lg` | `12px` | Modals, overlays |

**Prefer 4px radius.** The design leans architectural — corners are nearly sharp.

---

## 6. Breakpoints

```scss
$breakpoints: (
  "small":     380px,
  "phone":     425px,
  "tablet":    800px,
  "desktop":   1366px,
  "LGdesktop": 1920px,
);
```

Primary mobile breakpoint: `<=tablet` (800px). Uses `include-media` SCSS library.

```scss
// Syntax
@include media('<=tablet') { }
@include media('<=phone') { }
@include media('>=desktop') { }
```

---

## 7. Film Grain

Film grain is the default for flagship/public-facing Eduba experiences. It is optional for dense utility products, internal tooling, or screens where constant texture would reduce clarity.

**Implementation:** Canvas-based animated noise overlay. Renders grayscale random pixels at 15 FPS, scales canvas resolution down to ~2M pixels for performance, stretches with CSS.

**Visual properties:**
- `opacity: 0.055`
- `mix-blend-mode: soft-light`
- `z-index: 9999`
- `position: fixed; inset: 0`
- `pointer-events: none`
- Respects `prefers-reduced-motion`

**Requires `isolation: isolate` on body** for the blend mode to composite correctly.

See `components/FilmGrain.tsx` for the full React implementation.

---

## 8. Logo

**SVG:** `assets/svgs/logo.svg`  
**Viewbox:** `0 0 20 17`  
**Structure:** Two separate `<path>` elements:
- `data-logo-body` — 4-node connected network cluster (fillRule="evenodd")
- `data-logo-node` — standalone isolated node (right side)

**Colors:** White (`#FEFBF6`) on dark backgrounds. `#5D3136` on light backgrounds.

**Hover animation (GSAP):**
```js
// On mouseenter
gsap.to(svg, { scale: 1.14, duration: 0.22, ease: "back.out(2)", transformOrigin: "50% 50%" });
gsap.to(node, { x: 2, duration: 0.28, ease: "back.out(1.5)" });

// On mouseleave
gsap.to(svg, { scale: 1, duration: 0.3, ease: "power2.out", transformOrigin: "50% 50%" });
gsap.to(node, { x: 0, duration: 0.3, ease: "power2.out" });
```

---

## 9. Navigation UI

### Top nav
- Logo (icon + "THE FACES OF INTERFACE" text)
- Nav links: `11px`, IBM Plex Mono, `font-weight: 600`, `text-transform: uppercase`
- Chips (nav buttons): `height: 28px`, `border-radius: 4px`, `padding: 3px 12px`
- Chip background element scales `scaleX: 1.04` on hover with `duration: 0.18, ease: power2.out`
- Text scrambles on hover using GSAP ScrambleTextPlugin (`chars: "upperCase"`)
- Primary CTA chip: black background (`#000000`), white text, green pulsing dot (`#25CA58`)

### Green dot pulse
```css
.dot {
  width: 5px;
  height: 5px;
  background-color: #25CA58;
  border-radius: 50%;
  animation: dotBlink 2s ease-in-out infinite;
}
@keyframes dotBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.15; }
}
```

### Bottom nav contact form
- "START A CONVERSATION" trigger opens an expandable form panel
- Expansion uses CSS `grid-template-rows: 0fr → 1fr` (NOT max-height) with `transition: 0.52s cubic-bezier(0.16, 1, 0.3, 1)`
- On open: main content blurs `blur(7px)`, backdrop appears for click-to-close
- Arrow icon rotates 180° on open (`duration: 0.38, ease: power2.inOut`)
- ESC key closes the form
- Submit opens `mailto:` link

---

## 10. Tab Shapes

Two tab SVG shapes used throughout for navigation and card labels.

### Wide tab (desktop)
- **File:** `assets/svgs/tab-shape-wide.svg`
- **ViewBox:** `0 0 344 46`
- **Path:** `M0 7V45.5H344L311.601 2.77064C310.277 1.02527 308.213 0 306.023 0H7C3.13401 0 0 3.13401 0 7Z`
- **IMPORTANT:** When container width < 344px, add `preserveAspectRatio="none"` to prevent height shrinkage due to aspect ratio. Without this the visible height drops to ~25px even if container is 46px.

### Compact tab (mobile)
- **File:** `assets/svgs/tab-shape-compact.svg`
- **ViewBox:** `0 0 103 46`
- **Path:** `M0 7V45.5H103L70.6008 2.77064C69.2774 1.02527 67.2133 0 65.023 0H7C3.13401 0 0 3.13401 0 7Z`
- Dimensions match exactly at `width: 103px, height: 46px` — no distortion.
- Desktop: show wide tab. Mobile (`<=tablet`): show compact tab with NavArrow icon.

### NavArrow component
Compact black tab with double-chevron icon for mobile back/forward navigation.
```css
/* CSS custom property for hover direction */
--arrow-hover-x: -3px;  /* back */
--arrow-hover-x: 3px;   /* forward */

.iconPositioner {
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.wrap:hover .iconPositioner {
  transform: translateX(var(--arrow-hover-x));
}
```

---

## 11. Animation System

**Library:** GSAP 3 (`gsap` package). Register `ScrambleTextPlugin` for text reveals.

### Core principles
1. Always call `gsap.killTweensOf(target)` before animating the same target again.
2. Never set `transform-box` or `transform-origin` in CSS for elements GSAP animates with `transformOrigin`. GSAP owns SVG transforms exclusively.
3. Use `will-change: transform` on frequently animated elements.
4. `back.out()` for spring/overshoot. `power2.out` for smooth settle. `power2.inOut` for symmetric transitions.

### Easing vocabulary
| Feel | Ease |
|---|---|
| Spring pop | `back.out(2)` |
| Elastic nudge | `back.out(1.5)` |
| Smooth settle | `power2.out` |
| Symmetric | `power2.inOut` |
| Panel open | `cubic-bezier(0.16, 1, 0.3, 1)` |
| CSS spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| CSS elastic | `cubic-bezier(0.34, 1.48, 0.64, 1)` |

### Text scramble pattern
```js
gsap.to(element, {
  duration: 0.8,
  scrambleText: {
    text: originalText,
    chars: "upperCase",
    revealDelay: 0,
    speed: 0.8,
  },
});
```
Store original text in `element.dataset.originalLabel`. Kill tweens before starting.

### Panel expansion pattern
```css
/* Preferred for unknown/auto content height */
.panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.52s cubic-bezier(0.16, 1, 0.3, 1);
}
.panel.open {
  grid-template-rows: 1fr;
}
.panelInner {
  overflow: hidden;
  min-height: 0;
}
```

### Dots grid animation
```js
// 16 [data-dot] SVG paths — hover on parent button
gsap.to(dots, {
  scale: 1.55,
  transformOrigin: "50% 50%",
  duration: 0.12,
  stagger: 0.024,
  ease: "power2.out",
  yoyo: true,
  repeat: 1,
});
// CRITICAL: no transform-box or transform-origin in CSS for [data-dot]
```

---

## 12. Resource Card Icon Animations

Each resource card icon has a distinct hover animation. All use CSS transitions with `transform-box: fill-box; transform-origin: center; transition: transform 0.42s cubic-bezier(0.34, 1.48, 0.64, 1)`.

| Card | Animation |
|---|---|
| Scribe | Fork opens: nodes translate (-2.5px,-3px), (-2.5px,3px), (2px,0) |
| Study Arcade | Four corners breathe outward ±2.5px with stagger |
| Vox Meet | EQ bars pulse up/down with 0.03–0.14s stagger delays |
| Clief Notes | Checkmark traces path: nodes at (2.5px,-2px), (1px,1.5px), (-2px,1px) |
| Substack | Grid corners expand ±2.5px, center scales 1.22× with `cubic-bezier(0.34, 1.8, 0.64, 1)` |

---

## 13. Corner Arrow Accent

Decorative triangular corner element. File: `assets/svgs/arrow-corner.svg`.

- **Path:** `M30 0L30 30L0 30L30 0Z` (30×30 viewBox)
- **Default color:** `#D8BFC0` (`$light-pink`)
- **Flip:** `transform="scale(-1,1) translate(-30,0)"` for mirrored variant
- Used at card/section corners as a visual accent

---

## 14. Voice Summary

*(Full guide in `voice/VOICE.md`)*

**Register:** Calm, measured, architectural. A teacher leaning forward — not a salesman shouting.

**Key rules:**
- Calm confidence, never hype
- Lead with insight, not credentials
- Concrete over abstract — use exact numbers
- Understate — facts carry the weight
- One concept per piece
- Never use em dashes
- Land with a sentence that reframes something

**The Brand's Fourth Position:** While others hype, doom, or parade tools, we occupy "The Builder's Calm" — AI is the latest abstraction layer. The real skill is knowing when to use it and when not to.

---

## 15. Copy Patterns

**Navigation:**
- "THE FACES OF INTERFACE" (logo text)
- "START A CONVERSATION" (contact CTA)
- "Clief Notes" (chapters nav)
- "theceo@eduba.io" (primary email CTA)

**Three-wheel strategy:** Build. Teach. Govern.

**Proof points to use in copy:**
- 600+ people trained across Pacific Life, Colgate-Palmolive, KPMG UK, IAG, University of Edinburgh
- 95% sustained adoption after 30 days (industry average: ~10%)
- 6,000–9,000 hours saved annually from Pacific Life/Colgate workflows
- Veteran-owned: 8 years USMC cryptographic systems and F-35/F-18 avionics

**Sentence rhythm:** Short. Declarative. Then the longer explanation. Then short again.
> "We start with what people actually do all day. Before training or building anything, we map real workflows. Where time goes. What is tedious. What is high stakes."

---

## 16. Tech Stack Reference

Built with: Next.js (App Router), React, TypeScript, SCSS Modules, GSAP 3, Sanity CMS, Sonner (toasts).

When building Eduba apps, prefer this stack. SCSS modules with `@use` imports. `include-media` for breakpoints. GSAP for all animation (not Framer Motion, not CSS animations except for simple keyframes).

---

## Quick Reference

```
Primary color:    #5D3136
White:            #FEFBF6  (default light surface)
Paper:            #FFFFFF  (exception surface, use sparingly)
Skin:             #F9ECDF
Cream:            #EAD5D6
Accent:           #D8BFC0

Editorial font:   Diatype — body text, headings, all content (bold/med/reg .woff2 in /fonts/)
System font:      IBM Plex Mono — nav, buttons, labels, IDs, metadata (always uppercase)
Shell default:    body { font-family: IBM Plex Mono }
Content default:  .page { font-family: Diatype } — sector/content pages override shell

Border radius:    4px (default)
Frame bg:         #5D3136
Content bg:       #FEFBF6
Layout:           Fixed app-shell, grid auto/1fr/auto, 100svh

Grain:            opacity 0.055, mix-blend-mode soft-light, z-index 9999
Animation lib:    GSAP 3
Spring ease:      back.out(2)
Panel ease:       cubic-bezier(0.16, 1, 0.3, 1)
CSS spring:       cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## 17. Footer Pattern

Four-column grid on dark wine (`#5D3136`) background.

- **Col 1:** `assets/svgs/brand-mark-white.svg` (height 14px) + Diatype 300 14px 70%-opacity description.
- **Cols 2–4:** Link groups — PRODUCTS, RESEARCH, ELSEWHERE — mono 8px uppercase headers (0.12em spacing) + mono 10px items below.
- **Bottom strip:** Left: `© EDUBA LTD · EST. 2023 · EDINBURGH, SCOTLAND`. Right: `THE FACES OF INTERFACE`. Both IBM Plex Mono 9px, 70% opacity.

See `ui_kits/eduba-io/Contact.jsx` → `Footer` for reference implementation.

---

## 18. Toast Notification Pattern

Sharp rectangular toast (border-radius 0).

```css
.toast {
  background: #5D3136;
  color: #FEFBF6;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 10px 20px;
  box-shadow: 0 18px 40px rgba(93, 49, 54, 0.16);
  border-radius: 0;
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
}
```

Content: short uppercase mono. Examples: `OPENING SCRIBE…`, `LINK COPIED`, `VOX-MEET IS COMING SOON.`
In Next.js: `<Toaster position="bottom-center" />` with `toastOptions` overriding the values above.

---

## 19. Motion Duration Tokens

| CSS custom property | Value | GSAP seconds | Use |
|---|---|---|---|
| `--eb-dur-hover` | `220ms` | `0.22` | All hover transitions |
| `--eb-dur-chip` | `180ms` | `0.18` | Nav chip `scaleX 1.04` |
| `--eb-dur-panel` | `520ms` | `0.52` | Contact form / accordion expand |

Defined in `tokens/tokens.css` and `animations/animations.ts` (`duration` export).
