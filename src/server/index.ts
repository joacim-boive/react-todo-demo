import cors from "cors";
import express, { Express, Request, Response } from "express";
import { Server, createServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

const PORT: number = 4000;

const app: Express = express();
const http: Server = createServer(app);

app.use(cors());

const io: IOServer = new IOServer(http, {
  cors: {
    origin: `http://localhost:5173`,
  },
});

//Add this before the app.get() block
io.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
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
