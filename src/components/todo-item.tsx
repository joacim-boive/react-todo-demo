import { useTodo } from "@/hooks/use-todo";
import { TTodoItem } from "@/types/todo";
import { Button, Checkbox, Input } from "@components/ui";
import { FC, useEffect, useState } from "react";

type ListTodoProps = {
  todo: TTodoItem;
};

export const TodoItem: FC<ListTodoProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { removeTodo, toggleTodo, updateTodo } = useTodo();
  const { title, id, isCompleted } = todo;

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false);
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [setIsEditing]);

  const handleRemove = (todo: TTodoItem) => {
    removeTodo(todo);
  };

  const handleToggle = () => {
    toggleTodo(todo);
  };

  const handleUpdate = (updatedTitle: string) => {
    updateTodo({
      id,
      title: updatedTitle,
      isCompleted,
    });
  };

  return (
    <li
      className={`group grid items-center grid-cols-10 pt-2 pb-2 pl-1 pr-1 md:pl-4 md:pr-4 gap-4 border-t border-gray-200 first:border-0 ${
        isEditing ? "bg-gray-100 dark:bg-gray-100/20" : ""
      }`}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex items-center justify-start">
        <Checkbox id={id} onClick={handleToggle} />
      </div>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            const input = e.currentTarget[0] as HTMLInputElement;
            const updatedTitle = input.value;

            setIsEditing(false);
            handleUpdate(updatedTitle);
          }}
          className="flex items-center justify-between col-span-9"
        >
          <Input
            type="text"
            defaultValue={title}
            title="Enter to submit, Esc to cancel"
            autoFocus
            className={`flex-grow pl-0 text-xl font-normal bg-transparent`}
          />
        </form>
      ) : (
        <div className="flex items-center justify-between col-span-9">
          <p
            title="Double click to edit"
            className={`font-thin text-xl flex-grow cursor-pointer ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {title}
          </p>
          <Button
            onClick={() => handleRemove(todo)}
            title="Delete todo"
            variant="destructive"
            className="pt-1 pb-1 pl-2 pr-2"
          >
            Delete
          </Button>
        </div>
      )}
    </li>
  );
};
