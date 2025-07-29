// src/components/DetailsPanel.jsx
export default function DetailsPanel({ entrega, onClose, onDelete, onChangeStatus }) {
  return (
    <div className="panel bg-white p-6 rounded shadow fixed right-0 top-0 h-full w-80">
      <h2 className="text-xl font-bold mb-4">Detalle de entrega</h2>
      <p><strong>Factura:</strong> {entrega.numeroFactura}</p>
      <p><strong>Cliente:</strong> {entrega.nombreCliente}</p>
      <p><strong>Tipo:</strong> {entrega.tipoEntrega}</p>
      <p><strong>Estado:</strong> {entrega.estadoEntrega}</p>

      {entrega.tipoEntrega === 'Fletera' && (
        <>
          <p><strong>Fletera:</strong> {entrega.fletera}</p>
          <p><strong>Guía:</strong> {entrega.numeroGuia}</p>
          <p>
            <strong>Seguimiento:</strong>{' '}
            <a
              href={entrega.linkSeguimiento}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Ver tracking
            </a>
          </p>
        </>
      )}

      <div className="mt-6 space-x-2">
        <button onClick={onChangeStatus} className="px-4 py-2 bg-yellow-400 rounded">
          Cambiar estatus
        </button>
        <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded">
          Eliminar
        </button>
        <button onClick={onClose} className="px-2 py-1 text-gray-500">
          X Cerrar
        </button>
      </div>
    </div>
  );
}