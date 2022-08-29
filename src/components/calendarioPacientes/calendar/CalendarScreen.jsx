//paso 1
//en esta vista es donde se va estar trabajando

import React, { useEffect, useState } from 'react'

//estilos para el calendario
import 'react-big-calendar/lib/css/react-big-calendar.css';
//resuelve el bug en la documentacion
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es';

import '../stylesCalendar.css'
//para traducir los encabezados del rbc
import { messages } from '../helpers/calendar-messages-es';
import {CalendarEvent} from './CalendarEvent';
import CalendarModal from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../redux/actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../redux/actions/events';
import AddNewFab from './AddNewFab';
import DeleteEventFab from './DeleteEventFab';


moment.locale('es');

const localizer =momentLocalizer(moment);


    //los eventos que se envian al bigcalendar y se guardar en el events fuera de los objetos
    //esto es llamdo en el calendarEvent para que pueda ser mostrado
  


const CalendarScreen = () => {

    //para disparar el abrir modal se va al doble click para abrirse
    const dispatch = useDispatch()

    //para mostrar los datos en el calendario
    //los {events son enviados abajo en el calendar luego se muestra}
    const {events,activeEvent} = useSelector(state => state.calendar);

        //nos permite manejar en que parte del rbc nos encontramos
        const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick=(e)=>{
        // console.log(e);
        dispatch(uiOpenModal());
    }


    const onSelectEvent=(e)=>{
        // console.log(e);
        dispatch(eventSetActive(e));
        // dispatch(uiOpenModal());


    }


    useEffect((events) => {
        
        dispatch( eventStartLoading(events) );

    }, [ dispatch ])


    const onViewChange=(e)=>{
        setLastView(e);
        localStorage.setItem('lastView',e);
    }
    
    const onSelectSlot=(e)=>{
        dispatch(eventClearActiveEvent());
    }

    //como desea ver el rbc y hacer el tratamiento en ello
    const eventStyleGetter=(event,start,end,isSelected)=>{
        // console.log(event,start,end,isSelected);
        const style={
            backgroundColor:'#367CF7',
            borderRadius:'0px',
            opacity:'0.8',
            display:'block',
            color:'white'
        }

        return {
            style
        }

    }


    return (
        <div className="calendar-screen">
            <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            //para que borre el boton en los slot de fechas
            onSelectSlot={onSelectSlot}
            selectable={true}

            //para traducir los encabezados messages
             messages={messages}
             //esto nos permite mostrar como queremos ver el rbc y hacer el tratamiento con ello
             eventPropGetter={eventStyleGetter}
             //se ejecutara cuando  se haga doble click
             onDoubleClickEvent={onDoubleClick}
             onSelectEvent={onSelectEvent}
             //esto nos permite ver donde estamos en que parte de pantalla de rbc
             onView={onViewChange}
            //no muestra la vista que va a tener cuando se recarga la pagina llama del useState
            view={lastView}
            components={{
                //esto jala de calendar event donde se hace el tratamiento sobre que va a mostrar en el calendario 
                event: CalendarEvent
            }}
            />
            <AddNewFab/>
            {
                (activeEvent) && <DeleteEventFab/>
            }
            
            <CalendarModal/>
            
        </div>
    )
}

export default CalendarScreen
