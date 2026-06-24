# eduba-brand

Reference bundle for the Eduba visual identity, design tokens, voice, and component patterns. Pass this repo to any agent building an Eduba product.

## 📦 `@eduba/ui` — the React component library

This repo publishes **[`@eduba/ui`](https://www.npmjs.com/package/@eduba/ui)**, the brand's production React component library (Radix + Tailwind v4, paper/wine themes). If you're building a React/Next app, install it from npm — don't copy files.

```bash
pnpm add @eduba/ui      # or: npm i @eduba/ui · yarn add @eduba/ui
```

|  |  |
| --- | --- |
| **npm** | <https://www.npmjs.com/package/@eduba/ui> |
| **Docs / live gallery** | <https://ui.eduba.io> |
| **Source** | [`packages/ui/`](packages/ui) — setup & usage in [`packages/ui/README.md`](packages/ui/README.md) |
| **For coding agents** | [`AGENTS.md`](AGENTS.md) — where to fetch it and how to use it, at a glance |

> Everything below is brand reference material (tokens, voice, patterns) for building Eduba products by hand or with an agent.

## How to use with an AI agent

### Option A — Agent Skill (recommended)

The brand ships as a proper [Agent Skill](https://agentskills.io) at `.agents/skills/eduba-brand/`. Copy that directory into any project to make the skill available:

```bash
cp -r path/to/eduba-brand/.agents/skills/eduba-brand /your-project/.agents/skills/
```

Then invoke it in Claude Code, GitHub Copilot Agent, or OpenAI Codex with:
```
/eduba-brand
```

The skill activates automatically when you mention "eduba brand", "eduba design system", or ask to build anything Eduba-branded. It loads `SKILL.md` plus on-demand reference files for tokens, recipes, and voice.

### Option B — Manual context

Point the agent at `AGENT_BRIEF.md` first. It is the fastest reliable entry point.

```
Read AGENT_BRIEF.md before writing any code for this project.
If needed, also read AGENT_SKILLS.md for copy-paste recipes,
PRODUCT_UI.md for layout patterns, and voice/PRODUCT_VOICE.md
for in-app copy. Use BRAND.md as deep reference only.
```

### Precedence

If files disagree, use this order:

1. `tokens/*.json`, `tokens/tokens.css`, and `animations/animations.ts`
2. `AGENT_BRIEF.md`
3. `PRODUCT_UI.md`
4. `voice/PRODUCT_VOICE.md`
5. `voice/VOICE.md`
6. `BRAND.md`

---

## Structure

```
eduba-brand/
├── packages/ui/              ← @eduba/ui — published React component library (npm)
├── apps/docs/                ← Next.js docs site → https://ui.eduba.io
├── AGENTS.md                 ← Agent entry point: fetch @eduba/ui + how to use it
├── AGENT_BRIEF.md            ← Start here. Fast agent-safe brief.
├── AGENT_SKILLS.md           ← Per-skill recipes (folder tabs, shell, grain, etc.)
├── BRAND.md                  ← Deep reference and rationale.
├── PRODUCT_UI.md             ← UI patterns, motifs, layout guidance.
├── colors_and_type.css       ← CSS custom properties + utility classes (framework-agnostic)
├── tokens/
│   ├── tokens.css            ← CSS var mirror of all tokens + .eb-* utility classes
│   ├── colors.json           ← All colors with usage notes
│   ├── typography.json       ← Fonts, scale, conventions
│   ├── spacing.json          ← Spacing, layout, border radius
│   └── breakpoints.json      ← Responsive breakpoints and usage
├── animations/
│   └── animations.ts         ← GSAP patterns, hover/toggle helpers, duration constants
├── fonts/
│   ├── README.md             ← Font installation instructions
│   ├── diatype-bold.woff2    ← Diatype 700
│   ├── diatype-med.woff2     ← Diatype 500
│   └── diatype-reg.woff2     ← Diatype 300
├── scss/
│   ├── _variables.scss       ← Drop-in SCSS variables
│   └── globals.scss          ← Base styles, font-faces, reset, film grain class
├── assets/
│   └── svgs/
│       ├── logo.svg              ← Eduba logo (2-path, animated)
│       ├── brand-mark.svg        ← 64×64 logomark on dark wine rounded bg
│       ├── brand-mark-white.svg  ← White logomark, no background
│       ├── wordmark.svg          ← Large "EDUBA" display wordmark
│       ├── tab-shape-wide.svg    ← Desktop folder tab (344×46)
│       ├── tab-shape-compact.svg ← Mobile folder tab (103×46)
│       ├── arrow-corner.svg      ← Decorative corner accent
│       ├── dots-grid.svg         ← Animated dots icon (16 data-dot paths)
│       └── icons/
│           ├── icon-bridge.svg   ← 2 crossing diagonals + 3 nodes
│           ├── icon-corners.svg  ← 4 corner nodes + 1 diagonal
│           ├── icon-columns.svg  ← 2 vertical strokes + 6 nodes
│           ├── icon-fork.svg     ← V-branch + 3 nodes
│           └── icon-rails.svg    ← 2 horizontal rails + 5 nodes
├── ui_kits/
│   └── eduba-io/             ← React recreation of eduba.io (reference)
│       ├── index.html        ← Assembled page, runs in browser with Babel + GSAP CDN
│       ├── Chrome.jsx        ← TopNav, BottomNav, Clock
│       ├── Sections.jsx      ← Hero, Framework
│       ├── Resources.jsx     ← Resource grid, Services cards
│       ├── Works.jsx         ← Stacked folder-tab cards
│       ├── ServicesFolder.jsx← Services accordion
│       └── Contact.jsx       ← Contact form + Footer
├── preview/                  ← 19 visual HTML reference tabs
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── brand-*.html
│   └── components-*.html
├── voice/
│   ├── PRODUCT_VOICE.md      ← In-app/product copy guidance
│   └── VOICE.md              ← Marketing/editorial voice system
├── components/
│   └── FilmGrain.tsx         ← React/Next.js film grain component
└── .agents/skills/
    └── eduba-brand/          ← Agent Skill (agentskills.io format)
        ├── SKILL.md          ← Invoke with /eduba-brand
        └── references/
            ├── TOKENS.md     ← Complete token reference
            ├── SKILLS.md     ← Copy-paste implementation recipes
            └── VOICE.md      ← Voice + copy rules
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
