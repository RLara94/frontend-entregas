import React from "react";

function ModalEvento({ evento, onClose }) {
  if (!evento) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Detalle de Entrega</h3>
        <p><strong>Factura:</strong> {evento.numeroFactura}</p>
        <p><strong>Cliente:</strong> {evento.nombreCliente}</p>
        <p><strong>Monto:</strong> ${evento.montoFactura}</p>
        <p><strong>Tipo de Entrega:</strong> {evento.tipoEntrega}</p>
        <p><strong>Fletera:</strong> {evento.fletera}</p>
        <p><strong>Número de Guía:</strong> {evento.numeroGuia}</p>
        {evento.linkSeguimiento && (
          <p><strong>Seguimiento:</strong> <a href={evento.linkSeguimiento} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Ver estado</a></p>
        )}
        <div className="text-right mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEvento;