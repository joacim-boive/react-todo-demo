import {
  Moon as DarkIcon,
  Sun as LightIcon,
  Server as SystemIcon,
} from "lucide-react";
import { createContext, useEffect, useState } from "react";

const themes = ["dark", "light", "system"] as const;

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  themes: readonly Theme[];
  themeIcons: {
    [key in Theme]: React.ComponentType<React.SVGAttributes<SVGElement>>;
  };
  setTheme: (theme: Theme) => void;
};

const themeIcons = {
  dark: DarkIcon,
  light: LightIcon,
  system: SystemIcon,
};

export const ThemeProviderContext = createContext<
  ThemeProviderState | undefined
>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,

    themes,
    themeIcons,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
