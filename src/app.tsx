import { TodoForm } from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";
import { ToggleMode } from "@/components/toggles/toggle-mode";
import { type FC } from "react";
// Get it?
const App: FC = () => {
  return (
    <main role="main">
      <section className="relative justify-center mx-auto md:pt-8 md:w-2/3 lg:w-1/2 xl:min-w-min">
        <h1
          className="text-center sr-only text-8xl md:not-sr-only md:mb-8"
          style={{ fontWeight: 100 }}
        >
          todos
        </h1>
        <div className="flex flex-col items-center justify-center w-full mx-auto border border-gray-200 shadow-lg">
          <header className="w-full gap-4 pt-2 pb-2 pl-1 pr-1 mb-0 md:pl-4 md:pr-4">
            <TodoForm />
          </header>
          <section className="w-full border border-t-2 border-gray-200">
            <div className="">
              <TodoList />
            </div>
          </section>
        </div>
        <ToggleMode />
      </section>
    </main>
  );
};

export default App;
