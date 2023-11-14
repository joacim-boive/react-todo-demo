declare module "socket.io-mock" {
  import { EventEmitter } from "events";

  export default class Socket extends EventEmitter {
    socketClient: Socket;
    server: Socket;

    constructor();

    emit(event: string, ...args: any[]): boolean;
    on(event: string, listener: (...args: any[]) => void): this;
    to(room: string): this;
    send(...args: any[]): this;
    close(): this;
  }
}
