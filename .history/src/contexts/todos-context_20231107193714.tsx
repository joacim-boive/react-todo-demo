import { TTodoItem } from "@/types/todo";
import { createContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export const TodosContext = createContext<{
  todos: TTodoItem[];
  addTodo: (todo: TTodoItem) => void;
  removeTodo: (id: string) => void;
}>({
  todos: [],
  addTodo: (todo) => {
    setTodos((prev) => [...prev, todo]);
  },
  removeTodo: (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  },
});
export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState<TTodoItem[]>([]);

  useEffect(() => {
    // fetch todos from server
    setTodos([
      { id: 1, title: "todo 1" },
      { id: 2, title: "todo 2" },
    ]);
  }, []);

  const addTodo = (todo: TTodoItem) => {
    setTodos((prev) => [...prev, todo]);
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  );
};
