import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PcProvider } from "./PcContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PcProvider>
      <App />
    </PcProvider>
  </React.StrictMode>
);