"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FrameNav,
  FrameNavBrand,
  FrameNavChip,
  FrameNavGroup,
  FrameNavLink,
  FrameShell,
  Mono,
  SectionLabel,
  useDarkMode,
} from "@eduba/ui";
import { BookOpen } from "lucide-react";
import * as React from "react";

// Demo route for <FrameShell>. Open /frame-demo to review the frame, the top-nav
// layout, and the scramble-on-hover nav labels. Safe to delete after review.
export default function FrameDemoPage() {
  const { isDark, toggle } = useDarkMode();
  // Gate the label on mount so SSR (always light) and the first client render match.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <FrameShell
      nav={
        <FrameNav>
          <FrameNavBrand label="The Faces of Interface" />
          <FrameNavGroup>
            {/* Readings hides at <=tablet, exactly like eduba.io's nav. */}
            <FrameNavLink label="Readings" className="max-[800px]:hidden" />
            {/* Collapses to icon-only at <=tablet, like eduba.io's chip. */}
            <FrameNavChip
              label="Clief Notes"
              icon={<BookOpen className="size-3" />}
              labelClassName="max-[800px]:hidden"
            />
            <button
              type="button"
              onClick={toggle}
              className="cursor-pointer font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--eb-cream)] opacity-80 transition-opacity hover:opacity-100 max-[800px]:hidden"
            >
              {mounted && isDark ? "paper" : "wine"}
            </button>
            <FrameNavChip label="info@eduba.io" variant="primary" />
          </FrameNavGroup>
        </FrameNav>
      }
    >
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="mb-10 flex items-baseline justify-between">
          <SectionLabel index="000" label="frame shell" />
          <Mono className="hidden text-[10px] opacity-50 sm:block">hover the nav ↑</Mono>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-eb-light-brown">
          Component
        </p>
        <h1 className="mt-4 text-[clamp(44px,8vw,96px)] font-bold leading-[0.9] tracking-[-0.02em] text-foreground">
          frame shell
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-foreground/80">
          A fixed dark-brown shell wrapping an inner paper surface that scrolls, with a
          mono top nav whose labels scramble on hover. Try hovering each nav item: the
          plain link, the pill, and the primary CTA with the pulsing dot. Use the
          paper/wine toggle in the nav to see the inner surface crossfade.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>scramble labels</CardTitle>
            </CardHeader>
            <CardContent className="text-[14px] leading-[1.6] text-card-foreground/80">
              Each nav label reuses the dependency-light useScramble hook — no GSAP. The
              tail re-randomizes while characters lock in left to right.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>pill animation</CardTitle>
            </CardHeader>
            <CardContent className="text-[14px] leading-[1.6] text-card-foreground/80">
              The chip background scales and brightens on hover in pure CSS. The primary
              variant inverts to paper and carries the green status dot.
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Button>primary action</Button>
          <Button variant="outline">secondary</Button>
          <Button variant="ghost">ghost</Button>
        </div>

        <div className="mt-16 space-y-4 text-[15px] leading-[1.7] text-foreground/70">
          <p>
            This block exists so the paper surface scrolls while the brown frame, the top
            nav, and the footer stay fixed. Scroll down to confirm the inner surface
            behaves as its own viewport.
          </p>
          <p>
            The frame reads its colour and inset from the --eb-frame and
            --eb-frame-padding tokens, so it themes without prop drilling. Film grain
            overlays the whole frame.
          </p>
          <div className="h-[40vh]" aria-hidden="true" />
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-eb-light-brown">
            end of scroll · frame stays put
          </p>
        </div>
      </div>
    </FrameShell>
  );
}
