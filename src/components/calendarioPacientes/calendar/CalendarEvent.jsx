//paso 4
//este evento se ira a calendarScreen en <Calendar /> para que sea tratado ahi ademas aca se señala que se quiere mostar en el rbc del view
//sera el encargado de recibir toda la informacion del evento de calendarScren
import React from 'react'

//la destructuracion del event nos permite traer lo que se va a mostrar del calendar Screnn
export const CalendarEvent = ({ event }) => {

    const { cita, detalle } = event;

    return (
        <div>
            <strong> { cita } </strong>
            <span>- { detalle } </span>
        </div>
    )
}

