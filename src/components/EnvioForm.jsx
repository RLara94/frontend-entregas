// src/components/EnvioForm.jsx
import React, { useState } from "react";

export default function EnvioForm({ onAgregarEntrega }) {
  const ESTADO_INICIAL = {
    numeroFactura: "",
    nombreCliente: "",
    montoFactura: "",
    sucursal: "",
    tipoEntrega: "local",
    numeroGuia: "",
    fletera: "",
    linkSeguimiento: "",
    fechaEntrega: "",
    horaEntrega: "",
    estadoEntrega: "en sucursal",
  };
  const [entrega, setEntrega] = useState(ESTADO_INICIAL);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "tipoEntrega" && value !== "fletera") {
      setEntrega(prev => ({ ...prev, tipoEntrega: value, numeroGuia: "", fletera: "", linkSeguimiento: "" }));
    } else {
      setEntrega(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAgregarEntrega(entrega);
    setEntrega(ESTADO_INICIAL);
  };

  const inputClass = "border border-gray-300 rounded px-3 py-2 w-full";

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded grid grid-cols-1 md:grid-cols-3 gap-4">
      <input
        name="numeroFactura"
        value={entrega.numeroFactura}
        onChange={handleChange}
        placeholder="Factura #"
        className={inputClass}
        required
      />
      <input
        name="nombreCliente"
        value={entrega.nombreCliente}
        onChange={handleChange}
        placeholder="Cliente"
        className={inputClass}
        required
      />
      <input
        name="montoFactura"
        type="number"
        value={entrega.montoFactura}
        onChange={handleChange}
        placeholder="Monto $"
        className={inputClass}
        required
      />
      <select name="sucursal" value={entrega.sucursal} onChange={handleChange} className={inputClass} required>
        <option value="">— Sucursal —</option>
        <option value="A">A</option>
        <option value="B">B</option>
      </select>
      <select name="tipoEntrega" value={entrega.tipoEntrega} onChange={handleChange} className={inputClass} required>
        <option value="local">Local</option>
        <option value="foranea">Foránea</option>
        <option value="fletera">Fletera</option>
      </select>
      {entrega.tipoEntrega === "fletera" && (
        <>
          <input
            name="numeroGuia"
            value={entrega.numeroGuia}
            onChange={handleChange}
            placeholder="Guía #"
            className={inputClass}
          />
          <input
            name="fletera"
            value={entrega.fletera}
            onChange={handleChange}
            placeholder="Fletera"
            className={inputClass}
          />
          <input
            name="linkSeguimiento"
            value={entrega.linkSeguimiento}
            onChange={handleChange}
            placeholder="Link Tracking"
            className={inputClass}
          />
        </>
      )}
      <input
        name="fechaEntrega"
        type="date"
        value={entrega.fechaEntrega}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <input
        name="horaEntrega"
        type="time"
        value={entrega.horaEntrega}
        onChange={handleChange}
        className={inputClass}
        required
      />
      <button type="submit" className="col-span-full bg-pl-blue text-white px-4 py-2 rounded">
        Registrar Entrega
      </button>
    </form>
  );
}