import { useEffect, useRef, useState } from "react";
import { DO_DIALOG } from "@/actions";
import { useAppContext } from "@/hooks/use-app-context";

type TPosition = { x: number; y: number };

export const useLongPress = (delay: number = 500) => {
  const { isLongPressed } = useAppContext();
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const [touchedPosition, setTouchedPosition] = useState<TPosition>({
    x: 0,
    y: 0,
  });
  const [doAction, setDoAction] = useState("");

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (isLongPressed) return; //Another longpres is in progress

      const { clientX: x, clientY: y } = e.touches[0];
      pressTimer.current = setTimeout(() => {
        setTouchedPosition({ x, y });
        setDoAction(DO_DIALOG);
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
  }, [delay, isLongPressed]);

  return { doAction, setDoAction, touchedPosition };
};
