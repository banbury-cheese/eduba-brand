# Eduba.io — UI Kit

Pixel-ish recreation of the eduba.io marketing site (the one live product in the codebase).

Based on:
- `src/app/page.tsx` — section order
- `src/app/page.module.scss` — spacing & type
- `src/components/*` — individual components
- `src/styles/_variables.scss` + `globals.scss` — tokens (mirrored in `../../colors_and_type.css`)

## Files
- `index.html` — assembled page with click-thru nav
- `Chrome.jsx` — `TopNav`, `TicketCTA`, `Clock`
- `Sections.jsx` — `Hero`, `Framework` (learn/sort/train/build/govern)
- `Resources.jsx` — `Resources` grid, `Services` dark cards
- `Contact.jsx` — `Contact` / `(compose_message)`, `Footer`

## Scope note
The live site is a single long-scroll page; this kit mirrors that — there is no second product / app / dashboard surface in the codebase to recreate. All interactions are cosmetic: nav scrolls to sections, resource cards show a toast, contact form opens a "message opened" confirmation.
