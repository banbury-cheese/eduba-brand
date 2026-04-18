# Place Diatype .woff2 files here

This project's canonical editorial font is **Diatype** (per `BRAND.md §3`). The
font is self-hosted in the brand repo at `banbury-cheese/eduba-brand` under
`/fonts/` and must be copied into this directory to activate.

### Required files

| File | `font-weight` | Role |
|---|---|---|
| `diatype-bold.woff2` | 700 | Headings, hero, card titles, FAQ questions |
| `diatype-med.woff2`  | 500 | (available slot — used sparingly) |
| `diatype-reg.woff2`  | 300 | Body, subtitles, prose |

### How to install

1. Open the brand repo: https://github.com/banbury-cheese/eduba-brand/tree/main/fonts
2. Download the three `.woff2` files.
3. Drop them into this directory (`fonts/`).

No other setup is needed — `colors_and_type.css` already has the `@font-face`
declarations wired up, and every preview + UI-kit uses `var(--eb-font-primary)`.

### Why it's not already committed

The GitHub import tools can't copy binary font files, and Diatype is a
commercial font — it shouldn't be redistributed automatically. Until the
woff2 files land here, the CSS falls back to **Space Grotesk** as a visual
stand-in so layouts don't break.
