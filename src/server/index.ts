import { TUpdateTodoPayload } from "@/contexts/todos-context";
import { type TTodoItem } from "@/types/todo";
import chalk from "chalk";
import { createHttpServer, createSocketServer } from "./servers";

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

import { SOCKET_SERVER_PORT, CORS_ORIGIN } from "@/config";

/* server:request:todo:load and server:confirm:todo:load. */

const logInfo = chalk.blueBright;
const logError = chalk.red;

let todos: TTodoItem[] = [];

const http = createHttpServer({ port: SOCKET_SERVER_PORT });

createSocketServer<TTodoItem>({
  http,
  corsOrigin: CORS_ORIGIN,
  socketEventHandlers: [
    {
      event: SERVER_REQUEST_TODOS_LOAD,
      handler: (io) => {
        try {
          io.emit(SERVER_CONFIRM_TODOS_LOAD, todos);
          console.log(
            logInfo(
              `${SERVER_CONFIRM_TODOS_LOAD}: ${JSON.stringify(todos, null, 2)}`
            )
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(
              logError(`Error ${SERVER_REQUEST_TODOS_LOAD}: ${error.message}`)
            );
          }
        }
      },
    },
    {
      event: SERVER_REQUEST_TODO_ADD,
      handler: (io, todo) => {
        try {
          todos = [todo, ...todos]; //Add new todo to start of array

          io.emit(SERVER_CONFIRM_TODO_ADD, todo);
          console.log(
            logInfo(
              `${SERVER_CONFIRM_TODO_ADD}: ${JSON.stringify(todo, null, 2)}`
            )
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(
              logError(`Error ${SERVER_REQUEST_TODO_ADD}: ${error.message}`)
            );
          }
        }
      },
    },
    {
      event: SERVER_REQUEST_TODO_REMOVE,
      handler: (io, { id }) => {
        try {
          todos = todos.filter((todo) => todo.id !== id);

          io.emit(SERVER_CONFIRM_TODO_REMOVE, id);
          console.log(logInfo(`${SERVER_REQUEST_TODO_REMOVE} with ID `, id));
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(logError(`Error removeTodo: ${error.message}`));
          }
        }
      },
    },
    {
      event: SERVER_REQUEST_TODO_TOGGLE,
      handler: (io, { id }) => {
        try {
          const index = todos.findIndex((todo) => todo.id === id);
          if (index !== -1) {
            todos[index] = {
              ...todos[index],
              isCompleted: !todos[index].isCompleted,
            };

            io.emit(SERVER_CONFIRM_TODO_TOGGLE, id);
            console.log(
              logInfo(`${SERVER_CONFIRM_TODO_TOGGLE} with id: ${id}`)
            );
          } else {
            console.log(
              logError(
                `${SERVER_CONFIRM_TODO_TOGGLE} - Todo with id ${id} not found`
              )
            );
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(
              logError(`Error ${SERVER_CONFIRM_TODO_TOGGLE}: ${error.message}`)
            );
          }
        }
      },
    },
    {
      event: SERVER_REQUEST_TODO_UPDATE,
      handler: (io, data: TUpdateTodoPayload) => {
        try {
          const { id, title } = data;
          const index = todos.findIndex((todo) => todo.id === id);
          if (index !== -1) {
            todos[index] = { ...todos[index], title };

            io.emit(SERVER_CONFIRM_TODO_UPDATE, data);
            console.log(
              logInfo(
                `${SERVER_CONFIRM_TODO_UPDATE}: ${JSON.stringify(
                  data,
                  null,
                  2
                )}`
              )
            );
          } else {
            console.log(
              logError(
                `${SERVER_REQUEST_TODO_UPDATE} - Todo with id ${id} not found`,
                data
              )
            );
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(
              logError(`Error ${SERVER_REQUEST_TODO_UPDATE}: ${error.message}`)
            );
          }
        }
      },
    },
    {
      event: SERVER_REQUEST_TODOS_ALL_DONE,
      handler: (io) => {
        try {
          todos = todos.map((todo) => {
            return { ...todo, isCompleted: true };
          });

          io.emit(SERVER_CONFIRM_TODOS_ALL_DONE, todos);
          console.log(
            logInfo(
              `${SERVER_CONFIRM_TODOS_ALL_DONE}: Marking all todos as completed!`
            )
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(
              logError(
                `Error ${SERVER_REQUEST_TODOS_ALL_DONE}: ${error.message}`
              )
            );
          }
        }
      },
    },
  ],
});
