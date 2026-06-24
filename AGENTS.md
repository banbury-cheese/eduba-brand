# AGENTS.md

Guidance for AI coding agents working in — or with — this repository.

This repo is two things:

1. **`@eduba/ui`** — a **published** React component library (Radix + Tailwind v4). If you're building a React/Next app and want Eduba components, **install it from npm — do not copy files out of this repo.**
2. **Brand reference bundle** — design tokens, voice, and patterns for building Eduba products by hand. Start at [`AGENT_BRIEF.md`](AGENT_BRIEF.md).

---

## Using `@eduba/ui` (the published package)

- **npm:** <https://www.npmjs.com/package/@eduba/ui>
- **Docs / live component gallery:** <https://ui.eduba.io>
- **Source in this repo:** [`packages/ui/`](packages/ui) — full README: [`packages/ui/README.md`](packages/ui/README.md)

### Install

```bash
pnpm add @eduba/ui          # or: npm i @eduba/ui · yarn add @eduba/ui
pnpm add react react-dom    # required peers

# optional peers — only if you use the matching component:
pnpm add recharts                 # <Chart>
pnpm add @tanstack/react-table    # <DataTable>
pnpm add react-hook-form          # <Form>
pnpm add gsap                     # motion primitives
```

### Set up once

In your global stylesheet:

```css
@import "tailwindcss";
@import "@eduba/ui/styles.css";
@source "../node_modules/@eduba/ui/dist/**/*.{js,mjs}";
```

Load the brand web fonts via a `<link>` in your `<head>` (IBM Plex Mono + Space Grotesk; Diatype is self-hosted) — see [`packages/ui/README.md`](packages/ui/README.md#fonts). Then wrap your app:

```tsx
import { ThemeProvider } from "@eduba/ui";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultTheme="paper">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Use

```tsx
import { Button, Card, Stat } from "@eduba/ui";
```

- **Subpath exports** for optional-peer components: `@eduba/ui/chart`, `@eduba/ui/data-table`, `@eduba/ui/form`.
- **Themes:** `paper` (light) and `wine` (dark) — switch via `<ThemeProvider defaultTheme="…">`, the `useTheme()` / `useDarkMode()` hooks, or `<html data-theme="…">`.
- **Fonts:** never put the Google Fonts `@import url()` inside the Tailwind `@import` chain — it breaks the build. Use the `<link>` (see the package README).

---

## Working on this repo (monorepo)

pnpm + Turborepo.

```bash
pnpm install
pnpm --filter @eduba/ui build      # build the library (tsup → packages/ui/dist)
pnpm --filter @eduba/docs dev      # run the docs site locally
pnpm --filter @eduba/docs build    # production build of the docs
pnpm check                         # biome format + lint (write)
```

Where things live:

- **Library source:** `packages/ui/src/components/*` and `packages/ui/src/primitives/*`
- **Design tokens / theme CSS:** `packages/ui/src/styles/{tokens,theme,globals}.css`
- **Public exports:** `packages/ui/src/index.ts` + the `exports` map in `packages/ui/package.json`
- **Docs app:** `apps/docs/` (Next.js App Router). The component gallery and per-component demos are in `apps/docs/components/component-preview.tsx`; build-time code highlighting (Shiki) is in `apps/docs/lib/highlight.ts` + `apps/docs/components/code.tsx`.

Gotchas:

- The docs app consumes the library's **built `dist`** — after editing `packages/ui/src/**`, run `pnpm --filter @eduba/ui build` (and restart the docs dev server) before the change shows up.
- Tailwind v4 arbitrary values: use `text-[length:var(--x)]` for sizes and the full `var()` form (`w-[var(--x)]`), not the v3 `-[--x]` shorthand.
