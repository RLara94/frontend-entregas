// src/components/KanbanBoard.jsx
import React from 'react';
import EnvioCard from './EnvioCard';

export default function KanbanBoard({ entregas = [], onVerDetalle }) {
  // Definimos las tres columnas con los estados exactos que maneja App.jsx
  const estados = [
    { key: 'pendiente', label: 'Pendiente' },
    { key: 'en camino', label: 'En Camino' },
    { key: 'entregado', label: 'Entregado' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {estados.map(({ key, label }) => (
        <div key={key}>
          <h2 className="font-bold mb-2">{label}</h2>
          {entregas
            .filter(e => e.estadoEntrega === key)
            .map(e => (
              <div key={e.id} onClick={() => onVerDetalle(e)}>
                <EnvioCard entrega={e} />
              </div>
            ))
          }
        </div>
      ))}
    </div>
  );
}