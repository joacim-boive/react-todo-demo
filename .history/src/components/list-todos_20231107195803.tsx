import { useTodoContext } from "@/contexts/todos-context";
import { FC } from "react";
import { TodoItem } from "./todo-item";

export const ListTodos: FC = () => {
  const { todos } = useTodoContext();
  return (
    <div>
      <ol className="list-none p-0 space-y-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ol>
    </div>
  );
};
