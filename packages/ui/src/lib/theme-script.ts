/**
 * Server-safe (no "use client") theme bootstrap. Kept separate from
 * theme-provider.tsx so a React Server Component can call it.
 *
 * Inline the returned string in a blocking <script> at the very start of
 * <body> so the correct theme lands on <html> before first paint —
 * eliminating the dark↔light flash on load. Pass the same `storageKey` you
 * give <ThemeProvider> (default "eduba-theme").
 *
 *   <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
 */
export function themeInitScript(storageKey = "eduba-theme"): string {
  return `(function(){try{var k=${JSON.stringify(storageKey)},t=localStorage.getItem(k);if(t!=="paper"&&t!=="wine"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"wine":"paper";}var e=document.documentElement;e.setAttribute("data-theme",t);e.style.colorScheme=t==="wine"?"dark":"light";}catch(_){}})();`;
}
