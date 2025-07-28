import React from "react";

function KanbanBoard({ envios, onVerDetalle }) {
  const columnas = ["en sucursal", "en camino", "entregado"];

  return (
    // Scroll horizontal para móviles
    <div className="overflow-x-auto mb-6">
      <div className="flex space-x-4 px-2">
        {columnas.map((col) => (
          <div
            key={col}
            className="min-w-[250px] bg-white rounded-lg shadow border border-gray-200 p-4"
          >
            <h3 className="text-lg font-semibold text-blue-800 capitalize mb-3">
              {col}
            </h3>
            <div className="space-y-2">
              {envios
                .filter((e) => e.estadoEntrega === col)
                .map((envio, idx) => (
                  <div
                    key={idx}
                    onClick={() => onVerDetalle(envio)}
                    className="cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded p-3 transition"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      {envio.numeroFactura}
                    </p>
                    <p className="text-xs text-gray-600">
                      {envio.nombreCliente}
                    </p>
                    <p className="text-xs text-gray-600">
                      {envio.fechaEntrega} {envio.horaEntrega}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;