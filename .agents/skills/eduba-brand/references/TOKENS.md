# Eduba Token Reference

## Colors

```
/* Primary */
--eb-dark-brown:   #5D3136   frame bg, headings, borders, interactive elements
--eb-deep-wine:    #421D24   gradient stops, brand-mark bg, subtle darkening
--eb-white:        #FEFBF6   default light surface, text on dark
--eb-skin:         #F9ECDF   warm card/section fill
--eb-cream:        #EAD5D6   chip hover, dividers, secondary accent
--eb-light-pink:   #D8BFC0   card borders, chip resting bg
--eb-light-brown:  #A2777A   muted labels, meta text
--eb-subtitle:     #7D5658   secondary headings on light
--eb-text-dark:    #4A2C2A   body text on light

/* Semantic */
--eb-green-dot:    #25CA58   pulsing status dot ONLY
--eb-success:      #1A9C43   form submit success state

/* Gradient */
--eb-brown-gradient: linear-gradient(358deg, #492526 1.79%, #5D4143 97.65%)
```

## Card/Section Themes

```
rose        bg #D8BFC1  title #5D3136  dots rgba(254,251,246,0.9)  border rgba(66,29,36,0.22)
mediumBrown bg #7B5A5C  title #FEFBF6  dots rgba(254,251,246,0.9)  border rgba(254,251,246,0.24)
paper       bg #FFFFFF  title #5D3136  dots rgba(93,49,54,0.32)    border rgba(93,49,54,0.18)
skin        bg #F9ECDF  title #5D3136  dots rgba(66,29,36,0.35)    border rgba(66,29,36,0.2)
darkWine    bg #5D3136  title #FEFBF6  dots rgba(254,251,246,0.9)  border rgba(254,251,246,0.22)
```

## Typography Scale

```
--eb-fs-hero-home:    clamp(120px, 20vw, 280px)   Diatype 700   lh 0.85   ls -0.02em
--eb-fs-hero-sector:  clamp(44px, 5vw, 92px)      Diatype 700
--eb-fs-section:      clamp(28px, 3.4vw, 44px)    Diatype 700   lh 1.1
--eb-fs-cta:          clamp(26px, 3.4vw, 40px)    Diatype       lh 1.1
--eb-fs-body:         15px                         Diatype 300   lh 1.6
--eb-fs-body-sm:      14px                         Diatype 300   lh 1.6
--eb-fs-card-title:   15px                         Diatype 700   lowercase
--eb-fs-faq:          14px                         Diatype 600   lowercase

--eb-fs-section-lbl:  16px                         Mono 700      uppercase
--eb-fs-card-id:      12px                         Mono 700      uppercase   ls 0.05em
--eb-fs-step:         12px                         Mono 600      uppercase   ls 0.1em
--eb-fs-nav:          11px                         Mono 600      uppercase
--eb-fs-page-idx:     11px                         Mono 700      uppercase   ls 0.2em
--eb-fs-tag:          11px                         Mono 700      uppercase   ls 0.1em
--eb-fs-form:         9px                          Mono
--eb-fs-micro:        7px                          Mono 700      uppercase   ls 0.09em
```

## Spacing

```
--eb-frame-padding:   8px    (5px mobile)   outer frame padding
--eb-content-padding: 40px                  primary content areas
--eb-section-gap:     60px                  between major sections

--eb-radius-sm:  4px    default (most components)
--eb-radius-md:  8px    cards
--eb-radius-lg:  12px   modals, overlays
```

## Breakpoints

```
small:     380px
phone:     425px
tablet:    800px   ← primary mobile breakpoint
desktop:   1366px
lgDesktop: 1920px

SCSS: @include media('<=tablet') { ... }
```

## Motion Durations

```
--eb-dur-hover:  220ms / 0.22s   hover interactions
--eb-dur-chip:   180ms / 0.18s   chip scaleX 1.04
--eb-dur-panel:  520ms / 0.52s   panel/accordion expand
```

## Easing

```
GSAP:
  back.out(2)                         spring pop
  back.out(1.5)                       elastic nudge
  power2.out                          smooth settle
  power2.inOut                        symmetric toggle

CSS:
  cubic-bezier(0.16, 1, 0.3, 1)      panel open
  cubic-bezier(0.34, 1.56, 0.64, 1)  CSS spring (NavArrow)
  cubic-bezier(0.34, 1.48, 0.64, 1)  CSS elastic (icon hover)
```

## SCSS variables

```scss
$dark-brown:      #5d3136;
$cream:           #ead5d6;
$skin:            #f9ecdf;
$text-dark:       #4a2c2a;
$light-brown:     #a2777a;
$white:           #fefbf6;
$light-pink:      #d8bfc0;
$subtitle:        #7d5658;
$font-mono:       'IBM Plex Mono', monospace;
$font-primary:    'Diatype', sans-serif;
$frame-padding:   12px;
$content-padding: 40px;
$section-gap:     60px;
$radius-sm:       4px;
$radius-md:       8px;
$radius-lg:       12px;
```
