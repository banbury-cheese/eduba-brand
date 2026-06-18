/**
 * Server-safe (no "use client") theme bootstrap. Kept separate from
 * theme-provider.tsx so a React Server Component can call it.
 *
 * Inline the returned string in a blocking <script> at the very start of
 * <body> so the correct theme lands on <html> before first paint —
 * eliminating the dark↔light flash on load. Pass the same `storageKey` you
 * give <ThemeProvider> (default "eduba-theme").
 *
 * `defaultTheme` is the fallback for a visitor with no stored choice: pass
 * "paper" or "wine" to pin it, or omit to follow the OS `prefers-color-scheme`.
 * Keep it in sync with the `defaultTheme` you pass <ThemeProvider>.
 *
 *   <script dangerouslySetInnerHTML={{ __html: themeInitScript("eduba-theme", "paper") }} />
 */
export function themeInitScript(storageKey = "eduba-theme", defaultTheme?: "paper" | "wine"): string {
  const fallback =
    defaultTheme === "paper" || defaultTheme === "wine"
      ? JSON.stringify(defaultTheme)
      : `window.matchMedia("(prefers-color-scheme: dark)").matches?"wine":"paper"`;
  return `(function(){try{var k=${JSON.stringify(storageKey)},t=localStorage.getItem(k);if(t!=="paper"&&t!=="wine"){t=${fallback};}var e=document.documentElement;e.setAttribute("data-theme",t);e.style.colorScheme=t==="wine"?"dark":"light";}catch(_){}})();`;
}
