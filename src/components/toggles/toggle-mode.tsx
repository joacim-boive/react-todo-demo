import { useScreenSize } from "@/hooks/use-screen-size";
import { Suspense, lazy } from "react";
const ToggleDesktop = lazy(() => import("./toggle-desktop"));
const ToggleMobile = lazy(() => import("./toggle-mobile"));

export function ToggleMode() {
  const { isSmallScreen } = useScreenSize();

  return isSmallScreen ? (
    <Suspense fallback={<div>Loading...</div>}>
      <ToggleMobile />
    </Suspense>
  ) : (
    <Suspense fallback={<div>Loading...</div>}>
      <ToggleDesktop />
    </Suspense>
  );
}
