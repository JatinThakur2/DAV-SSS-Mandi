import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConvexClientProvider } from "./ConvexClientProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConvexClientProvider>
      <App />
    </ConvexClientProvider>
  </React.StrictMode>
);

reportWebVitals();
