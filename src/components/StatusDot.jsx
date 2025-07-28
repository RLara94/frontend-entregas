// src/components/StatusDot.jsx
import React from "react";

export default function StatusDot({ estado }) {
  const color =
    estado === "en sucursal" ? "bg-red-500" :
    estado === "en camino" ? "bg-blue-500" :
    "bg-green-500";
  return <span className={`inline-block w-3 h-3 rounded-full ${color}`} />;
}