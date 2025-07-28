// src/components/EditEntregaForm.jsx
import React, { useState } from "react";

export default function EditEntregaForm({ entrega, onCancel, onSave }) {
  // Inicializamos el estado local con la entrega que llega por props
  const [form, setForm] = useState({ ...entrega });

  // Manejador genérico de cambios
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Al enviar, llamamos onSave(form)
  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  // Clases reutilizables
  const inputClass = "mt-1 block w-full border border-gray-300 rounded px-3 py-2";

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 z-40 flex items-start justify-center pt-24 bg-black bg-opacity-30"
    >
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Editar Entrega</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Número de factura */}
          <input
            name="numeroFactura"
            value={form.numeroFactura}
            onChange={handleChange}
            className={inputClass}
            placeholder="Número de factura"
            required
          />

          {/* Nombre del cliente */}
          <input
            name="nombreCliente"
            value={form.nombreCliente}
            onChange={handleChange}
            className={inputClass}
            placeholder="Nombre del cliente"
            required
          />

          {/* Monto */}
          <input
            name="montoFactura"
            type="number"
            value={form.montoFactura}
            onChange={handleChange}
            className={inputClass}
            placeholder="Monto $"
            required
          />

          {/* Tipo de entrega */}
          <select
            name="tipoEntrega"
            value={form.tipoEntrega}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="local">Local</option>
            <option value="foranea">Foránea</option>
            <option value="fletera">Fletera</option>
          </select>

          {/* Campos condicionales solo si es fletera */}
          {form.tipoEntrega === "fletera" && (
            <>
              <input
                name="numeroGuia"
                value={form.numeroGuia}
                onChange={handleChange}
                className={inputClass}
                placeholder="Número de guía"
              />
              <input
                name="fletera"
                value={form.fletera}
                onChange={handleChange}
                className={inputClass}
                placeholder="Nombre de fletera"
              />
              <input
                name="linkSeguimiento"
                value={form.linkSeguimiento}
                onChange={handleChange}
                className={inputClass}
                placeholder="Link de seguimiento"
              />
            </>
          )}

          {/* Fecha */}
          <input
            name="fechaEntrega"
            type="date"
            value={form.fechaEntrega}
            onChange={handleChange}
            className={inputClass}
            required
          />

          {/* Hora */}
          <input
            name="horaEntrega"
            type="time"
            value={form.horaEntrega}
            onChange={handleChange}
            className={inputClass}
            required
          />

          {/* Estado */}
          <select
            name="estadoEntrega"
            value={form.estadoEntrega}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="en sucursal">En sucursal</option>
            <option value="en camino">En camino</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>

        {/* Botones */}
        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}