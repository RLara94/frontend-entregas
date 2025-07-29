// src/components/Calendario.jsx
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export default function Calendario({ entregas = [], onVerDetalle }) {
  const events = entregas.map((e, i) => {
    // Normalizamos nombres
    const numeroFactura  = e.numeroFactura ?? e.factura;
    const nombreCliente  = e.nombreCliente ?? e.clienteNombre ?? e.cliente;
    const tipoEntrega    = e.tipoEntrega;
    const estadoEntrega  = e.estadoEntrega ?? e.estado;

    return {
      id: String(i),
      title: `${numeroFactura} – ${nombreCliente}`,
      start: `${e.fechaEntrega}T${e.horaEntrega}`,
      backgroundColor:
        estadoEntrega === 'pendiente'     ? '#f87171' :
        estadoEntrega === 'en camino'     ? '#60a5fa' : 
                                           '#34d399',
      extendedProps: { numeroFactura, nombreCliente, tipoEntrega, estadoEntrega },
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left:  'prev,next today',
          center:'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}

        // Click abre detalles
        eventClick={info => onVerDetalle(info.event.extendedProps)}

        // Aquí montamos el tooltip
        eventDidMount={info => {
          const p = info.event.extendedProps;
          tippy(info.el, {
            content: `
              <div style="font-size:0.9rem; line-height:1.2">
                <div><strong>Factura:</strong> ${p.numeroFactura}</div>
                <div><strong>Cliente:</strong> ${p.nombreCliente}</div>
                <div><strong>Tipo:</strong> ${p.tipoEntrega}</div>
                <div><strong>Estado:</strong> ${p.estadoEntrega}</div>
              </div>
            `,
            allowHTML: true,
            arrow: true,
            placement: 'top',
          });
        }}
      />
    </div>
  );
}