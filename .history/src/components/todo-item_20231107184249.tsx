import { TTodoItem } from "@/types/todo";
import { Button } from "@components/ui";
import { FC } from "react";

type ListTodoProps = {
  todo: TTodoItem;
};

export const TodoItem: FC<ListTodoProps> = ({ todo }) => {
  return (
    <div className="flex items-center space-x-4">
      <p>{todo.title}</p>
      <Button>Edit</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
};
