# @eduba/ui

## 0.0.9

### Patch Changes

- ede3c00: Component fixes and a customization:

  - **MultiSelect**: the checkmark on the active/highlighted checked item no longer disappears. Its stroke is now pinned to the checkbox foreground instead of `currentColor`, so `CommandItem`'s active SVG-colour rule can't blend it into the brown box.
  - **CodeBlock**: background is now a clean `bg-background` (white on paper, deep wine on dark) instead of the pink `--eb-muted-bg`, kept delineated by its border.
  - **HoldToConfirm**: new `fillClassName` prop for per-instance control of the progress-fill colour (defaults to `bg-destructive text-[var(--eb-white)]`), e.g. `fillClassName="bg-primary text-primary-foreground"`.

## 0.0.8

### Patch Changes

- 04da3bb: TreeView: controlled expansion and richer customization.

  - Controlled/uncontrolled expansion via `expandedIds`, `defaultExpandedIds`, and `onExpandedChange`, plus a `getTreeAncestorIds(data, id)` helper to reveal a nested node by expanding its ancestor path.
  - `TreeNode.label` now accepts a `ReactNode` (colored text, badges, a "new" pill, ...), not just a string.
  - New `icons={{ file, folder, chevron }}` prop (`TreeViewIcons`) to swap the default glyphs app-wide; a node's own `icon` still takes precedence.
  - Fix: the chevron and icon now sit in fixed-width slots, so custom glyphs of any size no longer shift label alignment.

  Existing usage (string labels, uncontrolled expansion, no `icons`) is unchanged.

## 0.0.7

### Patch Changes

- af3b96e: Fix a packaging regression where importing anything from the main barrel forced consumers to install `recharts`, `@tanstack/react-table`, and `react-hook-form`. `chart`, `data-table`, and `form` are no longer re-exported from `@eduba/ui` — a bare `import { FrameShell } from "@eduba/ui"` no longer drags in a charting + forms stack. These three remain available via their subpaths (`@eduba/ui/chart`, `@eduba/ui/data-table`, `@eduba/ui/form`), restoring the pre-0.0.5 behavior. If you imported `Chart*`, `DataTable`, or `Form*` from the barrel, switch those imports to the matching subpath.

## 0.0.6

### Patch Changes

- 8b1bc6e: Add `FrameShell` — the signature fixed dark-brown frame wrapping a scrolling inner paper surface, with a mono top nav whose labels scramble on hover. Ships `FrameShell`, `FrameNav`, `FrameNavGroup`, `FrameNavBrand`, `FrameNavLink`, and `FrameNavChip` (with `default`/`primary` variants, optional icon, and responsive label collapse), plus a `reset` helper on the `useScramble` hook. Layout, spacing, and the chip/scramble animations mirror eduba.io exactly across breakpoints. GSAP-free; ships from the main barrel.

## 0.0.5

### Patch Changes

- Self-contained CSS exports: keyframes moved into `theme.css` and `base.css` split out, so granular stylesheet imports work standalone.

## 0.0.4

### Patch Changes

- Moved the web-font `@import` out of the Tailwind v4 CSS chain to stop it breaking consumer builds.

## 0.0.3

### Patch Changes

- Fixed avatar-group rings and stepper completion states.

## 0.0.2

### Patch Changes

- Added Tier-1 and Tier-2 components (form, code-block, stat, multi-select, file-upload, date-range-picker, stepper, timeline, banner, chip, avatar-group, rating, tree-view) and ensured the stylesheets ship in the published package.

## 0.0.1

### Initial Release

- First public release of `@eduba/ui` — the brand-native React component library (Radix + Tailwind v4, paper/wine themes).
