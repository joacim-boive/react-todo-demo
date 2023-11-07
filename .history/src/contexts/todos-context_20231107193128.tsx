import { createContext, useEffect, useState } from "react";
import { TTodoItem } from "../types/todo";

export const TodosContext = createContext<{
  todos: TTodoItem[];
  addTodo: (todo: TTodoItem) => void;
  removeTodo: (id: number) => void;
}>;
