import { TTodoItem } from "@/types/todo";
import { ReactNode, createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export type TUpdateTodoPayload = {
  id: string;
  title: string;
};

export type TTodosContext = {
  todos: TTodoItem[];
  addTodo: (todo: TTodoItem) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (data: TUpdateTodoPayload) => void;
};

export const TodosContext = createContext<TTodosContext | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TTodoItem[]>([]);

  useEffect(() => {
    const handleTodoAdded = (todo: TTodoItem) => {
      setTodos((prev) => [todo, ...prev]);
    };

    const handleTodosLoaded = (todos: TTodoItem[]) => {
      setTodos(todos);
    };

    const handleTodoRemove = (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const handleTodoToggle = (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    };

    const handleTodoUpdate = ({ id, title }: TUpdateTodoPayload) => {
      setTodos((prev) =>
        prev.map((todoItem) =>
          todoItem.id === id ? { ...todoItem, title } : todoItem
        )
      );
    };

    socket.on("todos", handleTodosLoaded);
    socket.on("todoAdded", handleTodoAdded);
    socket.on("todoRemoved", handleTodoRemove);
    socket.on("todoToggle", handleTodoToggle);
    socket.on("todoUpdate", handleTodoUpdate);

    return () => {
      socket.off("todos", handleTodosLoaded);
      socket.off("todoAdded", handleTodoAdded);
      socket.off("todoRemoved", handleTodoRemove);
      socket.off("todoToggle", handleTodoToggle);
      socket.off("todoUpdate", handleTodoUpdate);
    };
  }, []);

  const addTodo = (todo: TTodoItem) => {
    socket.emit("addTodo", todo);
  };
  const removeTodo = (id: string) => {
    socket.emit("removeTodo", { id });
  };
  const toggleTodo = (id: string) => {
    socket.emit("toggleTodo", { id });
  };
  const updateTodo = (data: TUpdateTodoPayload) => {
    socket.emit("updateTodo", data);
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, removeTodo, toggleTodo, updateTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};
