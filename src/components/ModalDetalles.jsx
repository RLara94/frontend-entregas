// src/components/ModalDetalles.jsx
import React from "react";

export default function ModalDetalles({
  entrega,
  onClose,
  onActualizarEntrega,
  onEliminar
}) {
  // Lanza prompt y si la contraseña es correcta, avanza el estatus
  const handleChangeStatus = () => {
    const pwd = prompt("Ingresa contraseña para cambiar estatus:");
    // Ajusta esta contraseña a la real que quieras usar
    const PASS = "1234";
    if (pwd === PASS) {
      let siguiente;
      if (entrega.estadoEntrega === "en sucursal") siguiente = "en camino";
      else if (entrega.estadoEntrega === "en camino") siguiente = "entregado";
      else {
        alert("Ya está en estado final.");
        return;
      }
      onActualizarEntrega({ ...entrega, estadoEntrega: siguiente });
      alert(`Estatus cambiado a "${siguiente}"`);
    } else {
      alert("🔒 Contraseña incorrecta");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Detalles de Entrega</h3>
        <p><strong>Factura:</strong> {entrega.numeroFactura}</p>
        <p><strong>Cliente:</strong> {entrega.nombreCliente}</p>
        <p><strong>Tipo:</strong> {entrega.tipoEntrega}</p>
        <p><strong>Estado:</strong> {entrega.estadoEntrega}</p>

        <div className="mt-6 flex justify-between space-x-2">
          <button
            onClick={handleChangeStatus}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Cambiar Estatus
          </button>
          <button
            onClick={() => onEliminar(entrega)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}