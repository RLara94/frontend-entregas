// src/components/Calendario.jsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Tippy from "@tippyjs/react";

export default function Calendario({ entregas = [], onVerDetalle }) {
  // Convertimos cada entrega en un evento de FullCalendar
  const events = entregas.map((e, i) => ({
    id: String(i),
    title: `${e.numeroFactura} – ${e.nombreCliente}`,
    start: `${e.fechaEntrega}T${e.horaEntrega}`,
    extendedProps: e,
    backgroundColor:
      e.estadoEntrega === "en sucursal"
        ? "#f87171"   // rojo
        : e.estadoEntrega === "en camino"
        ? "#60a5fa"   // azul
        : "#34d399",  // verde
  }));

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        // Al hacer clic en un evento, abrimos el panel de detalles
        eventClick={info => onVerDetalle(info.event.extendedProps)}
        // Tooltip con Tippy
        eventDidMount={info => {
          Tippy(info.el, {
            content: `
              <div style="font-size:0.9rem; line-height:1.2">
                <div><strong>Factura:</strong> ${info.event.extendedProps.numeroFactura}</div>
                <div><strong>Cliente:</strong> ${info.event.extendedProps.nombreCliente}</div>
                <div><strong>Tipo:</strong> ${info.event.extendedProps.tipoEntrega}</div>
                <div><strong>Estado:</strong> ${info.event.extendedProps.estadoEntrega}</div>
              </div>`,
            allowHTML: true,
            placement: "top",
          });
        }}
      />
    </div>
  );
}