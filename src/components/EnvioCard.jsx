import React from "react";
import StatusDot from "./StatusDot";

export default function EnvioCard({ envio, onVerDetalle }) {
  return (
    <div
      onClick={() => onVerDetalle(envio)}
      className="flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer"
    >
      {/* Punto de estado */}
      <StatusDot estado={envio.estadoEntrega} size={1.5} />

      {/* Datos del envío */}
      <div>
        <p className="font-medium text-gray-800">{envio.numeroFactura}</p>
        <p className="text-sm text-gray-600">{envio.nombreCliente}</p>
        <p className="text-xs text-gray-500">
          {envio.fechaEntrega} {envio.horaEntrega}
        </p>
      </div>
    </div>
  );
}