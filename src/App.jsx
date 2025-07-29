// src/App.jsx
import React, { useState, useEffect } from 'react';
import EnvioForm     from './components/EnvioForm';
import FilterBar     from './components/FilterBar';
import ExportButton  from './components/ExportButton';
import KanbanBoard   from './components/KanbanBoard';
import Calendario    from './components/Calendario';
import DetailsPanel  from './components/DetailsPanel';

export default function App() {
  // — Estados —
  const [envios, setEnvios]                   = useState([]);
  const [filtroSucursal,  setFiltroSucursal]  = useState('');
  const [filtroTipo,      setFiltroTipo]      = useState('');
  const [selectedEntrega, setSelectedEntrega] = useState(null);

  // — 1) Leer al inicio —
  useEffect(() => {
    const datosGuardados = JSON.parse(
      localStorage.getItem('entregas') || '[]'
    );
    setEnvios(datosGuardados);
  }, []);

  // — Función para grabar —
  const persistEnvios = nuevosEnvios => {
    localStorage.setItem('entregas', JSON.stringify(nuevosEnvios));
  };

  // — 2) Agregar entrega —
  const agregarEntrega = entrega => {
    setEnvios(prev => {
      const nuevos = [entrega, ...prev];
      persistEnvios(nuevos);
      return nuevos;
    });
  };

  // — 3) Seleccionar entrega —
  const handleSelectEntrega = entrega => {
    setSelectedEntrega(entrega);
  };

  // — 4) Eliminar entrega —
  const handleDelete = () => {
    if (!window.confirm('¿Eliminar esta entrega?')) return;

    setEnvios(prev => {
      const nuevos = prev.filter(e => e.id !== selectedEntrega.id);
      persistEnvios(nuevos);
      return nuevos;
    });
    setSelectedEntrega(null);
  };

  // — 5) Cambiar estatus —
  const handleChangeStatus = () => {
    const pwd = prompt('Contraseña para cambiar estatus:');
    if (pwd !== '1234') {
      alert('🔒 Contraseña incorrecta');
      return;
    }

    let nextEstado;
    switch (selectedEntrega.estadoEntrega) {
      case 'pendiente':  nextEstado = 'en camino'; break;
      case 'en camino':  nextEstado = 'entregado';  break;
      default:
        alert('⚠️ Ya está en estado final.');
        return;
    }

    setEnvios(prev => {
      const nuevos = prev.map(e =>
        e.id === selectedEntrega.id
          ? { ...e, estadoEntrega: nextEstado }
          : e
      );
      persistEnvios(nuevos);
      return nuevos;
    });

    setSelectedEntrega(prev => ({
      ...prev,
      estadoEntrega: nextEstado,
    }));
  };

  // — 6) Filtrar envío —
  const enviosFiltrados = envios.filter(e => {
    const okS = filtroSucursal ? e.sucursal    === filtroSucursal : true;
    const okT = filtroTipo    ? e.tipoEntrega  === filtroTipo    : true;
    return okS && okT;
  });

  return (
    <div className="min-h-screen bg-pl-gray-light p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-pl-blue">Sistema de Entregas</h1>
      </header>

      {/* Formulario */}
      <section className="mb-6">
        <EnvioForm onAgregarEntrega={agregarEntrega} />
      </section>

      {/* Filtros + Exportar */}
      <section className="flex flex-wrap gap-4 mb-6">
        <FilterBar
          filtroSucursal={filtroSucursal}
          setFiltroSucursal={setFiltroSucursal}
          filtroTipo={filtroTipo}
          setFiltroTipo={setFiltroTipo}
        />
        <ExportButton entregas={enviosFiltrados} />
      </section>

      {/* Kanban */}
      <section className="mb-6">
        <KanbanBoard
          entregas={enviosFiltrados}
          onVerDetalle={handleSelectEntrega}
        />
      </section>

      {/* Calendario */}
      <section className="mb-6">
        <Calendario
          entregas={enviosFiltrados}
          onVerDetalle={handleSelectEntrega}
        />
      </section>

      {/* Panel de detalles */}
      {selectedEntrega && (
        <DetailsPanel
          entrega={selectedEntrega}
          onClose={() => setSelectedEntrega(null)}
          onDelete={handleDelete}
          onChangeStatus={handleChangeStatus}
        />
      )}
    </div>
  );
}