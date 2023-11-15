import { type TTodoItem } from "@/types/todo";
import { createServer } from "http";
import { AddressInfo } from "net";
import { Server, Socket as ServerSocket } from "socket.io";
import { Socket as ClientSocket, io as ioc } from "socket.io-client";
import { chromium, Page } from "playwright";

let page: Page;
let io: Server;
let serverSocket: ServerSocket;
let clientSocket: ClientSocket;

beforeAll(async () => {
  const httpServer = createServer();
  io = new Server(httpServer);
  const serverPromise = new Promise<void>((resolve) => {
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      clientSocket = ioc(`http://localhost:${port}`);
      io.on("connection", (socket: ServerSocket) => {
        serverSocket = socket;
        resolve();
      });
    });
  });
  await serverPromise;

  // Initialize Playwright
  const browser = await chromium.launch();
  page = await browser.newPage();
});

afterAll(() => {
  io.close();
  clientSocket.disconnect();
});

it("should render a list of todos in a browser using playwright", async () => {
  serverSocket.on("todos", (cb: (arg0: TTodoItem[]) => void) => {
    cb([
      {
        id: "1",
        title: "Test Todo 1",
        isCompleted: false,
      },
      {
        id: "2",
        title: "Test Todo 2",
        isCompleted: true,
      },
      // Add more todos as needed
    ]);
  });

  // Navigate to the page that renders the todos
  await page.goto("http://localhost:3000");

  // Wait for the todos to be loaded
  await page.waitForSelector(".todo-item");

  // Check if the todos are displayed correctly
  const todoItems = await page.$$eval(".todo-item", (items) =>
    items.map((item) => item.textContent)
  );
  expect(todoItems).toEqual(["Test Todo 1", "Test Todo 2"]);
});
