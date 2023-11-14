import { useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };

export const useLongPress = (delay: number = 500) => {
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const [touchedPosition, setTouchedPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const { clientX: x, clientY: y } = e.touches[0];
      pressTimer.current = setTimeout(() => {
        setTouchedPosition({ x, y });
        setShowMenu(true);
      }, delay);
    };

    const handleTouchEnd = () => {
      if (pressTimer.current !== null) {
        clearTimeout(pressTimer.current);
        pressTimer.current = null;
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [delay]);

  return { showMenu, setShowMenu, touchedPosition };
};
