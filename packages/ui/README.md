# @eduba/ui

Eduba's brand-aligned React component library, built on Radix + Tailwind v4.

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

## Themes

Two built-in themes: `paper` (light) and `wine` (dark). Switch via `<ThemeProvider defaultTheme="…">`, the `useTheme()` / `useDarkMode()` hooks, or `<html data-theme="…">`.
