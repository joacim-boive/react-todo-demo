import { useEffect, useState } from "react";

type Position = { x: number; y: number };

export const useLongPress = (delay: number = 500) => {
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [touchedPosition, setTouchedPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const { clientX: x, clientY: y } = e.touches[0];
      setPressTimer(
        setTimeout(() => {
          setTouchedPosition({ x, y });
          setShowMenu(true);
        }, delay)
      );
    };

    const handleTouchEnd = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        setPressTimer(null);
      }
    };

    const root = document.querySelector("html");
    if (root) {
      root.addEventListener("touchstart", handleTouchStart);
      root.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (root) {
        root.removeEventListener("touchstart", handleTouchStart);
        root.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [delay, pressTimer]);

  return { showMenu, setShowMenu, touchedPosition };
};
