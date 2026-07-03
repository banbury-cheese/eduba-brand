"use client";

import * as React from "react";
import { cn } from "../lib/utils";

/* =============================================================================
   CopyButton — copies a string to the clipboard, with a check-mark confirm.
   ============================================================================= */

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  /** ms the "copied" state shows. Default 1600. */
  timeout?: number;
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, timeout = 1600, className, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    React.useEffect(
      () => () => {
        if (timer.current) clearTimeout(timer.current);
      },
      [],
    );

    const copy = React.useCallback(() => {
      navigator.clipboard?.writeText(value).then(() => {
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), timeout);
      });
    }, [value, timeout]);

    return (
      <button
        ref={ref}
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        data-copied={copied}
        className={cn(
          "inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm",
          "text-muted-foreground transition-colors duration-[var(--duration-press)] ease-out",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "data-[copied=true]:text-[var(--eb-success)]",
          className,
        )}
        {...props}
      >
        {copied ? (
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
            <path
              d="M3 8.5l3.5 3L13 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
            <rect
              x="5"
              y="5"
              width="8"
              height="8"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";

/* =============================================================================
   CodeBlock — editorial code surface. Terminal-style header with dots + an
   optional filename, a copy button, and a scrollable code area. Pass `code`
   (used for display + copy); optionally pass pre-highlighted `html` (e.g. from
   Shiki) to render syntax colors while still copying the raw `code`.
   ============================================================================= */

export interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  code: string;
  /** Filename / label shown in the header. Header is hidden if this and showDots are both falsy. */
  filename?: string;
  /** Pre-highlighted HTML for the code area (raw `code` is still used for copy). */
  html?: string;
  /** Show the traffic-dot cluster in the header. Default true. */
  showDots?: boolean;
  /** Show the copy button. Default true. */
  showCopy?: boolean;
}

export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ code, filename, html, showDots = true, showCopy = true, className, ...props }, ref) => {
    const hasHeader = showDots || filename != null || showCopy;
    return (
      <div
        ref={ref}
        className={cn(
          // Clean surface: white on paper, deep wine on dark — delineated by the border.
          "overflow-hidden rounded-md border border-border bg-background",
          className,
        )}
        {...props}
      >
        {hasHeader ? (
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            {showDots ? (
              <span aria-hidden="true" className="inline-flex items-center gap-[3px]">
                <span className="block h-[7px] w-[7px] rounded-full bg-[currentColor]/25" />
                <span className="block h-[7px] w-[7px] rounded-full bg-[currentColor]/25" />
                <span className="block h-[7px] w-[7px] rounded-full bg-[currentColor]/25" />
              </span>
            ) : null}
            {filename != null ? (
              <span className="font-mono uppercase tracking-[0.08em] text-[9px] font-bold text-muted-foreground">
                {filename}
              </span>
            ) : null}
            {showCopy ? <CopyButton value={code} className="ml-auto -mr-1" /> : null}
          </div>
        ) : null}
        <div className="relative">
          {!hasHeader && showCopy ? (
            <CopyButton value={code} className="absolute right-2 top-2 z-10" />
          ) : null}
          <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12px] leading-relaxed text-[var(--eb-fg)]">
            {html != null ? (
              // biome-ignore lint/security/noDangerouslySetInnerHtml: caller-provided highlighted markup
              <code dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <code>{code}</code>
            )}
          </pre>
        </div>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
