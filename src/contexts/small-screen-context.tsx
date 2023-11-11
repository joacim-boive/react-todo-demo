import { FC, ReactNode, createContext, useEffect, useState } from "react";

// Define the context
export const ScreenSizeContext = createContext({
  isSmallScreen: false, // You can add additional state or functions here if needed
});

// Context Provider Component
export const ScreenSizeProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      const detectorElement = document.getElementById("small-screen-detector");
      if (detectorElement) {
        const style = window.getComputedStyle(detectorElement);
        setIsSmallScreen(style.display !== "inline");
      }
    };

    window.addEventListener("resize", checkBreakpoint);
    checkBreakpoint();

    // Cleanup listener when component unmounts
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ isSmallScreen }}>
      {children}
      <div id="small-screen-detector" className="hidden md:inline"></div>
    </ScreenSizeContext.Provider>
  );
};

export default ScreenSizeProvider;
