import { useTodoContext } from "@/contexts/todos-context";
import { TTodoItem } from "@/types/todo";
import { Button, Checkbox, Input } from "@components/ui";
import { FC, useEffect, useState } from "react";

type ListTodoProps = {
  todo: TTodoItem;
};

export const TodoItem: FC<ListTodoProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { removeTodo, toggleTodo, updateTodo } = useTodoContext();
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

  const handleRemove = (id: string) => {
    removeTodo(id);
  };

  const handleToggle = () => {
    toggleTodo(id);
  };

  const handleUpdate = (updatedTitle: string) => {
    updateTodo({
      id,
      title: updatedTitle,
      isCompleted,
    });
  };

  return (
    <div
      className="flex items-center space-x-4"
      onDoubleClick={() => setIsEditing(true)}
      title={isEditing ? "Enter to submit" : "Double click to edit"}
    >
      {isEditing && (
        <form
          onSubmit={(e) => {
            const input = e.currentTarget[0] as HTMLInputElement;
            const updatedTitle = input.value;

            setIsEditing(false);
            handleUpdate(updatedTitle);
          }}
        >
          <Input
            type="text"
            defaultValue={title}
            autoFocus
            className="w-full"
          />
        </form>
      )}
      {!isEditing && (
        <>
          <Checkbox id={id} onClick={handleToggle} checked={isCompleted} />
          <p className={isCompleted ? "line-through" : ""}>{title}</p>
          <Button onClick={() => handleRemove(id)} variant="destructive">
            Delete
          </Button>
        </>
      )}
    </div>
  );
};
