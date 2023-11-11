import { TodosContext } from "@/contexts/todos-context";
import { useContext } from "react";

export const useTodo = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodosProvider");
  }

  return context;
};
