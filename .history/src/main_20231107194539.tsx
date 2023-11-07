import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { TodosProvider } from "./contexts/todos-context.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <TodosProvider>
        <App />
      </TodosProvider>
    </ThemeProvider>
  </React.StrictMode>
);
