# Eduba Agent Brief

Use this file first when building an Eduba product with an agent.
For CSS custom-property tokens and utility classes, read `tokens/tokens.css`.
For per-skill recipes (folder tabs, shell, grain, etc.), read `AGENT_SKILLS.md`.

## Order of authority

1. `tokens/*.json` and `tokens/tokens.css` (canonical token sources)
2. `AGENT_BRIEF.md` (this file)
3. `AGENT_SKILLS.md` (implementation recipes)
4. `PRODUCT_UI.md`
5. `voice/PRODUCT_VOICE.md`
6. `voice/VOICE.md`
7. `BRAND.md` (deep rationale — reference, not primary directive)

## Non-negotiables

- Default light surface: `#FEFBF6` (not pure white).
- Primary dark: `#5D3136`. Brown carries identity; pink/cream support it.
- Warm fill: `#F9ECDF`. Border/accent: `#D8BFC0`.
- Primary editorial font: **Diatype** (self-hosted). Files in `/fonts/`. Space Grotesk is a fallback only.
- System/UI accent font: **IBM Plex Mono**.
- Default corner radius: **4px**.
- Never use em dashes. Never use emoji. No purple gradients, no glassmorphism, no oversized radii, no playful blobs.
- Green (`#25CA58`) is the pulse dot only — never a large fill.
- Green/success (`#1A9C43`) is for form-submit success states only.

## Typography rules

- **Diatype:** body, headings, prose, card titles, FAQ. Sentence case or lowercase — never uppercase (except oversized hero).
- **IBM Plex Mono:** nav, buttons, labels, IDs, metadata. **Always uppercase.**
- Card titles are Diatype **bold lowercase** — intentional. Preserve.
- FAQ questions are Diatype **600 lowercase** — preserve.
- Card body paragraphs use `text-indent: 30px` — preserve.
- Shell body: `font-family: IBM Plex Mono`. Content pages flip: `.eb-page { font-family: Diatype }`, then re-apply mono to accent elements.

## Color rules

- `#FEFBF6` default. `#FFFFFF` is an explicit "paper" exception — use sparingly.
- Five card themes (rotate in order): rose → mediumBrown → paper → skin → darkWine.
- Do not spread five surface colors across one screen unless the layout is intentionally archival.

## Shell / product rules

- The fixed brown frame + film grain + folder tabs are preferred for flagship/public-facing experiences.
- Do NOT force that shell onto dense dashboards, admin panels, or utility tooling.
- Three surfaces max per screen: one dominant dark, one dominant light, one supporting accent.

## Tab shape rules

- **Desktop:** use `assets/svgs/tab-shape-wide.svg` (344×46 viewBox).
- **Mobile:** use `assets/svgs/tab-shape-compact.svg` (103×46 viewBox).
- When constraining the wide tab to a width below 344px, add `preserveAspectRatio="none"` to prevent height shrinkage.

## Motion rules

- Prefer GSAP for real UI motion.
- `back.out(2)` for springy entrances. `power2.out` for settle. `power2.inOut` for symmetric toggles.
- Most hover interactions finish in under **220ms** (`--eb-dur-hover: 220ms`).
- Chip background scale: `scaleX 1.04` in `180ms` (`--eb-dur-chip: 180ms`).
- Panel expand: `grid-template-rows 0fr → 1fr` in `520ms cubic-bezier(0.16,1,0.3,1)` (`--eb-dur-panel: 520ms`). Do NOT animate `max-height`.
- Scramble text is an accent — not a default for every label.
- Always call `gsap.killTweensOf(target)` before re-animating.
- Never set CSS `transform-origin` on elements GSAP animates with `transformOrigin`.

## Film grain

- Default for flagship surfaces; optional for utility tools.
- `opacity: 0.055`, `mix-blend-mode: soft-light`, `z-index: 9999`, `pointer-events: none`, `position: fixed; inset: 0`.
- Requires `isolation: isolate` on `body`.
- Respect `prefers-reduced-motion`.

## Signature moves

- Five-theme rotation for card grids.
- Folder tab attached to body panel — wide on desktop, compact on mobile.
- Nested 1px borders (ticket / compliance-form feel) for CTAs.
- Green dot on the top-right primary chip, pulsing at 2s ease-in-out.
- `SECTION 0X / NAME` mono label + large Diatype headline pattern.
- Film grain over everything.

## Build defaults

- Start with clean spacing, sharp geometry, warm surfaces, and mono metadata.
- Preserve strong contrast and legibility on mobile first.
- If a component choice feels decorative but not functional, simplify it.

## Avoid

- generic startup gradients, centered everything, oversized shadows, rounded-rectangle softness
- unbounded animation loops, mixing too many surface colors in one screen
- founder-marketing tone inside product UI

## When invoked with no guidance

Ask what is being built and who for. Then ask whether it is flagship/public (full shell + grain) or utility/internal (palette + type without frame).

## Read next

- Component patterns: `PRODUCT_UI.md`
- Skill recipes: `AGENT_SKILLS.md`
- In-app copy: `voice/PRODUCT_VOICE.md`
- Marketing/editorial copy: `voice/VOICE.md`
- Deep rationale: `BRAND.md`
- CSS tokens + utility classes: `tokens/tokens.css`
- Real component implementations: `ui_kits/eduba-io/`
