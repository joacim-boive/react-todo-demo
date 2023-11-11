import { ScreenSizeContext } from "@/contexts/small-screen-context";
import { useContext } from "react";
export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);

  if (!context) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }

  return context;
};
