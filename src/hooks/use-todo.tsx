import { TodosContext } from "@/contexts/todos-context";
import { useContext } from "react";

export const useTodo = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodo must be used within a TodosProvider");
  }

  return context;
};
