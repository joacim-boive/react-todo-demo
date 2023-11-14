import { TTodoItem } from "@/types/todo";
import { createHttpServer, createSocketServer } from "./servers";

const PORT: number = 4000;

let todos: TTodoItem[] = [];

const http = createHttpServer({ port: PORT });

// @ts-expect-error TS error ignored
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const io = createSocketServer<TTodoItem>({
  http,
  corsOrigin: `http://localhost:5173`,
  socketEventHandlers: [
    {
      event: "addTodo",
      handler: (io, todo) => {
        console.log(`Add todo: ${todo.title}`);
        io.emit("todoAdded", todo);
        todos.push(todo);
      },
    },
    {
      event: "removeTodo",
      handler: (io, todo: TTodoItem) => {
        const id = todo.id;
        console.log(`Remove todo with id: ${id}`);
        todos = todos.filter((todo) => todo.id !== id);
        io.emit("todoRemoved", id);
      },
    },
    {
      event: "toggleTodo",
      handler: (io, todo: TTodoItem) => {
        const id = todo.id;
        console.log(`Toggle todo with id: ${id}`);
        const todoItem = todos.find((item) => item.id === id);
        if (todoItem) {
          todoItem.isCompleted = !todoItem.isCompleted;
          io.emit("todoToggle", id);
        }
      },
    },
    {
      event: "updateTodo",
      handler: (io, { id, title }: TTodoItem) => {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
          todo.title = title;
          io.emit("todoUpdate", { id, title });
        }
      },
    },
  ],
});
