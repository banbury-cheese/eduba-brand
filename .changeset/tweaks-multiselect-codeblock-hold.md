---
"@eduba/ui": patch
---

Component fixes and a customization:

- **MultiSelect**: the checkmark on the active/highlighted checked item no longer disappears. Its stroke is now pinned to the checkbox foreground instead of `currentColor`, so `CommandItem`'s active SVG-colour rule can't blend it into the brown box.
- **CodeBlock**: background is now a clean `bg-background` (white on paper, deep wine on dark) instead of the pink `--eb-muted-bg`, kept delineated by its border.
- **HoldToConfirm**: new `fillClassName` prop for per-instance control of the progress-fill colour (defaults to `bg-destructive text-[var(--eb-white)]`), e.g. `fillClassName="bg-primary text-primary-foreground"`.
