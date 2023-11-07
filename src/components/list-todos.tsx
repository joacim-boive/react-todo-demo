import { useTodoContext } from "@/contexts/todos-context";
import { TodoItem } from "@components/todo-item";
import { FC } from "react";

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
