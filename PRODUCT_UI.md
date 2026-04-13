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

## 10. Recipe: framed shell

Use this for branded/public-facing Eduba experiences.

### Anatomy

- outer frame
- top nav
- main content viewport
- optional bottom utility CTA

### Structural rules

- outer frame background: `#5D3136`
- outer frame padding: `8px`
- mobile outer frame padding: `5px`
- content surface: `#FEFBF6`
- content radius: `4px`
- shell grid: `auto 1fr auto`
- shell height: `100svh`

### Behavior

- `html, body` can be `overflow: hidden` only when using the framed shell pattern
- the content viewport should scroll, not the browser page
- on real mobile devices, account for safe-area padding at the bottom
- the bottom CTA must remain above the browser UI

### Typography

- shell chrome uses `IBM Plex Mono`
- content inside the viewport can switch to `Diatype` when the page is editorial/content heavy

### Mobile rules

- keep the frame visible on all four sides
- reduce frame padding before shrinking content gutters
- prioritize preserving the brown border and bottom CTA inside the visible viewport

### Do

- make it feel like a framed instrument
- keep chrome tight and precise
- let content breathe inside the light viewport

### Don’t

- add heavy drop shadows
- make the frame feel soft or bubbly
- bury the bottom CTA beneath scrolling content

## 11. Recipe: folder cards

Use folder cards for stacked narratives, services, archives, and expandable case-study structures.

### Anatomy

- folder tab / label strip
- attached body panel
- title block on the left
- mono metadata block on the right
- divider / dotted line
- hidden body content below the fold when collapsed

### Structural rules

- the top tab must feel physically attached to the body
- the tab and body should share the same fill color
- the folder angle/cut should read as geometry, not decoration
- the title should dominate the header
- metadata stays visually secondary

### Collapse behavior

- collapsed state should reveal only:
  - label tab
  - title
  - metadata
  - divider / top edge of body
- everything below the divider should be hidden by the next card in the stack
- overlapping cards should cover previous card bodies cleanly

### Expanded behavior

- the selected card opens inline
- body content appears below the divider
- content spacing must increase meaningfully in the open state
- CTA or secondary link should remain readable and not get buried behind the next card

### Recommended spacing

- tab label inset: compact, mono, uppercase
- title padding: generous, editorial
- metadata block: tighter and mono
- expanded body padding: larger than header padding

### Typography

- title: `Diatype`, large, bold
- metadata: `IBM Plex Mono`, uppercase
- action link: mono, underlined if secondary

### Motion

- the folder body should slide structurally, not fade randomly
- if a tab emerges, it should come from behind the active card
- do not use opacity as the main transition for core structure

### Mobile rules

- reduce title size before truncation or overlap
- collapse to one column
- move metadata below title if horizontal room runs out
- maintain the feeling of a folder even if the geometry simplifies

### Do

- make the stack readable at a glance
- keep the divider line visible
- preserve clear card ownership in the stack

### Don’t

- let the top tab float disconnected from the body
- let the click target extend far beyond the visible card geometry
- allow overlapped cards to expose stray body content

## 12. Recipe: review windows

Use review windows when the content benefits from an archival / layered-document metaphor.

### Anatomy

- stacked window frames
- one active readable window
- small top bar with header code
- large quote/content area
- footer with left-side reviewer info and right-side source link
- optional manual advance control

### Structural rules

- keep the total visible stack capped, usually `5`
- only one window should be fully readable at a time
- back windows are a depth cue, not content destinations
- the active window must visually dominate the stack

### Footer rules

- left side: reviewer name and org/title
- right side: source link only
- do not link the reviewer name by default
- footer type must stay readable on small mobile widths

### Interaction rules

- auto-rotation is acceptable if slow and legible
- manual advance control should be obvious
- the control can rotate or shift, but should not distract from the review
- content swaps should happen while the card is hidden if reusing a capped physical stack

### Motion

- window movement should be layered and sequential
- active card changes should feel like a handoff
- avoid too many simultaneous fades
- any rotation or orbit accents must stop exactly when the active phase ends

### Mobile rules

- reduce stack size and text scale aggressively
- keep footer metadata compact
- keep controls above the browser chrome
- never let the stack cover persistent bottom CTAs

### Do

- keep the stack depth under control
- make the active review easy to parse
- let the metaphor support credibility and memory

### Don’t

- render one physical window per review if the list is long
- overcomplicate the footer hierarchy
- let the source link disappear into the stack

## 13. Patterns that are site-specific, not universal

These exist in the current site but should not be copied into every Eduba app automatically:

- the exact "THE FACES OF INTERFACE" masthead
- the exact hero composition
- resource-card icon microinteractions
- the exact review stack layout
- all current section names
