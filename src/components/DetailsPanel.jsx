// src/components/DetailsPanel.jsx
import React from "react";

export default function DetailsPanel({ entrega, onClose, onDelete, onChangeStatus }) {
  const colors = {
    "en sucursal": "border-red-500 bg-red-50",
    "en camino":   "border-blue-500 bg-blue-50",
    "entregado":   "border-green-500 bg-green-50",
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center p-6">
      <div className={`bg-white border-l-4 p-6 rounded shadow-lg w-full max-w-md ${colors[entrega.estadoEntrega]}`}>
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700 text-xl">&times;</button>
        <h2 className="text-xl font-bold mb-4">Entrega {entrega.numeroFactura}</h2>
        <p><strong>Cliente:</strong> {entrega.nombreCliente}</p>
        <p><strong>Sucursal:</strong> {entrega.sucursal}</p>
        <p><strong>Tipo:</strong> {entrega.tipoEntrega}</p>
        {entrega.tipoEntrega === "fletera" && (
          <>
            <p><strong>Guía:</strong> {entrega.numeroGuia}</p>
            <p><strong>Tracking:</strong> <a href={entrega.linkSeguimiento} target="_blank" className="text-blue-600 underline">Ver</a></p>
          </>
        )}
        <p><strong>Fecha:</strong> {entrega.fechaEntrega} <strong>Hora:</strong> {entrega.horaEntrega}</p>
        <p><strong>Estado:</strong> {entrega.estadoEntrega}</p>
        <div className="mt-4 flex gap-2">
          <button onClick={onChangeStatus} className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded px-4 py-2">
            Cambiar Estatus
          </button>
          <button onClick={onDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}