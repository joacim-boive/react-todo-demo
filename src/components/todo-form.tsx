import { useTodo } from "@/hooks/use-todo";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormMessage,
  Input,
} from "@components/ui";
import { CheckCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Todo must be at least 2 characters.",
  }),
});

export const TodoForm = () => {
  const { addTodo } = useTodo();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const todo = {
      id: Math.random().toString(),
      title: data.title,
      isCompleted: false,
    };

    addTodo(todo);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <div className="grid items-center grid-cols-10 gap-4">
              <Button
                type="button"
                variant="transparent"
                size="icon"
                className="flex items-center justify-start"
              >
                <CheckCircle size={28} strokeWidth={1} className="h-8 w-84" />
              </Button>
              <div className="flex items-center justify-between w-full col-span-9">
                <FormControl className="formControl">
                  <Input
                    placeholder="Add a todo"
                    {...field}
                    className="pl-0 text-2xl "
                  />
                </FormControl>
                <FormMessage />
                <Button type="submit" variant="default">
                  Add
                </Button>
              </div>
            </div>
          )}
        />
      </form>
    </Form>
  );
};
