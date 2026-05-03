import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

setBaseUrl(
  import.meta.env.VITE_API_BASE_URL ||
    "https://lightslategray-dinosaur-220659.hostingersite.com",
);

createRoot(document.getElementById("root")!).render(<App />);
