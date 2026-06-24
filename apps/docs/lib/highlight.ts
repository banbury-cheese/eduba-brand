import { type Highlighter, createHighlighter } from "shiki";

/* =============================================================================
   Build-time syntax highlighting (Shiki).

   Runs in Server Components only — i.e. at build / SSG time in Node — so the
   highlighter (grammars + themes, hundreds of KB) NEVER ships to the client.
   The output is a plain HTML string fed into <CodeBlock html={...} />.

   Theming: we load both a light (paper) and dark (wine) theme and emit per-token
   CSS variables (--shiki-light / --shiki-dark) via `defaultColor: false`. The
   actual color is chosen in CSS from the active [data-theme] — see the `.eb-shiki`
   rules in globals.css — so a single highlight pass serves both themes with no
   client JS and no re-highlighting on theme toggle.
   ============================================================================= */

const THEME_LIGHT = "github-light";
const THEME_DARK = "github-dark";

/** Languages we preload. Add here if a snippet needs a new grammar. */
const LANGS = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "json",
  "bash",
  "shell",
  "css",
  "html",
  "md",
  "mdx",
  "diff",
];

// Created once and reused for the whole build — createHighlighter is expensive.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME_LIGHT, THEME_DARK],
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

/**
 * Highlights `code` and returns the *inner* HTML for a `<code>` element —
 * theme-aware token spans, ready to drop into `<CodeBlock html={...} />`.
 * Unknown languages fall back to un-highlighted (but still escaped) plain text.
 */
export async function highlight(code: string, lang: string): Promise<string> {
  const hl = await getHighlighter();
  const safeLang = hl.getLoadedLanguages().includes(lang) ? lang : "txt";

  const full = hl.codeToHtml(code.trimEnd(), {
    lang: safeLang,
    themes: { light: THEME_LIGHT, dark: THEME_DARK },
    defaultColor: false,
  });

  // Strip Shiki's own <pre><code> wrappers (CodeBlock supplies its own, styled
  // to the brand) and wrap the lines in a hook span the docs CSS targets.
  const inner = full
    .replace(/^<pre[^>]*><code[^>]*>/, "")
    .replace(/<\/code><\/pre>\s*$/, "");

  return `<span class="eb-shiki">${inner}</span>`;
}
