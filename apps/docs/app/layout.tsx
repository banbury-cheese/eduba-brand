import { FilmGrain, ThemeProvider, Toaster, TooltipProvider, themeInitScript } from "@eduba/ui";
import type { Metadata } from "next";
import { TopNav } from "../components/top-nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "@eduba/ui — eduba's component library",
  description:
    "A versatile, brand-aligned React component library powering eduba.io.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Sets data-theme before first paint — kills the flash. "paper" is the
            default for visitors with no stored choice (keep in sync with ThemeProvider). */}
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, static, self-authored init script */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript("eduba-theme", "paper") }} />
        <ThemeProvider defaultTheme="paper">
          <TooltipProvider>
            <div className="eb-frame">
              <TopNav />
              <main className="eb-frame-paper">{children}</main>
            </div>
            <Toaster />
            <FilmGrain />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
