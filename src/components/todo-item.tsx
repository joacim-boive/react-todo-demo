import { useTodo } from "@/hooks/use-todo";
import { useAppContext } from "@/hooks/use-app-context";
import { type TTodoItem } from "@/types/todo";
import { Button, Checkbox, Input } from "@components/ui";
import clsx from "clsx";
import { memo, useCallback, useEffect, useState, useRef, type FC } from "react";

const ESCAPE_KEY = "Escape";
const DELETE_TODO_TITLE = "Delete todo";
const DOUBLE_CLICK_TO_EDIT_TITLE = "Double click to edit";

export const TodoItem: FC<{ todo: TTodoItem }> = memo(({ todo }) => {
  const { removeTodo, toggleTodo, updateTodo } = useTodo();
  const { setIsLongPressed } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const { title, id, isCompleted } = todo;

  const handleRemove = useCallback(() => removeTodo(id), [removeTodo, id]);
  const handleToggle = useCallback(() => toggleTodo(id), [toggleTodo, id]);
  const handleUpdate = useCallback(
    (title: string) => {
      updateTodo({ id, title });
    },
    [updateTodo, id]
  );

  const longPressTimer = useRef<NodeJS.Timeout>();
  const handleLongPressStart = () => {
    setIsLongPressed(true);
    longPressTimer.current = setTimeout(() => setIsEditing(true), 500);
  };
  const handleLongPressEnd = () => {
    setIsLongPressed(false);
    clearTimeout(longPressTimer.current);
  };
  useEffect(() => {
    return () => {
      clearTimeout(longPressTimer.current);
    };
  }, []);

  const doneEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) doneEditing();
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [doneEditing]);

  const listItemClasses = clsx(
    "group grid items-center grid-cols-10 pt-2 pb-2 pl-1 pr-1 md:pl-4 md:pr-4 gap-4 border-t border-gray-200 first:border-0",
    { "bg-gray-100 dark:bg-gray-100/20": isEditing }
  );

  return (
    <li
      onTouchStart={handleLongPressStart}
      onTouchEnd={handleLongPressEnd}
      className={listItemClasses}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex items-center justify-start">
        <Checkbox
          id={id}
          aria-label={`Mark the todo: "${todo.title}" as ${
            !todo.isCompleted ? "Done" : "Not Done"
          }`}
          onClick={() => handleToggle()}
          checked={isCompleted}
        />
      </div>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget[0] as HTMLInputElement;
            const updatedTitle = input.value;

            doneEditing();
            handleUpdate(updatedTitle);
          }}
          className="flex items-center justify-between col-span-9"
        >
          <Input
            type="text"
            defaultValue={title}
            title={DOUBLE_CLICK_TO_EDIT_TITLE}
            autoFocus
            onBlur={() => setIsEditing(false)}
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
            onClick={handleRemove}
            title={DELETE_TODO_TITLE}
            variant="destructive"
            className="pt-1 pb-1 pl-2 pr-2"
          >
            Delete
          </Button>
        </div>
      )}
    </li>
  );
});

TodoItem.displayName = "TodoItem";
