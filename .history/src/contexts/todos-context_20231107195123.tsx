import { TTodoItem } from "@/types/todo";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const TodosContext = createContext<{
  todos: TTodoItem[];
  addTodo: (todo: TTodoItem) => void;
  removeTodo: (id: string) => void;
}>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TTodoItem[]>([]);

  useEffect(() => {
    // fetch todos from server
    setTodos([
      { id: "1", title: "todo 1" },
      { id: "2", title: "todo 2" },
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

// eslint-disable-next-line react-refresh/only-export-components
export const useTodoContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodosProvider");
  }

  return context;
};
