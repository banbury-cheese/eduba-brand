# @eduba/ui

Eduba's brand-aligned, shadcn-compatible React component library.

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

## shadcn registry

You can also copy components into your codebase via the shadcn CLI:

```bash
npx shadcn@latest add https://ui.eduba.io/r/button
```

## Themes

Five built-in variants: `rose`, `mediumBrown`, `paper`, `skin`, `wine`. Switch via `<ThemeProvider theme="…">` or `<html data-theme="…">`.
