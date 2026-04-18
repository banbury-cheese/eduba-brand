---
name: eduba-brand
description: Apply the Eduba brand system when building any Eduba product, UI, or feature. Use when building with Eduba design tokens, implementing the Eduba visual identity (colors, fonts, layout), following Eduba design patterns (folder tabs, film grain, nav chips), writing in the Eduba voice, or any time "eduba brand" or "eduba design system" is mentioned.
compatibility: Designed for Claude Code and any compatible agent. No system package dependencies.
metadata:
  version: "2.0"
  repo: eduba-brand
---

# Eduba Brand System

Apply all rules below when building any Eduba-branded product. Read [SKILLS.md](references/SKILLS.md) for copy-paste implementation recipes. Read [TOKENS.md](references/TOKENS.md) for the complete token reference.

---

## Non-negotiables

- Default light surface: `#FEFBF6` — never pure `#FFFFFF` unless intentionally "paper".
- Primary dark: `#5D3136`. Deep wine `#421D24` for gradients and accents only.
- Editorial font: **Diatype** (self-hosted woff2). System/UI font: **IBM Plex Mono**.
- Default corner radius: **4px** — sharp, architectural.
- Never use em dashes. Never use emoji. No purple gradients, glassmorphism, or oversized radii.
- `#25CA58` (green) is the pulsing status dot **only** — never a fill color.
- `#1A9C43` (success green) is for form-submit success states only.

---

## Colors

```
#5D3136   dark-brown    Primary. Nav backgrounds, headings, borders, frame bg.
#FEFBF6   white         Default light surface. Text on dark.
#F9ECDF   skin          Warm card/section fill.
#EAD5D6   cream         Chip hover, dividers, secondary accent.
#D8BFC0   light-pink    Card borders, chip resting bg.
#4A2C2A   text-dark     Body text on light surfaces.
#A2777A   light-brown   Muted labels, meta text.
#7D5658   subtitle      Secondary headings on light.
#421D24   deep-wine     Gradient stops, brand-mark bg rect.

linear-gradient(358deg, #492526 1.79%, #5D4143 97.65%)   brown-gradient   Display SVG fills only.
```

Five card/section themes — rotate in this order:
```
1. rose        bg #D8BFC1   title #5D3136
2. mediumBrown bg #7B5A5C   title #FEFBF6
3. paper       bg #FFFFFF   title #5D3136
4. skin        bg #F9ECDF   title #5D3136
5. darkWine    bg #5D3136   title #FEFBF6
```

---

## Typography

Two fonts. Two roles. Never mix them up.

**Diatype** → editorial/human voice
- All body text, headings, titles, descriptions, card text, FAQ, prose.
- Weight: 300 (body), 500 (medium), 700 (bold/headings).
- Case: sentence case or lowercase. **Never uppercase** (except oversized hero treatments).
- Card titles: bold lowercase — intentional, preserve it.
- FAQ: 600 lowercase — intentional.
- Card body: `text-indent: 30px` — intentional typographic detail, preserve it.

**IBM Plex Mono** → system/machine voice
- Nav, buttons, labels, IDs, tags, metadata, CTAs, form inputs, step numbers.
- **Always uppercase. No exceptions.**
- Weights: 600 or 700 for most UI uses.

**Context rule:**
- Shell body: `font-family: IBM Plex Mono` (system voice default).
- Content pages: set `font-family: Diatype` on `.page` root, re-apply mono to accent elements explicitly.

**Key sizes:**
```
Hero display:     clamp(120px, 20vw, 280px)   Diatype 700   lh 0.85
Sector hero:      clamp(44px, 5vw, 92px)      Diatype 700
Section heading:  clamp(28px, 3.4vw, 44px)    Diatype 700   lh 1.1
Body text:        14–15px                      Diatype 300   lh 1.6
Card title:       15px                         Diatype 700   lowercase
FAQ:              14px                         Diatype 600   lowercase
Section label:    16px                         Mono 700      uppercase
Card ID:          12px                         Mono 700      0.05em spacing
Step label:       12px                         Mono 600      0.1em spacing
Nav/button:       11px                         Mono 600      uppercase
Micro label:      7px                          Mono 700      0.09em spacing
```

---

## Shell Pattern

Use for flagship/public-facing surfaces. **Skip for** dense dashboards, admin panels, utility tooling.

```css
html, body {
  height: 100%;
  overflow: hidden;
  background: #5D3136;
  isolation: isolate;   /* required for film grain mix-blend-mode */
}

.frame {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100svh;
  padding: 8px;         /* 5px on mobile */
}

.content {
  background: #FEFBF6;
  border-radius: 4px;
  overflow-y: auto;
}
```

---

## Folder Tab Cards

Signature motif. Use for: case studies, services, stacked narratives, FAQs.

**Critical tab shape rule:**
- **Desktop (≥ 800px):** `tab-shape-wide.svg` (viewBox `0 0 344 46`)
- **Mobile (< 800px):** `tab-shape-compact.svg` (viewBox `0 0 103 46`)
- If the wide tab is CSS-constrained below 344px wide, add `preserveAspectRatio="none"` to prevent height shrinkage.

```tsx
{/* Desktop */}
<svg viewBox="0 0 344 46" fill="none" preserveAspectRatio="none">
  <path d="M0 7V45.5H344L311.601 2.77064C310.277 1.02527 308.213 0 306.023 0H7C3.13401 0 0 3.13401 0 7Z" fill="currentColor"/>
</svg>

{/* Mobile */}
<svg viewBox="0 0 103 46" fill="none">
  <path d="M0 7V45.5H103L70.6008 2.77064C69.2774 1.02527 67.2133 0 65.023 0H7C3.13401 0 0 3.13401 0 7Z" fill="currentColor"/>
</svg>
```

Tab sits at `top: -46px; height: 46px` above the card body. Content: large Diatype title left, mono metadata right, dashed divider below header row.

---

## Motion

Use GSAP for all real UI motion.

```
Easing:
  back.out(2)                              spring pop — scale/appear
  back.out(1.5)                            elastic nudge — translate
  power2.out                               smooth settle — default exit
  power2.inOut                             symmetric — rotations, toggles
  cubic-bezier(0.16, 1, 0.3, 1)           panel open
  cubic-bezier(0.34, 1.56, 0.64, 1)       CSS spring (NavArrow hover)
  cubic-bezier(0.34, 1.48, 0.64, 1)       CSS elastic (icon hover)

Duration tokens:
  hover:  220ms / 0.22s   — all hover interactions
  chip:   180ms / 0.18s   — chip scaleX 1.04
  panel:  520ms / 0.52s   — panel/accordion expand
```

**Panel expansion:** `grid-template-rows: 0fr → 1fr` with `0.52s cubic-bezier(0.16,1,0.3,1)`. **Do NOT** animate `max-height`.

**Rules:**
1. Always `gsap.killTweensOf(target)` before re-animating.
2. Never set `transform-box` or `transform-origin` in CSS for SVG elements GSAP animates with `transformOrigin`.
3. Scramble text is an accent — not a default for every label.

---

## Film Grain

Default for all flagship surfaces. Optional for utility tools.

```css
.filmGrain {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: soft-light;
  z-index: 9999;
}
body { isolation: isolate; }
```

Component: `components/FilmGrain.tsx`. Place as the last child of the layout root. Respects `prefers-reduced-motion`.

---

## Signature Moves

- **Five-theme rotation** on card/service grids (rose → mediumBrown → paper → skin → darkWine).
- **Folder tab** attached to body panel — wide SVG on desktop, compact on mobile.
- **Nested 1px borders** for the CTA ticket form (outer `#FEFBF6`/`#5D3136`, middle `#F9ECDF`/`#A2777A`).
- **Green pulsing dot** on primary CTA chip: 5×5px `#25CA58`, `animation: dotBlink 2s ease-in-out infinite`.
- **Section label pattern:** `SECTION 0X / NAME` in mono 700 uppercase, followed by large Diatype heading.
- **Film grain over everything** on public surfaces.

---

## Voice (brief)

Marketing/editorial voice: calm confidence, no hype, concrete over abstract, understate.
Product/UI voice: direct, exact, useful — not theatrical.
Forbidden words: unlock, revolutionary, game-changing, magic, seamless, empower, leverage, reimagine, future-proof.
Buttons: "Open Case" / "View Project" / "Start A Conversation" — not "Explore Possibilities".

---

## Avoid

- Pure `#FFFFFF` surfaces (use `#FEFBF6`)
- Generic startup gradients or glassmorphism
- Centered-everything layouts
- Oversized border radii (keep to 4px / 8px / 12px max)
- Decorative animations with no functional purpose
- Spreading 5 surface colors across one screen without intention
- IBM Plex Mono in lowercase
- Diatype in uppercase (except hero)
- Em dashes in any copy

---

## Reference files

- **[SKILLS.md](references/SKILLS.md)** — copy-paste implementation recipes: shell, folder tab, five-theme, film grain, nav chip, contact form, node icons, resource grid.
- **[TOKENS.md](references/TOKENS.md)** — complete token reference: all colors, full type scale, spacing, breakpoints, motion durations.
- **[VOICE.md](references/VOICE.md)** — marketing voice system, hook patterns, content pillars, product microcopy rules.
