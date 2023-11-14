import { DO_DIALOG, DO_EDIT } from "@/actions";
import { useEffect, useRef, useState } from "react";

type Position = { x: number; y: number };

const getAction = (target: HTMLElement): string => {
  return target.nodeName === "P" ? DO_EDIT : DO_DIALOG;
};

export const useLongPress = (delay: number = 500) => {
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const [touchedPosition, setTouchedPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [doAction, setDoAction] = useState("");

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const { clientX: x, clientY: y } = e.touches[0];
      pressTimer.current = setTimeout(() => {
        setTouchedPosition({ x, y });
        setDoAction(getAction(e.target as HTMLElement));
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
      if (pressTimer.current !== null) {
        clearTimeout(pressTimer.current);
      }
    };
  }, [delay]);

  return { doAction, setDoAction, touchedPosition };
};
