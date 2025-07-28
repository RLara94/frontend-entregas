// src/components/FilterBar.jsx
import React from "react";

export default function FilterBar({ filtroSucursal, setFiltroSucursal, filtroTipo, setFiltroTipo }) {
  const selectClass = "border border-gray-300 rounded px-3 py-2";

  return (
    <div className="flex gap-4">
      <select
        value={filtroSucursal}
        onChange={e => setFiltroSucursal(e.target.value)}
        className={selectClass}
      >
        <option value="">— Sucursal —</option>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>

      <select
        value={filtroTipo}
        onChange={e => setFiltroTipo(e.target.value)}
        className={selectClass}
      >
        <option value="">— Tipo —</option>
        <option value="local">Local</option>
        <option value="foranea">Foránea</option>
        <option value="fletera">Fletera</option>
      </select>
    </div>
  );
}