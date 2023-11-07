import { TTodoItem } from "@/types/todo";
import { FC } from "react";
import { TodoItem } from "./todo-item";

type ListTodosProps = {
  todos: TTodoItem[];
};

export const ListTodos: FC<ListTodosProps> = ({ todos }) => {
  const {} = useTodoContext();
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
