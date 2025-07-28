// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tailwind.css";   // Se importa aquí tailwind.css

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("No se encontró el elemento #root en index.html");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);