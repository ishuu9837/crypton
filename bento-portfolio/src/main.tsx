import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { App } from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem storageKey="eswar-theme">
    <App />
  </ThemeProvider>,
);
