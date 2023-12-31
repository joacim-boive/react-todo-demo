import { AppProvider } from "@/contexts/app-context";
import { ScreenSizeProvider } from "@/contexts/small-screen-context.tsx";
import { ThemeProvider } from "@/contexts/theme-context.tsx";
import { TodosProvider } from "@/contexts/todos-context";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <TodosProvider>
          <ScreenSizeProvider>
            <App />
          </ScreenSizeProvider>
        </TodosProvider>
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>
);

// Prevent the context menu from opening and colliding with our long press on mobile.
window.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);
