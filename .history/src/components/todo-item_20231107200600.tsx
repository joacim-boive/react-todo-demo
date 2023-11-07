import { useTodoContext } from "@/contexts/todos-context";
import { TTodoItem } from "@/types/todo";
import { Button } from "@components/ui";
import { FC } from "react";

type ListTodoProps = {
  todo: TTodoItem;
};

export const TodoItem: FC<ListTodoProps> = ({ todo }) => {
  const { removeTodo } = useTodoContext();
  const { title, id } = todo;

  const handleRemove = () => {
    removeTodo(id);
  };
  return (
    <div className="flex items-center space-x-4">
      <p>{title}</p>
      <Button>Edit</Button>
      <Button onClick={() => removeTodo(id)} variant="destructive">
        Delete
      </Button>
    </div>
  );
};
