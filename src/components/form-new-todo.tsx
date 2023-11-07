import { useTodoContext } from "@/contexts/todos-context";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@components/ui";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Todo must be at least 2 characters.",
  }),
});

export const FormNewTodo = () => {
  const { addTodo } = useTodoContext();
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
    };

    addTodo(todo);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex w-full max-w-sm items-center justify-center space-x-2">
                  <Input placeholder="Add a todo" {...field} />
                  <Button type="submit" variant="default">
                    Add Todo
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
