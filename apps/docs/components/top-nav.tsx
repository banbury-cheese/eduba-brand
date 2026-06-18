"use client";

import { Mono, useDarkMode } from "@eduba/ui";
import Link from "next/link";
import * as React from "react";

/**
 * The fixed top-nav on the dark eduba frame. Renders the brand mark, primary
 * navigation, and a light/dark theme toggle. Lives as a client component so it
 * can read theme state from <ThemeProvider>.
 */
export function TopNav() {
  const { isDark, toggle } = useDarkMode();
  // The server always renders the light state (theme resolves client-side from
  // localStorage). Gate the toggle's icon/label on mount so SSR and the first
  // client render match — the background is already correct via the pre-paint
  // script, so only this small control settles a frame later.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const dark = mounted && isDark;
  return (
    <header className="eb-frame-topnav">
      <Link href="/" className="flex shrink-0 items-center gap-2 group">
        <span className="block h-1.5 w-1.5 rounded-full bg-[var(--eb-green-dot)] [animation:dotBlink_2s_ease-in-out_infinite]" />
        <Mono className="whitespace-nowrap text-[10px] tracking-[0.14em] sm:tracking-[0.16em]">
          @eduba/ui<span className="hidden sm:inline"> · v0.0.1</span>
        </Mono>
      </Link>
      <nav className="flex shrink-0 items-center gap-3.5 sm:gap-5">
        <Link
          href="/docs"
          className="whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold opacity-80 hover:opacity-100 transition-opacity"
        >
          components
        </Link>
        <Link
          href="/themes"
          className="whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold opacity-80 hover:opacity-100 transition-opacity"
        >
          themes
        </Link>
        <Link
          href="https://github.com/banbury-cheese/eduba-brand"
          target="_blank"
          className="hidden whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold opacity-80 transition-opacity hover:opacity-100 sm:inline"
        >
          github
        </Link>
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-sm border border-current/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold opacity-80 hover:opacity-100 hover:border-current/60 transition-[opacity,border-color,transform] duration-[var(--duration-press)] active:scale-[0.97]"
        >
          {/* Sun in light mode, moon in dark — drawn in currentColor (cream) so
              it stays visible on the always-dark frame nav. */}
          {dark ? (
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M13.5 9.6A5.5 5.5 0 1 1 6.4 2.5 4.5 4.5 0 0 0 13.5 9.6Z"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <circle cx="8" cy="8" r="2.75" />
              <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.6 3.6l1.1 1.1M11.3 11.3l1.1 1.1M12.4 3.6l-1.1 1.1M4.7 11.3l-1.1 1.1" />
            </svg>
          )}
          {dark ? "dark" : "light"}
        </button>
      </nav>
    </header>
  );
}
