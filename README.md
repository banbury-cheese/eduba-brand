# eduba-brand

Reference bundle for the Eduba visual identity, design tokens, voice, and component patterns. Pass this repo to any agent building an Eduba product.

## How to use with an AI agent

Point the agent at `AGENT_BRIEF.md` first. It is the shortest reliable entry point.

```
Read AGENT_BRIEF.md before writing any code for this project.
If needed, then read PRODUCT_UI.md, voice/PRODUCT_VOICE.md,
and the token files. Use BRAND.md as deep reference, not as
the only file you blindly follow.
```

For marketing/editorial voice, also read `voice/VOICE.md`.
For product/UI copy, read `voice/PRODUCT_VOICE.md`.

### Precedence

If files disagree, use this order:

1. `tokens/*.json` and `animations/animations.ts`
2. `AGENT_BRIEF.md`
3. `PRODUCT_UI.md`
4. `voice/PRODUCT_VOICE.md`
5. `voice/VOICE.md`
6. `BRAND.md`

---

## Structure

```
eduba-brand/
├── AGENT_BRIEF.md            ← Start here. Fast agent-safe brief.
├── PRODUCT_UI.md             ← UI patterns, motifs, layout guidance.
├── BRAND.md                  ← Deep reference and rationale.
├── tokens/
│   ├── colors.json           ← All colors with usage notes
│   ├── typography.json       ← Fonts, scale, conventions
│   ├── spacing.json          ← Spacing, layout, border radius
│   └── breakpoints.json      ← Responsive breakpoints and usage
├── animations/
│   └── animations.ts         ← GSAP patterns, hover/toggle helpers, motion rules
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
│   ├── PRODUCT_VOICE.md      ← In-app/product copy guidance
│   └── VOICE.md              ← Marketing/editorial voice system
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

Use grain by default for public-facing/flagship Eduba experiences. For dense internal tools or productivity-heavy screens, treat it as optional.

---

## SCSS variables

Copy `scss/_variables.scss` into your project's styles directory and import with:
```scss
@use "path/to/variables" as *;
```
