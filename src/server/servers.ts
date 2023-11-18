// server.ts
import express, { Express } from "express";
import { Server, createServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

/**
 * Type for the configuration object for the createHttpServer function.
 */
type THttpServerConfig = {
  port: number;
};

/**
 * Type for the configuration object for the createSocketServer function.
 */
type TSocketServerConfig<T> = {
  http: Server;
  corsOrigin: string;
  socketEventHandlers: {
    event: string;
    handler: (io: IOServer, data: T) => void;
  }[];
};

const createHttpServer = ({ port }: THttpServerConfig): Server => {
  const app: Express = express();
  const http: Server = createServer(app);
  http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  return http;
};

const createSocketServer = <T>({
  http,
  corsOrigin,
  socketEventHandlers,
}: TSocketServerConfig<T>): IOServer => {
  const io: IOServer = new IOServer(http, {
    cors: {
      origin: corsOrigin,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`💡: ${socket.id} user just connected!`);

    socket.on("disconnect", () => {
      console.log(`💀: ${socket.id} user disconnected!`);
    });
    socketEventHandlers.forEach(({ event, handler }) => {
      socket.on(event, (data: T) => handler(io, data));
    });
  });

  return io;
};

export { createHttpServer, createSocketServer };
