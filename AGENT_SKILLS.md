# Eduba Agent Skills

Reusable implementation recipes for building Eduba-branded products.
Each skill is self-contained — read only the ones you need.

## Skill Index

1. [Shell Pattern](#1-shell-pattern)
2. [Folder Tab Card](#2-folder-tab-card)
3. [Five-Theme Rotation](#3-five-theme-rotation)
4. [Film Grain Overlay](#4-film-grain-overlay)
5. [Nav Chip with Scramble Text](#5-nav-chip-with-scramble-text)
6. [Contact Form Panel](#6-contact-form-panel)
7. [Node-and-Edge Icon](#7-node-and-edge-icon)
8. [Resource Card Grid](#8-resource-card-grid)

---

## 1. Shell Pattern

**When to use:** Flagship, public-facing, or branded surfaces (marketing sites, portals, reports).
**When not to use:** Dense dashboards, admin panels, dev tooling, settings pages.

**CSS:**
```css
html, body {
  height: 100%;
  overflow: hidden;
  background: #5D3136;   /* outer frame */
  isolation: isolate;    /* required for film grain blend mode */
}

.frame {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100svh;
  padding: 8px;           /* 5px on mobile */
}

.content {
  background: #FEFBF6;
  border-radius: 4px;
  overflow-y: auto;
}
```

**Rules:**
- Frame padding: 8px desktop, 5px mobile.
- Content area: `#FEFBF6`, radius 4px.
- Top row: nav. Middle row: content (1fr, scrolls). Bottom row: optional CTA.
- Film grain sits above everything at z-index 9999 — see Skill 4.

---

## 2. Folder Tab Card

**When to use:** Stacked narratives, case studies, services, FAQ, any collapsible sequence with editorial weight.
**When not to use:** Forms, data tables, settings pages, admin UIs.

**Assets:**
- Desktop tab: `assets/svgs/tab-shape-wide.svg` (viewBox 0 0 344 46)
- Mobile tab: `assets/svgs/tab-shape-compact.svg` (viewBox 0 0 103 46)

**Tab usage rules:**
- Use **wide** on desktop (≥ 800px). Use **compact** on mobile (< 800px).
- Wide tab at natural size (344×46) needs no extra attributes.
- If you constrain the wide tab's CSS width below 344px, add `preserveAspectRatio="none"` to prevent the SVG from shrinking the height proportionally.

```tsx
{/* Desktop tab — use tab-shape-wide.svg */}
<svg
  viewBox="0 0 344 46"
  fill="none"
  preserveAspectRatio="none"   /* add when CSS width < 344px */
  className={styles.tabSvg}
>
  <path
    d="M0 7V45.5H344L311.601 2.77064C310.277 1.02527 308.213 0 306.023 0H7C3.13401 0 0 3.13401 0 7Z"
    fill="currentColor"
  />
</svg>

{/* Mobile tab — use tab-shape-compact.svg */}
<svg viewBox="0 0 103 46" fill="none" className={styles.tabSvg}>
  <path
    d="M0 7V45.5H103L70.6008 2.77064C69.2774 1.02527 67.2133 0 65.023 0H7C3.13401 0 0 3.13401 0 7Z"
    fill="currentColor"
  />
</svg>
```

**Layout:**
```
┌─[TAB LABEL]─────────────────────────────┐
│ Diatype title (bold)   MONO META / YEAR  │
│ ─────────────────────────────────────── │
│ body content / gallery / summary         │
└──────────────────────────────────────────┘
```

**SCSS pattern:**
```scss
.card {
  position: relative;
  background: var(--theme-bg, #D8BFC1);
  border-radius: 4px;
}

.tab {
  position: absolute;
  top: -46px;
  left: 0;
  width: 200px; /* or fit-content */
  height: 46px;
  color: var(--theme-bg);
}

.tabSvg {
  width: 100%;
  height: 100%;
}
```

**Content grid:**
```scss
.body {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  padding: 24px;
}

.title {
  font-family: 'Diatype', sans-serif;
  font-size: clamp(32px, 3.2vw, 58px);
  font-weight: 700;
  text-transform: lowercase;
}

.meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

**Do:** Attach the tab directly to the body panel. Use large Diatype editorial headline left, mono metadata right. Add a dashed divider below the header row.
**Don't:** Float the tab separately from the card body. Don't use a folder tab for forms or dense data.

---

## 3. Five-Theme Rotation

**When to use:** Any multi-item grid or stacked sequence with 5 or fewer distinct items (services, case studies, steps, features).
**When not to use:** Grids larger than 5 — just repeat the cycle.

**Themes in order:**

| # | Name | Background | Title color |
|---|------|-----------|-------------|
| 1 | rose | `#D8BFC1` | `#5D3136` |
| 2 | mediumBrown | `#7B5A5C` | `#FEFBF6` |
| 3 | paper | `#FFFFFF` | `#5D3136` |
| 4 | skin | `#F9ECDF` | `#5D3136` |
| 5 | darkWine | `#5D3136` | `#FEFBF6` |

**TypeScript helper:**
```typescript
const THEMES = ['rose', 'mediumBrown', 'paper', 'skin', 'darkWine'] as const;
const themeIndex = (i: number) => THEMES[i % THEMES.length];
```

**CSS custom properties approach:**
```css
.card[data-theme="rose"]        { --theme-bg: #D8BFC1; --theme-title: #5D3136; }
.card[data-theme="mediumBrown"] { --theme-bg: #7B5A5C; --theme-title: #FEFBF6; }
.card[data-theme="paper"]       { --theme-bg: #FFFFFF; --theme-title: #5D3136; }
.card[data-theme="skin"]        { --theme-bg: #F9ECDF; --theme-title: #5D3136; }
.card[data-theme="darkWine"]    { --theme-bg: #5D3136; --theme-title: #FEFBF6; }
```

**Rules:**
- Always rotate 1→5 in order unless the layout is intentionally archival.
- Do not spread all 5 themes across a single screen randomly — use the rotation.
- For grids larger than 5, repeat the cycle from index 0.

---

## 4. Film Grain Overlay

**When to use:** All flagship/public surfaces by default.
**When not to use:** Dense utility tools or dashboards where the overlay adds noise to data.

**Component:** `components/FilmGrain.tsx` — drop-in React component.

**Required body CSS:**
```css
body { isolation: isolate; }
```

**Required `.filmGrain` CSS (already in `scss/globals.scss`):**
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
```

**Placement:** Last child of layout root so it renders above all content.
```tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <FilmGrain />
      </body>
    </html>
  );
}
```

**Performance:** Canvas scales to ~2M pixels regardless of viewport size. 15 FPS. Pauses automatically when `prefers-reduced-motion` is set.

---

## 5. Nav Chip with Scramble Text

**When to use:** Top navigation interactive elements (links, CTAs, secondary actions).

**Visual spec:**
- Height: 28px
- Padding: 3px 12px (adjust to content)
- Border-radius: 4px
- Font: IBM Plex Mono 11px 600 uppercase
- Resting: `bg #D8BFC0`, `color #5D3136`
- Hover: `bg #FEFBF6`, `scaleX 1.04`, text scramble

**Structure (HTML):**
```html
<button class="chip">
  <div class="chipBg"></div>  <!-- animated separately -->
  <span class="chipLabel">CLIEF NOTES</span>
</button>
```

**GSAP animation (from `animations/animations.ts`):**
```typescript
import { animateChipEnter, animateChipLeave, scrambleText, resetScrambleText } from './animations/animations';

// mouseenter
animateChipEnter(chipEl, '.chipLabel', { backgroundColor: '#FEFBF6', color: '#5D3136', scaleX: 1.04 });
scrambleText(labelEl, '#5D3136');

// mouseleave
animateChipLeave(chipEl, '.chipLabel', { backgroundColor: '#D8BFC0', color: '#5D3136' });
resetScrambleText(labelEl, '#5D3136');
```

**Dots variant (Chapters/Clief Notes chip):**
- Contains 16 `[data-dot]` SVG paths from `assets/svgs/dots-grid.svg`
- On hover: `animateDots(chipEl)` — GSAP scale 1.55, stagger 0.024, yoyo
- On leave: `resetDots(chipEl)`
- Never set `transform-box` or `transform-origin` in CSS on `[data-dot]` elements

**Primary CTA variant (black chip):**
- `bg #000000`, `color #FEFBF6`
- Green pulsing dot: 5×5px, `#25CA58`, CSS `animation: dotBlink 2s ease-in-out infinite`
- `@keyframes dotBlink { 0%,100% { opacity: 1 } 50% { opacity: 0.15 } }`

---

## 6. Contact Form Panel

**When to use:** Primary site-level CTA (bottom nav "START A CONVERSATION").

**Structure:**
Three nested frames:
1. Outer: `#FEFBF6` bg, `#5D3136` border, 5px padding
2. Middle: `#F9ECDF` bg, `#A2777A` border, 2px padding
3. Inner: trigger button + expandable form

**Expand animation (CSS):**
```css
.panelWrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.52s cubic-bezier(0.16, 1, 0.3, 1);
}
.panelWrap.open {
  grid-template-rows: 1fr;
}
.panelInner {
  overflow: hidden;
}
```

**Do NOT** animate `max-height` — use `grid-template-rows 0fr → 1fr`.

**On open (GSAP):**
```typescript
// Arrow rotates 180°
gsap.to(arrowRef, { rotate: 180, duration: 0.38, ease: 'power2.inOut' });
// Content blurs
gsap.to(contentRef, { filter: 'blur(7px)', duration: 0.45, ease: 'power2.out' });
// Fields stagger in
gsap.fromTo(fields, { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: 0.26, stagger: 0.055 });
```

**Success state:**
- Button background changes to `#1A9C43`
- Text shows "Message opened ✓"
- 1.4s delay, then reset and close

---

## 7. Node-and-Edge Icon

**When to use:** Resource cards, feature list icons, any spot where a small abstract icon is needed.

**Design vocabulary:**
- All icons use `stroke-width: 10.2`, thick cream strokes `#E9D6CD` for edges
- Dark wine `#5D3136` filled organic oval nodes at endpoints and junctions
- No hard corners — all fills use smooth bezier curves
- 3–6 paths per icon (1–2 strokes + 3–5 node fills)

**Available icons in `assets/svgs/icons/`:**

| File | Topology | Shape description |
|------|----------|-------------------|
| `icon-bridge.svg` | 2 crossing diagonals + 3 nodes | Two paths intersecting, nodes at endpoints |
| `icon-corners.svg` | 1 diagonal + 4 corner nodes | Corner cluster with single edge |
| `icon-columns.svg` | 2 vertical strokes + 6 nodes | Parallel vertical edges, dense nodes |
| `icon-fork.svg` | V-branch + 3 nodes | Branching split with junction node |
| `icon-rails.svg` | 2 horizontal rails + 5 nodes | 4 corner nodes + 1 center, two horizontal edges |

**Hover animation (CSS):**
```css
[data-icon-node] {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.42s cubic-bezier(0.34, 1.48, 0.64, 1);
}
.iconButton:hover [data-icon-node] {
  transform: translate(var(--hover-x, 0), var(--hover-y, 0));
}
```

Each icon's `[data-icon-node]` paths can be given individual `--hover-x` / `--hover-y` CSS custom properties for direction-specific nudges. Keep the displacement small (2–3px).

---

## 8. Resource Card Grid

**When to use:** Displaying 5 linked resources, products, or tools in a horizontal row.

**Layout:**
```css
.resourceGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* desktop */
  gap: 12px;
  padding: 0 20px;
}

@media (max-width: 800px) {
  .resourceGrid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
}
@media (max-width: 425px) {
  .resourceGrid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
}
```

**Each card:**
```
┌────────────────────────┐
│    [icon svg, 28px]    │
│                        │
│  LABEL                 │
│  META · 7px            │
└────────────────────────┘
```

- Aspect ratio: 2:1
- Font: IBM Plex Mono, label 11px 600 uppercase, meta 7px 700 uppercase `#A2777A`
- Resting: border `1px solid transparent`
- Hover: `bg rgba(234,213,214,0.67)`, border `1px solid #5d3136`, `transition: all 0.2s ease`
- Border-radius: 4px

**Toast on click:**
```css
.toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #5D3136;
  color: #FEFBF6;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 10px 20px;
  box-shadow: 0 18px 40px rgba(93,49,54,0.16);
  z-index: 100;
}
```

Duration: ~2s, then hide.
