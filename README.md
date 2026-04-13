# eduba-brand

Single source of truth for the Eduba visual identity, design tokens, voice, and component patterns. Pass this repo to any agent building an Eduba product.

## How to use with an AI agent

Point the agent at `BRAND.md` first. It contains everything needed to make correct decisions without reading all files.

```
Read BRAND.md before writing any code for this project.
It contains exact hex values, font names, animation easings,
layout patterns, and copy principles for the Eduba brand.
```

For voice and copy work, also read `voice/VOICE.md`.

---

## Structure

```
eduba-brand/
├── BRAND.md                  ← Start here. Primary AI-optimized brand document.
├── tokens/
│   ├── colors.json           ← All colors with usage notes
│   ├── typography.json       ← Fonts, scale, conventions
│   ├── spacing.json          ← Spacing, layout, border radius
│   ├── animation.json        ← GSAP patterns, CSS transitions, film grain
│   └── breakpoints.json      ← Responsive breakpoints and usage
├── fonts/
│   ├── diatype-bold.woff2    ← Diatype 700
│   ├── diatype-med.woff2     ← Diatype 500
│   └── diatype-reg.woff2     ← Diatype 300
├── scss/
│   ├── _variables.scss       ← Drop-in SCSS variables
│   └── globals.scss          ← Base styles, font-faces, reset, film grain class
├── assets/
│   └── svgs/
│       ├── logo.svg              ← Eduba logo (2-path, animated)
│       ├── tab-shape-wide.svg    ← Desktop nav tab (344×46)
│       ├── tab-shape-compact.svg ← Mobile nav tab (103×46)
│       ├── arrow-corner.svg      ← Decorative corner accent
│       └── dots-grid.svg         ← Animated dots icon (16 data-dot paths)
├── voice/
│   └── VOICE.md              ← Writing system, hooks, pillars, non-negotiables
└── components/
    └── FilmGrain.tsx         ← React/Next.js film grain component
```

---

## Font setup

Diatype is self-hosted. Copy the three files from `/fonts/` into your project's `/public/fonts/` directory, then import from `scss/globals.scss`.

IBM Plex Mono via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```
Or via npm: `npm install @fontsource/ibm-plex-mono`

---

## Film grain setup

1. Copy `components/FilmGrain.tsx` into your project
2. Add the `.filmGrain` CSS class from `scss/globals.scss`
3. Add `isolation: isolate` to your `body` element
4. Render `<FilmGrain />` as the last child of your layout root

---

## SCSS variables

Copy `scss/_variables.scss` into your project's styles directory and import with:
```scss
@use "path/to/variables" as *;
```
