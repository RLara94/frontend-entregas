// src/App.jsx
import React, { useState, useEffect } from "react";
import EnvioForm from "./components/EnvioForm";
import FilterBar from "./components/FilterBar";
import ExportButton from "./components/ExportButton";
import KanbanBoard from "./components/KanbanBoard";
import Calendario from "./components/Calendario";
import DetailsPanel from "./components/DetailsPanel";

export default function App() {
  const [envios, setEnvios] = useState([]);
  const [filtroSucursal, setFiltroSucursal] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [selectedEntrega, setSelectedEntrega] = useState(null);

  // 1) Carga inicial
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("entregas") || "[]");
    setEnvios(datos);
  }, []);

  // 2) Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("entregas", JSON.stringify(envios));
  }, [envios]);

  // 3) Agregar nueva entrega
  const agregarEntrega = (entrega) => {
    setEnvios(prev => [entrega, ...prev]);
  };

  // 4) Seleccionar entrega para detalles
  const handleSelectEntrega = (entrega) => {
    setSelectedEntrega(entrega);
  };

  // 5) Cerrar panel de detalles
  const handleCloseDetails = () => {
    setSelectedEntrega(null);
  };

  // 6) Eliminar entrega
  const handleDelete = () => {
    if (window.confirm("¿Eliminar esta entrega?")) {
      setEnvios(prev => prev.filter(e => e !== selectedEntrega));
      handleCloseDetails();
    }
  };

  // 7) Cambiar estatus con contraseña
  const handleChangeStatus = () => {
    const pwd = prompt("Contraseña para cambiar estatus:");
    if (pwd !== "1234") {
      alert("🔒 Contraseña incorrecta");
      return;
    }
    const current = selectedEntrega.estadoEntrega;
    let nextEstado;
    if (current === "en sucursal") {
      nextEstado = "en camino";
    } else if (current === "en camino") {
      nextEstado = "entregado";
    } else {
      alert("⚠️ Ya está en estado final.");
      return;
    }
    const updated = { ...selectedEntrega, estadoEntrega: nextEstado };
    setEnvios(prev => prev.map(e => (e === selectedEntrega ? updated : e)));
    setSelectedEntrega(updated);
  };

  // 8) Filtrar envíos
  const enviosFiltrados = envios.filter(e => {
    const okS = filtroSucursal ? e.sucursal === filtroSucursal : true;
    const okT = filtroTipo ? e.tipoEntrega === filtroTipo : true;
    return okS && okT;
  });

  return (
    <div className="min-h-screen bg-pl-gray-light p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-pl-blue">Sistema de Entregas</h1>
      </header>

      {/* ENVIOS FORM */}
      <section className="mb-6">
        <EnvioForm onAgregarEntrega={agregarEntrega} />
      </section>

      {/* FILTER + EXPORT */}
      <section className="flex flex-wrap gap-4 mb-6">
        <FilterBar
          filtroSucursal={filtroSucursal}
          setFiltroSucursal={setFiltroSucursal}
          filtroTipo={filtroTipo}
          setFiltroTipo={setFiltroTipo}
        />
        <ExportButton datos={enviosFiltrados} />
      </section>

      {/* KANBAN */}
      <section className="mb-6">
        <KanbanBoard
          envios={enviosFiltrados}
          onVerDetalle={handleSelectEntrega}
        />
      </section>

      {/* CALENDARIO */}
      <section className="mb-6">
        <Calendario
          entregas={enviosFiltrados}
          onVerDetalle={handleSelectEntrega}
        />
      </section>

      {/* PANEL LATERAL DETALLES */}
      {selectedEntrega && (
        <DetailsPanel
          entrega={selectedEntrega}
          onClose={handleCloseDetails}
          onDelete={handleDelete}
          onChangeStatus={handleChangeStatus}
        />
      )}
    </div>
  );
}