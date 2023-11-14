import { ThemeProvider } from "@/contexts/theme-context";
import { useTheme } from "@/hooks/use-theme";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";

describe("useTheme", () => {
  it("should throw an error when used outside of ThemeProvider", () => {
    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");
  });

  it("should not throw an error when used within ThemeProvider", () => {
    const wrapper = ({ children }: { children?: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    expect(() => {
      renderHook(() => useTheme(), { wrapper });
    }).not.toThrow();
  });
});
