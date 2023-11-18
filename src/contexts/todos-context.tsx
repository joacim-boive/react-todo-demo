import { type TTodoItem } from "@/types/todo";
import {
  createContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { io } from "socket.io-client";

import {
  SERVER_REQUEST_TODO_ADD,
  SERVER_CONFIRM_TODO_ADD,
  SERVER_REQUEST_TODO_REMOVE,
  SERVER_CONFIRM_TODO_REMOVE,
  SERVER_REQUEST_TODO_UPDATE,
  SERVER_CONFIRM_TODO_UPDATE,
  SERVER_REQUEST_TODO_TOGGLE,
  SERVER_CONFIRM_TODO_TOGGLE,
  SERVER_REQUEST_TODOS_ALL_DONE,
  SERVER_CONFIRM_TODOS_ALL_DONE,
  SERVER_REQUEST_TODOS_LOAD,
  SERVER_CONFIRM_TODOS_LOAD,
} from "@/event-names";

import { URL, SOCKET_SERVER_PORT } from "@/config";

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
  markAllDoneTodos: () => void;
};

const socket = io(`${URL}:${SOCKET_SERVER_PORT}`);

export const TodosContext = createContext<TTodosContext | undefined>(undefined);

export const TodosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TTodoItem[]>([]);

  useEffect(() => {
    /**
     * This method is used to handle the loading of todos.
     * It takes an array of todo items as a parameter and sets the state of todos with it.
     *
     * @param {TTodoItem[]} todos - An array of todo items
     */
    const handleTodosLoaded = (todos: TTodoItem[]) => {
      setTodos(todos);
    };

    /**
     * This method is used to handle the addition of a new todo item.
     * It takes a todo item as a parameter and prepends it to the existing list of todos.
     *
     * @param {TTodoItem} todo - The new todo item to be added
     */
    const handleTodoAdded = (todo: TTodoItem) => {
      setTodos((prev) => [todo, ...prev]);
    };

    /**
     * This method is used to handle the removal of a todo item.
     * It takes the id of a todo item as a parameter and removes it from the existing list of todos.
     *
     * @param {string} id - The id of the todo item to be removed
     */
    const handleTodoRemoved = (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    /**
     * This method is used to handle the toggling of a todo item's completion status.
     * It takes the id of a todo item as a parameter and toggles its 'isCompleted' status.
     *
     * @param {string} id - The id of the todo item to be toggled
     */
    const handleTodoToggled = (id: string) => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    };

    /**
     * This method is used to handle the updating of a todo item's title.
     * It takes an object as a parameter which includes the id of the todo item to be updated and the new title.
     *
     * @param {TUpdateTodoPayload} payload - An object containing the id of the todo item to be updated and the new title
     */
    const handleTodoUpdated = ({ id, title }: TUpdateTodoPayload) => {
      setTodos((prev) =>
        prev.map((todoItem) =>
          todoItem.id === id ? { ...todoItem, title } : todoItem
        )
      );
    };

    // Listen for events
    socket.on(SERVER_CONFIRM_TODOS_LOAD, handleTodosLoaded);
    socket.on(SERVER_CONFIRM_TODO_ADD, handleTodoAdded);
    socket.on(SERVER_CONFIRM_TODO_REMOVE, handleTodoRemoved);
    socket.on(SERVER_CONFIRM_TODO_TOGGLE, handleTodoToggled);
    socket.on(SERVER_CONFIRM_TODO_UPDATE, handleTodoUpdated);
    socket.on(SERVER_CONFIRM_TODOS_ALL_DONE, handleTodosLoaded);

    return () => {
      socket.off(SERVER_CONFIRM_TODOS_LOAD, handleTodosLoaded);
      socket.off(SERVER_CONFIRM_TODO_ADD, handleTodoAdded);
      socket.off(SERVER_CONFIRM_TODO_REMOVE, handleTodoRemoved);
      socket.off(SERVER_CONFIRM_TODO_TOGGLE, handleTodoToggled);
      socket.off(SERVER_CONFIRM_TODO_UPDATE, handleTodoUpdated);
      socket.off(SERVER_CONFIRM_TODOS_ALL_DONE, handleTodosLoaded);
    };
  }, []);

  useEffect(() => {
    // Make sure the client is ready to recieve it's first event
    socket.emit(SERVER_REQUEST_TODOS_LOAD);
  }, []);

  const addTodo = (todo: TTodoItem) => {
    socket.emit(SERVER_REQUEST_TODO_ADD, todo);
  };
  const removeTodo = (id: string) => {
    socket.emit(SERVER_REQUEST_TODO_REMOVE, { id });
  };
  const toggleTodo = (id: string) => {
    socket.emit(SERVER_REQUEST_TODO_TOGGLE, { id });
  };
  const updateTodo = (data: TUpdateTodoPayload) => {
    socket.emit(SERVER_REQUEST_TODO_UPDATE, data);
  };
  const markAllDoneTodos = () => {
    socket.emit(SERVER_REQUEST_TODOS_ALL_DONE);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTodo,
        markAllDoneTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
