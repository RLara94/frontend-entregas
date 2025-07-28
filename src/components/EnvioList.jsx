import React from 'react';

function EnvioList({ envios }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Lista de Entregas</h2>
      <ul className="space-y-2">
        {envios.map((entrega, index) => (
          <li key={index} className="bg-white shadow p-4 rounded">
            {entrega.cliente} - {entrega.factura} - {entrega.tipoEntrega}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnvioList;