# Eduba Skill Recipes

Copy-paste implementation patterns for common Eduba UI components.

---

## Shell Pattern

```css
html, body { height: 100%; overflow: hidden; background: #5D3136; isolation: isolate; }
.frame { display: grid; grid-template-rows: auto 1fr auto; height: 100svh; padding: 8px; }
.content { background: #FEFBF6; border-radius: 4px; overflow-y: auto; }
```

Padding: 8px desktop, 5px mobile. Do not use this shell on dashboards or admin UIs.

---

## Folder Tab Card

**Desktop tab** (`tab-shape-wide.svg`, viewBox 344×46):
```tsx
<svg viewBox="0 0 344 46" fill="none" preserveAspectRatio="none">
  <path d="M0 7V45.5H344L311.601 2.77064C310.277 1.02527 308.213 0 306.023 0H7C3.13401 0 0 3.13401 0 7Z" fill="currentColor"/>
</svg>
```
Add `preserveAspectRatio="none"` whenever CSS width < 344px.

**Mobile tab** (`tab-shape-compact.svg`, viewBox 103×46):
```tsx
<svg viewBox="0 0 103 46" fill="none">
  <path d="M0 7V45.5H103L70.6008 2.77064C69.2774 1.02527 67.2133 0 65.023 0H7C3.13401 0 0 3.13401 0 7Z" fill="currentColor"/>
</svg>
```

Tab positioning: `position: absolute; top: -46px; left: 0; height: 46px;`
Content layout: Diatype title (bold, lowercase) left — mono metadata right — dashed divider below header.

---

## Five-Theme Rotation

```typescript
const THEMES = ['rose', 'mediumBrown', 'paper', 'skin', 'darkWine'] as const;
const themeAt = (i: number) => THEMES[i % THEMES.length];
```

```css
.card[data-theme="rose"]        { --theme-bg: #D8BFC1; --theme-title: #5D3136; }
.card[data-theme="mediumBrown"] { --theme-bg: #7B5A5C; --theme-title: #FEFBF6; }
.card[data-theme="paper"]       { --theme-bg: #FFFFFF; --theme-title: #5D3136; }
.card[data-theme="skin"]        { --theme-bg: #F9ECDF; --theme-title: #5D3136; }
.card[data-theme="darkWine"]    { --theme-bg: #5D3136; --theme-title: #FEFBF6; }
```

Always rotate 1→5 in order. Repeat cycle for grids > 5 items.

---

## Film Grain Overlay

Use `components/FilmGrain.tsx`. Add to layout root as the last child.

```css
.filmGrain { position: fixed; inset: 0; pointer-events: none; opacity: 0.055; mix-blend-mode: soft-light; z-index: 9999; }
body { isolation: isolate; }
```

15 FPS canvas, scales to ~2M pixels. Pauses on `prefers-reduced-motion`.

---

## Nav Chip with Scramble Text

Resting: `bg #D8BFC0, color #5D3136`. Hover: `bg #FEFBF6, scaleX 1.04, scramble text`.

```typescript
// mouseenter
gsap.killTweensOf([bgEl, chipEl]);
gsap.to(bgEl, { backgroundColor: '#FEFBF6', scaleX: 1.04, duration: 0.18, ease: 'power2.out' });
gsap.to(labelEl, { duration: 0.8, scrambleText: { text: original, chars: 'upperCase', speed: 0.8 } });

// mouseleave
gsap.to(bgEl, { backgroundColor: '#D8BFC0', scaleX: 1, duration: 0.18, ease: 'power2.out' });
labelEl.textContent = original;
```

**Primary CTA (black):** `bg #000, color #FEFBF6` + green dot.
```css
.dot { width: 5px; height: 5px; border-radius: 50%; background: #25CA58; animation: dotBlink 2s ease-in-out infinite; }
@keyframes dotBlink { 0%, 100% { opacity: 1 } 50% { opacity: 0.15 } }
```

---

## Contact Form Panel

Three nested frames: outer `#FEFBF6/border #5D3136`, middle `#F9ECDF/border #A2777A`, inner form.

**Panel expand (CSS — do NOT use max-height):**
```css
.panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.52s cubic-bezier(0.16,1,0.3,1); }
.panel.open { grid-template-rows: 1fr; }
.panelInner { overflow: hidden; }
```

**On open (GSAP):**
```typescript
gsap.to(arrowEl, { rotate: 180, duration: 0.38, ease: 'power2.inOut' });
gsap.to(contentEl, { filter: 'blur(7px)', duration: 0.45, ease: 'power2.out' });
gsap.fromTo(fields, { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: 0.26, stagger: 0.055 });
```

Success: `bg #1A9C43`, "Message opened ✓", reset after 1.4s.

---

## Node-and-Edge Icons

Available in `assets/svgs/icons/`:

| File | Description |
|------|-------------|
| `icon-bridge.svg` | 2 crossing diagonals + 3 nodes |
| `icon-corners.svg` | 1 diagonal + 4 corner nodes |
| `icon-columns.svg` | 2 vertical strokes + 6 nodes |
| `icon-fork.svg` | V-branch + 3 nodes |
| `icon-rails.svg` | 2 horizontal rails + 5 nodes |

Style: `stroke-width 10.2`, stroke `#E9D6CD`, filled organic nodes `#5D3136`.

Hover animation:
```css
[data-icon-node] { transform-box: fill-box; transform-origin: center; transition: transform 0.42s cubic-bezier(0.34,1.48,0.64,1); }
.card:hover [data-icon-node] { transform: translate(var(--hover-x, 0), var(--hover-y, 0)); }
```
Keep displacement to 2–3px per node.

---

## Resource Card Grid

```css
.grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
@media (max-width: 800px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 425px) { .grid { grid-template-columns: repeat(2, 1fr); } }

.card { aspect-ratio: 2/1; border-radius: 4px; border: 1px solid transparent; }
.card:hover { background: rgba(234,213,214,0.67); border-color: #5d3136; transition: all 0.2s ease; }
```

Label: Mono 11px 600 uppercase. Meta: Mono 7px 700 uppercase `#A2777A`.

---

## Footer Pattern

4-column grid on `#5D3136` background.

Col 1: `brand-mark-white.svg` (14px height) + Diatype 300 14px 70%-opacity description.
Cols 2–4: PRODUCTS / RESEARCH / ELSEWHERE — mono 8px 0.12em headers, mono 10px items.
Bottom strip: copyright left, "THE FACES OF INTERFACE" right. Both 9px mono, 70% opacity.

---

## Toast Notification

```css
.toast {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  background: #5D3136; color: #FEFBF6;
  font: 500 11px/1 'IBM Plex Mono', monospace; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 10px 20px; border-radius: 0;
  box-shadow: 0 18px 40px rgba(93,49,54,0.16); z-index: 100;
}
```

Content: SHORT UPPERCASE MONO. Duration: ~2s. Examples: `LINK COPIED`, `OPENING SCRIBE…`
