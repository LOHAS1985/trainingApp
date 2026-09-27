import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";

if (import.meta.env.DEV) {
  // MSW を開発時に起動
  import('./mocks/browser').then(({ worker }) => {
    worker.start()
  })
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
