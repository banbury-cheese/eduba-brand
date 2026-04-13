# Eduba Product UI

This file defines reusable product patterns. These are preferred Eduba patterns, not universal hard requirements for every app.

## 1. Surface model

Use three surface roles:

- `frame`: `#5D3136`
- `content`: `#FEFBF6`
- `warm accent`: `#F9ECDF` or `#EAD5D6`

Default rule:
- one dominant dark surface
- one dominant light surface
- one supporting accent surface

Do not spread five surface colors across a single screen unless the design is intentionally archival/editorial.

## 2. Shell pattern

Preferred for flagship/public-facing Eduba experiences:

- dark brown outer frame
- top navigation
- scrollable inner content area
- optional bottom utility CTA

Use this when:
- the product is marketing-facing
- the product is meant to feel authored or branded
- you want the experience to feel like a framed instrument

Do not force this shell onto:
- dense dashboards
- admin panels
- utility-first internal tooling

## 3. Folder/tab cards

Folder cards are a signature Eduba motif.

Use them for:
- stacked narratives
- services
- case-study previews
- archives or expandable sequences

Do not use them for:
- basic forms
- data tables
- settings pages

Rules:
- label tab must feel structurally attached to the panel
- title area is large and editorial
- metadata lives to the right in mono
- body content hides cleanly under the next card when collapsed
- mobile must simplify spacing before reducing legibility

## 4. Review windows

Review windows are a secondary motif, not the main system.

Use them when:
- the content benefits from layered memory/archive language
- only one active card needs to be readable at once

Rules:
- max visible stack should stay controlled
- footer metadata must remain readable on phone widths
- controls should be obvious and not float ambiguously

## 5. Metadata layout

Preferred metadata pattern:

- main content uses Diatype
- metadata uses IBM Plex Mono
- metadata is grouped, not scattered
- use uppercase for mono labels
- keep the metadata block visually subordinate to the main title

## 6. CTA styling

CTA styling should feel deliberate, not loud.

Preferred CTA shapes:
- framed mono buttons
- chips/tabs
- underlined text links for secondary actions

Rules:
- primary CTA can go black
- hover states should be simple and crisp
- use green only for the status dot, not large fills

## 7. Motion

Use motion to clarify structure:

- reveal
- handoff
- emphasis
- state change

Avoid motion that exists only to decorate.

Preferred behaviors:
- chip background expands while text stays anchored
- panel opens by structure, not random fade
- tab emergence can come from behind the active card
- text scramble is acceptable for small, deliberate interaction accents

## 8. Mobile rules

On mobile:

- preserve readability first
- collapse multi-column layouts aggressively
- move utility labels to the right when the content stack needs room
- reduce display scale before anything overlaps
- keep safe-area padding in mind on real devices, not only browser emulation

## 9. Component recipes to preserve

- framed shell
- folder tabs
- mono metadata blocks
- understated underlined text links
- restrained hover chips
- warm archival paper surfaces

## 10. Patterns that are site-specific, not universal

These exist in the current site but should not be copied into every Eduba app automatically:

- the exact "THE FACES OF INTERFACE" masthead
- the exact hero composition
- resource-card icon microinteractions
- the exact review stack layout
- all current section names
