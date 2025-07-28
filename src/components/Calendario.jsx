// src/components/Calendario.jsx
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Tippy from "@tippyjs/react";

export default function Calendario({ entregas = [], onVerDetalle }) {
  const events = entregas.map((e, i) => ({
    id: String(i),
    title: `${e.numeroFactura} – ${e.nombreCliente}`,
    start: `${e.fechaEntrega}T${e.horaEntrega}`,
    extendedProps: e,
    backgroundColor:
      e.estadoEntrega === "en sucursal" ? "#f87171" :
      e.estadoEntrega === "en camino"  ? "#60a5fa" :
      "#34d399",
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      }}
      events={events}
      eventClick={info => onVerDetalle(info.event.extendedProps)}
      eventDidMount={info => {
        Tippy(info.el, {
          content: `
            <strong>Factura:</strong> ${info.event.extendedProps.numeroFactura}<br/>
            <strong>Cliente:</strong> ${info.event.extendedProps.nombreCliente}<br/>
            <strong>Estado:</strong> ${info.event.extendedProps.estadoEntrega}
          `,
          allowHTML: true,
        });
      }}
    />
  );
}