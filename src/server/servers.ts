// server.ts
import express, { Express } from "express";
import { Server, createServer } from "http";
import { Server as IOServer, Socket } from "socket.io";

/**
 * Type for the configuration object for the createHttpServer function.
 */
type HttpServerConfig = {
  port: number;
};

/**
 * Type for the configuration object for the createSocketServer function.
 */
type SocketServerConfig<T> = {
  http: Server;
  corsOrigin: string;
  socketEventHandlers: {
    event: string;
    handler: (io: IOServer, data: T) => void;
  }[];
};

const createHttpServer = ({ port }: HttpServerConfig): Server => {
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
}: SocketServerConfig<T>): IOServer => {
  const io: IOServer = new IOServer(http, {
    cors: {
      origin: corsOrigin,
    },
  });

  io.on("connection", (socket: Socket) => {
    socketEventHandlers.forEach(({ event, handler }) => {
      socket.on(event, (data: T) => handler(io, data));
    });
  });

  return io;
};

export { createHttpServer, createSocketServer };
