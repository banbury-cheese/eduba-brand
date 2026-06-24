# @eduba/ui

Eduba's brand-aligned React component library, built on Radix + Tailwind v4.

[![npm version](https://img.shields.io/npm/v/@eduba/ui.svg)](https://www.npmjs.com/package/@eduba/ui)

- **Install from npm:** [`@eduba/ui`](https://www.npmjs.com/package/@eduba/ui) — `pnpm add @eduba/ui`
- **Docs & live gallery:** <https://ui.eduba.io>
- **Source:** [github.com/banbury-cheese/eduba-brand](https://github.com/banbury-cheese/eduba-brand/tree/main/packages/ui)

## Install

```bash
pnpm add @eduba/ui
```

Peer deps (install whichever you need):

```bash
pnpm add react react-dom
pnpm add gsap                  # for motion primitives
pnpm add recharts              # for <Chart>
pnpm add @tanstack/react-table # for <DataTable>
```

## Setup

In your global stylesheet:

```css
@import "tailwindcss";
@import "@eduba/ui/styles.css";
@source "../node_modules/@eduba/ui/dist/**/*.{js,mjs}";
```

Then load the brand fonts (IBM Plex Mono, Space Grotesk) — see [Fonts](#fonts).

Wrap your app:

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

## Use

```tsx
import { Button } from "@eduba/ui";

export default function Page() {
  return <Button>Click me</Button>;
}
```

## Fonts

The design tokens reference three families:

| Token | Family | Source |
| --- | --- | --- |
| `--eb-font-mono` | IBM Plex Mono | Google Fonts |
| `--eb-font-primary` | Diatype → Space Grotesk fallback | self-hosted → Google Fonts |

The Google-hosted faces are deliberately **not** bundled into `styles.css`: a
remote `@import url()` inside the Tailwind `@import` chain gets flattened after
Tailwind's rules and breaks the build (`"@import rules must precede all rules…"`).
Load them out-of-band instead.

**Recommended — `<link>` in your `<head>`.** Works in every framework (including
Next.js) with no bundler-ordering surprises:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
/>
```

**Alternative — CSS import.** `@eduba/ui/fonts.css` carries the same `@import url()`.
It must be the **first** line of your stylesheet, before `tailwindcss`, so the
url-import stays ahead of all rules:

```css
@import "@eduba/ui/fonts.css";
@import "tailwindcss";
@import "@eduba/ui/styles.css";
```

This works with bundlers that preserve `@import` source order (e.g. Vite +
lightningcss). Next.js re-orders CSS modules and may drop it — use the `<link>` there.

**Diatype** is a licensed face and is not Google-hosted — self-host the files and
declare your own `@font-face`. Without it, `--eb-font-primary` falls back to
Space Grotesk, then `system-ui`.

## Themes

Two built-in themes: `paper` (light) and `wine` (dark). Switch via `<ThemeProvider defaultTheme="…">`, the `useTheme()` / `useDarkMode()` hooks, or `<html data-theme="…">`.
