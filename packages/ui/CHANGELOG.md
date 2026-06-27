# @eduba/ui

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
