import { useTodo } from "@/hooks/use-todo";
import { TodoItem } from "@components/todo-item";
import { type FC } from "react";

export const TodoList: FC = () => {
  const { todos } = useTodo();
  return (
    <>
      <ol className="list-none">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ol>
    </>
  );
};
