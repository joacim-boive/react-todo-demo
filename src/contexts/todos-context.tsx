import { TTodoItem } from "@/types/todo";
import { ReactNode, createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

export const TodosContext = createContext<{
  todos: TTodoItem[];
  addTodo: (todo: TTodoItem) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (todo: TTodoItem) => void;
}>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
  updateTodo: () => {},
});

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TTodoItem[]>([]);

  useEffect(() => {
    const handleTodoAdded = (todo: TTodoItem) => {
      setTodos((prev) => [...prev, todo]);
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

    const handleTodoUpdate = ({ id, title }: TTodoItem) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
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
      socket.off("todoUpdate", handleTodoUpdate);
      socket.off("todoToggle", handleTodoToggle);
    };
  }, []);

  const addTodo = (todo: TTodoItem) => {
    socket.emit("addTodo", todo);
  };
  const removeTodo = (id: string) => {
    socket.emit("removeTodo", id);
  };
  const toggleTodo = (id: string) => {
    socket.emit("toggleTodo", id);
  };
  const updateTodo = (todo: TTodoItem) => {
    socket.emit("updateTodo", todo);
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, removeTodo, toggleTodo, updateTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};
