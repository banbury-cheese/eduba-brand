"use client";

import * as React from "react";

/**
 * eduba ships two themes:
 *   - `paper` — the light theme (white page, dark brown ink, skin cards)
 *   - `wine`  — the dark theme (dark brown page, cream ink, deep-wine cards)
 *
 * Both are brand-validated and exhaustively contrast-balanced. Use `useTheme()`
 * to read/set; use `useDarkMode()` for a boolean view.
 */
export type EdubaTheme = "paper" | "wine";

export const EDUBA_THEMES: readonly EdubaTheme[] = ["paper", "wine"] as const;

const DARK_THEME: EdubaTheme = "wine";
const LIGHT_THEME: EdubaTheme = "paper";

/**
 * Read the theme already applied to <html> by the pre-paint script (see
 * `themeInitScript`). Initializing state from this — rather than a hardcoded
 * default — is what prevents the apply effect from clobbering the correct
 * theme back to the default on mount, which caused a dark→light flash.
 */
function readInitialTheme(defaultTheme?: EdubaTheme): EdubaTheme {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "paper" || attr === "wine") return attr;
  }
  return defaultTheme ?? LIGHT_THEME;
}

type ThemeContextValue = {
  theme: EdubaTheme;
  setTheme: (theme: EdubaTheme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Initial theme. If omitted, falls back to system `prefers-color-scheme`. */
  defaultTheme?: EdubaTheme;
  /** Element to apply `data-theme` to. Defaults to `document.documentElement`. */
  target?: HTMLElement | null;
  /** Persist to localStorage under this key. Pass `null` to disable. */
  storageKey?: string | null;
}

export function ThemeProvider({
  children,
  defaultTheme,
  target,
  storageKey = "eduba-theme",
}: ThemeProviderProps) {
  // Initialize from the attribute the pre-paint script already set, so the
  // first apply below is a no-op (no flash) instead of clobbering to default.
  const [theme, setThemeState] = React.useState<EdubaTheme>(() => readInitialTheme(defaultTheme));

  // Safety net: re-resolve from storage/system on mount in case the pre-paint
  // script was absent. Usually a no-op since state already matches the attribute.
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = storageKey
      ? (window.localStorage.getItem(storageKey) as EdubaTheme | null)
      : null;
    if (stored && EDUBA_THEMES.includes(stored)) {
      setThemeState(stored);
      return;
    }
    if (defaultTheme) return;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setThemeState(DARK_THEME);
    }
  }, [storageKey, defaultTheme]);

  React.useEffect(() => {
    const el = target ?? (typeof document !== "undefined" ? document.documentElement : null);
    if (!el) return;
    el.setAttribute("data-theme", theme);
    el.style.colorScheme = theme === DARK_THEME ? "dark" : "light";
  }, [theme, target]);

  const setTheme = React.useCallback(
    (next: EdubaTheme) => {
      setThemeState(next);
      if (typeof window !== "undefined" && storageKey) {
        window.localStorage.setItem(storageKey, next);
      }
    },
    [storageKey],
  );

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  }, [theme, setTheme]);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider />");
  }
  return ctx;
}

/** Convenience: boolean view of the active theme. */
export function useDarkMode(): { isDark: boolean; toggle: () => void } {
  const { theme, toggleTheme } = useTheme();
  return { isDark: theme === DARK_THEME, toggle: toggleTheme };
}
