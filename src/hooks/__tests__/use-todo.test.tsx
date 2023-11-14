import { TodosProvider } from "@/contexts/todos-context";
import { useTodo } from "@/hooks/use-todo";
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";

// Define the type of the value returned by useT
describe("useTodo", () => {
  it("should throw an error when used outside of TodosProvider", () => {
    expect(() => {
      renderHook(() => useTodo());
    }).toThrow("useTodo must be used within a TodosProvider");
  });

  it("should not throw an error when used within TodosProvider", () => {
    const wrapper = ({ children }: { children?: ReactNode }) => (
      <TodosProvider>{children}</TodosProvider>
    );

    expect(() => {
      renderHook(() => useTodo(), { wrapper });
    }).not.toThrow();
  });
});
