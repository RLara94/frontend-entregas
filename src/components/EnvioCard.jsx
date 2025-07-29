// src/components/EnvioCard.jsx
import React from 'react';
import StatusDot from './StatusDot'; // o como lo tengas

export default function EnvioCard({ entrega = {} }) {
  // destructuramos con defaults
  const {
    numeroFactura  = '',
    nombreCliente  = '',
    estadoEntrega  = 'pendiente',
  } = entrega;

  // si no hay ID, no renderices nada
  if (!entrega.id) return null;

  return (
    <div className="flex items-center space-x-2 p-2 bg-white rounded shadow cursor-pointer hover:bg-gray-50">
      {/* El puntito de estado */}
      <StatusDot estado={estadoEntrega} />

      {/* Texto de la tarjeta */}
      <div className="text-sm font-medium">
        <span>{numeroFactura}</span>
        <span className="ml-2 text-gray-500">{nombreCliente}</span>
      </div>
    </div>
  );
}