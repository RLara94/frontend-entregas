// src/components/EnvioForm.jsx
import React, { useState } from 'react';

export default function EnvioForm({ onAgregarEntrega }) {
  const [numeroFactura,      setNumeroFactura]      = useState('');
  const [nombreCliente,      setNombreCliente]      = useState('');
  const [monto,              setMonto]              = useState('');
  const [sucursal,           setSucursal]           = useState('');
  const [tipoEntrega,        setTipoEntrega]        = useState('Local');
  const [fechaEntrega,       setFechaEntrega]       = useState('');
  const [horaEntrega,        setHoraEntrega]        = useState('');
  // Campos extra para Fletera
  const [fletera,            setFletera]            = useState('');
  const [numeroGuia,         setNumeroGuia]         = useState('');
  const [linkSeguimiento,    setLinkSeguimiento]    = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!numeroFactura || !nombreCliente || !monto || !fechaEntrega) return;

    const nuevaEntrega = {
      id: Date.now().toString(),
      numeroFactura,
      nombreCliente,
      monto: parseFloat(monto),
      sucursal,
      tipoEntrega,
      fechaEntrega,
      horaEntrega,
      estadoEntrega: 'pendiente',
      // Sólo si es Fletera, incluyo estos
      ...(tipoEntrega === 'Fletera' && {
        fletera,
        numeroGuia,
        linkSeguimiento,
      }),
    };

    onAgregarEntrega(nuevaEntrega);

    // Reseteo
    setNumeroFactura('');
    setNombreCliente('');
    setMonto('');
    setSucursal('');
    setTipoEntrega('Local');
    setFechaEntrega('');
    setHoraEntrega('');
    setFletera('');
    setNumeroGuia('');
    setLinkSeguimiento('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      {/* Fila 1 */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Factura #"
          value={numeroFactura}
          onChange={e => setNumeroFactura(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Cliente"
          value={nombreCliente}
          onChange={e => setNombreCliente(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="number"
          placeholder="Monto $"
          value={monto}
          onChange={e => setMonto(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {/* Fila 2 */}
      <div className="grid grid-cols-3 gap-4">
        <select
          value={sucursal}
          onChange={e => setSucursal(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">— Sucursal —</option>
          <option value="CDMX">CDMX</option>
          <option value="Monterrey">Monterrey</option>
          <option value="Guadalajara">Guadalajara</option>
        </select>
        <select
          value={tipoEntrega}
          onChange={e => setTipoEntrega(e.target.value)}
          className="border rounded p-2"
        >
          <option value="Local">Local</option>
          <option value="Foránea">Foránea</option>
          <option value="Fletera">Fletera</option>
        </select>
        <input
          type="date"
          value={fechaEntrega}
          onChange={e => setFechaEntrega(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {/* Campos extra para Fletera */}
      {tipoEntrega === 'Fletera' && (
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre de fletera"
            value={fletera}
            onChange={e => setFletera(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Número de guía"
            value={numeroGuia}
            onChange={e => setNumeroGuia(e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="url"
            placeholder="Link de seguimiento"
            value={linkSeguimiento}
            onChange={e => setLinkSeguimiento(e.target.value)}
            className="border rounded p-2"
          />
        </div>
      )}

      {/* Fila 3 */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="time"
          value={horaEntrega}
          onChange={e => setHoraEntrega(e.target.value)}
          className="border rounded p-2"
        />
        {/* Ocupamos dos columnas vacías para conservar el layout */}
        <div />
        <div />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Registrar Entrega
      </button>
    </form>
  );
}