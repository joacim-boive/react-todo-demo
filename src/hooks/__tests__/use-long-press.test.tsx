import { fireEvent } from "@testing-library/dom";
import { act, renderHook } from "@testing-library/react";
import { useLongPress } from "../use-long-press";

jest.useFakeTimers();

describe("useLongPress", () => {
  it("sets showMenu to true when window is touched for longer than delay", () => {
    const delay = 500;
    const { result } = renderHook(() => useLongPress(delay));

    act(() => {
      fireEvent.touchStart(window, { touches: [{ clientX: 0, clientY: 0 }] });
      jest.advanceTimersByTime(delay + 1);
    });

    expect(result?.current.showMenu).toBe(true);
  });
  it("wont set showMenu to true when window is touched for shorter than delay", () => {
    const delay = 500;
    const { result } = renderHook(() => useLongPress(delay));

    act(() => {
      fireEvent.touchStart(window, { touches: [{ clientX: 0, clientY: 0 }] });
      jest.advanceTimersByTime(delay - 1);
    });

    expect(result?.current.showMenu).toBe(false);
  });
});
