# Eduba Agent Brief

Use this file first when building an Eduba product with an agent.

## Order of authority

If two files disagree, resolve conflicts in this order:

1. `tokens/*.json` and `animations/animations.ts`
2. `AGENT_BRIEF.md`
3. `PRODUCT_UI.md`
4. `voice/PRODUCT_VOICE.md`
5. `voice/VOICE.md`
6. `BRAND.md`

`BRAND.md` is the long-form rationale and reference, not the first file an agent should follow blindly.

## Brand non-negotiables

- Default light surface: `#FEFBF6`
- Primary dark: `#5D3136`
- Secondary warm fill: `#F9ECDF`
- Border / light accent: `#D8BFC0`
- Primary editorial font: `Diatype`
- System / UI accent font: `IBM Plex Mono`
- Default corner radius: `4px`
- Motion should feel restrained, precise, and deliberate
- Avoid generic SaaS styling: no purple gradients, no glassmorphism, no oversized radii, no playful blobs

## Typography rules

- Use `Diatype` for headings, body copy, long-form content, and any text meant to be read.
- Use `IBM Plex Mono` for labels, nav, buttons, metadata, IDs, chips, tags, and small interface accents.
- Mono text is uppercase by default.
- Diatype text is sentence case or lowercase, except for intentionally oversized display treatments.

## Color rules

- Use `#FEFBF6` as the default light background.
- Use pure white only as an explicit flat "paper" surface when needed for contrast or contrast-within-contrast.
- Brown should carry the identity. Pink/cream should support it, not replace it.
- Green is reserved for status/pulse moments, not for general CTA color systems.

## Product rules

- Do not assume every Eduba app must use the exact current website shell.
- The fixed brown frame, film grain, folder tabs, and review windows are preferred motifs for flagship/public-facing experiences.
- Dense internal tools and workflow apps can use a simpler layout while still following the palette, typography, spacing, and motion rules.
- Use grain only when it supports the experience. It is default for showcase/public surfaces, optional for utility-heavy tools.

## Motion rules

- Prefer GSAP for real UI motion.
- Use `back.out(2)` for springy entrance emphasis.
- Use `power2.out` for settle/reset.
- Use `power2.inOut` for symmetric toggles.
- Keep motion short. Most hover interactions should finish in under `220ms`.
- Scramble text is an accent, not a default for every interactive label.

## Build defaults

- Start with clean spacing, sharp geometry, warm surfaces, and mono metadata.
- Preserve strong contrast and legibility on mobile first.
- If a component choice feels decorative but not functional, simplify it.

## Avoid

- generic startup gradients
- centered everything
- oversized shadows
- rounded-rectangle softness
- unbounded animation loops
- mixing too many surface colors in one screen
- founder-marketing tone inside product UI

## Read next

- For product layout and component patterns: `PRODUCT_UI.md`
- For in-app copy: `voice/PRODUCT_VOICE.md`
- For marketing/editorial copy: `voice/VOICE.md`
- For deep rationale and historic site-specific details: `BRAND.md`
