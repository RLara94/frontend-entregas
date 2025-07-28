// src/components/KanbanBoard.jsx
import React from "react";
import StatusDot from "./StatusDot";

export default function KanbanBoard({ envios, onVerDetalle }) {
  const estados = ["en sucursal", "en camino", "entregado"];
  return (
    <div className="grid grid-cols-3 gap-4">
      {estados.map(estado => (
        <div key={estado} className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">{estado.toUpperCase()}</h3>
          <ul className="space-y-2">
            {envios
              .filter(e => e.estadoEntrega === estado)
              .map((e, i) => (
                <li
                  key={i}
                  onClick={() => onVerDetalle(e)}
                  className="flex items-center justify-between p-2 bg-pl-gray-light rounded cursor-pointer hover:bg-pl-gray-dark hover:text-white transition"
                >
                  <span>{e.numeroFactura} – {e.nombreCliente}</span>
                  <StatusDot estado={estado} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}