import React from 'react'
import { CSVLink } from 'react-csv'

export default function ExportButton({ entregas = [] }) {
  // Si nunca recibes entregas, entregas === []
  // Filtra sólo las entregas que quieras exportar. Ajusta la condición a tu caso.
  const entregasFiltradas = entregas.filter(e => e.facturas?.length > 0)

  // Define aquí tus cabeceras según tu modelo de datos
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Cliente', key: 'clienteNombre' },
    { label: 'Fecha', key: 'fechaEntrega' },
    // … añade más columnas si las necesitas
  ]

  return (
    <CSVLink
      data={entregasFiltradas}
      headers={headers}
      filename="entregas.csv"
      className="btn btn-primary"
    >
      Exportar entregas
    </CSVLink>
  )
}