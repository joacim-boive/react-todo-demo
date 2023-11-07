import { FormNewTodo } from "@components/form-new-todo";
import { ModeToggle } from "@components/mode-toggle";
import { Card } from "@components/ui";

import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

import "./App.css";
import { ListTodos } from "./components/list-todos";

const App = () => {
  return (
    <>
      <Card className="p-8 max-2xl:mx-auto max-2xl:w-3/4">
        <h1 className="text-3xl font-bold">TODOS</h1>
        <div className="flex flex-col w-full items-center justify-center">
          <FormNewTodo />
          <ListTodos />
        </div>
      </Card>
      <ModeToggle />
    </>
  );
};

export default App;
