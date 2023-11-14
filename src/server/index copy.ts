import { TTodoItem } from "@/types/todo";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { Server, createServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

const PORT: number = 4000;

const app: Express = express();
const http: Server = createServer(app);

app.use(cors());

let todos: TTodoItem[] = [];

const io: IOServer = new IOServer(http, {
  cors: {
    origin: `http://localhost:5173`,
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`💡: ${socket.id} user just connected!`);
  io.emit("todos", todos);

  socket.on("disconnect", () => {
    console.log(`💀: ${socket.id} user disconnected!`);
  });

  socket.on("todoAdd", (todo: TTodoItem) => {
    console.log(`Add todo: ${todo.title}`);
    io.emit("todoAdded", todo);
    todos.push(todo);
  });

  socket.on("removeTodo", (id: string) => {
    console.log(`Remove todo with id: ${id}`);
    todos = todos.filter((todo) => todo.id !== id);

    io.emit("todoRemoved", id);
  });

  socket.on("toggleTodo", (id: string) => {
    console.log(`Toggle todo with id: ${id}`);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      io.emit("todoToggle", id);
    }
  });

  socket.on("updateTodo", ({ id, title }: TTodoItem) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.title = title;
      io.emit("todoUpdate", { id, title });
    }
  });
});

app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT} `);
});
