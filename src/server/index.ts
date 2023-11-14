import { TUpdateTodoPayload } from "@/contexts/todos-context";
import { findById } from "@/lib/utils";
import { TTodoItem } from "@/types/todo";
import chalk from "chalk";
import { createHttpServer, createSocketServer } from "./servers";

const PORT: number = 4000;

const logInfo = chalk.blueBright;
const logError = chalk.red;

let todos: TTodoItem[] = [];

const http = createHttpServer({ port: PORT });

createSocketServer<TTodoItem>({
  http,
  corsOrigin: `http://localhost:5173`,
  initialDataEmitter: (socket) => {
    socket.emit("todos", todos);
  },
  socketEventHandlers: [
    {
      event: "addTodo",
      handler: (io, todo) => {
        try {
          console.log(logInfo(`addTodo: ${JSON.stringify(todo, null, 2)}`));

          io.emit("todoAdded", todo);
          todos = [todo, ...todos]; //Add new todo to start of array
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(logError(`Error addTodo: ${error.message}`));
          }
        }
      },
    },
    {
      event: "removeTodo",
      handler: (io, { id }) => {
        try {
          console.log(logInfo(`removeTodo with ID `, id));

          todos = todos.filter((todo) => todo.id !== id);
          io.emit("todoRemoved", id);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(logError(`Error removeTodo: ${error.message}`));
          }
        }
      },
    },
    {
      event: "toggleTodo",
      handler: (io, { id }) => {
        try {
          console.log(logInfo(`toggleTodo with id: ${id}`));

          const todoItem = findById(todos, id);
          if (todoItem) {
            todoItem.isCompleted = !todoItem.isCompleted;
            io.emit("todoToggle", id);
          } else {
            console.log(logError(`Todo with id ${id} not found`));
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(logError(`Error toggleTodo: ${error.message}`));
          }
        }
      },
    },
    {
      event: "updateTodo",
      handler: (io, data: TUpdateTodoPayload) => {
        try {
          console.log(logInfo(`updateTodo: ${JSON.stringify(data, null, 2)}`));

          const { id, title } = data;
          const todoItem = findById(todos, id);
          if (todoItem) {
            todoItem.title = title;
            io.emit("todoUpdate", data);
          } else {
            console.log(logError(`Todo with id ${id} not found`, data));
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(logError(`Error updateTodo: ${error.message}`));
          }
        }
      },
    },
  ],
});
