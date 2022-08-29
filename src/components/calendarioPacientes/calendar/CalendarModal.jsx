//paso 5 
//tiene la logica, determina si esta actualizando, crear nuevo etc
//el modal se envia a calendarScreen para mostarse 
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import moment from 'moment';
import Swal from 'sweetalert2'



import DateTimePicker from 'react-datetime-picker'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../redux/actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../redux/actions/events';

//este customStyles lo posiciona en el medio de la pantalla al modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };
  //esto nos permite vincular el modal al root del index de public carpeta
  Modal.setAppElement('#root');
  
  //esto va al value de la fecha inicial a la hora que es le adelanta una hora con todo cero
  const now=moment().minutes(0).seconds(0).add(1,'hours')
  //fecha final el clone permite clonal la hora inicial y le aumenta una hora mas
  const nowPlus1=now.clone().add(1,'hours');

  const initEvent={
    cita:'',
    detalle:'',
    start:now.toDate(),
    end:nowPlus1.toDate()
}



const CalendarModal = () => {

            //esto nos permite controlar el modal abierto o cerrado
        const {modalOpen} = useSelector(state => state.ui);
        const {activeEvent} = useSelector(state => state.calendar);

            //nos permite controlar el cierre del modal
        const dispatch = useDispatch()


        //este state nos permite gestionar el dateTimePicker Inicial
        const [dateStart, setDateStart] = useState(now.toDate())
        //este state nos permite gestionar el dateTimePicker final
        const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())


        //para capturar los valores del formulario
        //el initEvent esta fuera ya que cuando se vuelva a reconstruir estableca en blanco 
        const [formValues, setFormValues] = useState(initEvent)
        //para asignar en el value del form  en input
        const {cita,detalle,start,end}= formValues

    
        useEffect(() => {
            if ( activeEvent ) {
                setFormValues( activeEvent );
            } else {
                setFormValues( initEvent );
            }
        }, [activeEvent, setFormValues])



        //esto coje a los dos input textuales 
        const handleInputChange=({target})=>{
            setFormValues({
                ...formValues,
                //target.name es el name del input  igual el target.value es el valor del input en el form
                [target.name]:target.value
            })
        }
        


    const closeModal=()=>{

            dispatch(uiCloseModal());
            dispatch(eventClearActiveEvent());
            setFormValues(initEvent);
    }
        //nos permite gestionar la fecha inicial del date timepicker
    const handleStartDateChange=(e)=>{
        setDateStart(e);
        setFormValues({
            //trae todos los valores y solo modifica el start linea siguiente
            ...formValues,
            //captura el evento (e) del view para guardarle en el hook
            start:e
        })
    }
        //nos permite gestionar la fecha final del date timepicker
    const handleEndDateChange=(e)=>{
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end:e
        })
    }


    //para controlar el form con el onSubmit
    const handleSubmitForm=(e)=>{
        e.preventDefault();
        

        //validaciones para las fechas son sus instancias
        const momentStart = moment(start)
        //estos son jalados de formfalues destructurados
        const momentEnd = moment(end)
        //moment start es igual o esta despues de moment end debe decir error ya el start es el incial
        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error','La fecha final debe ser mayor a la fecha Inicial','error')
        }

        if(cita.trim().length<2){
            return Swal.fire('Error','Debe ingresar la consulta a realizar','error')
        }
        if(detalle.trim().length<2){
            return Swal.fire('Error','Debe ingresar una descripcion detallada','error')
        }
 

        if(activeEvent){
            dispatch( eventStartUpdate( formValues ) )
        }else{
            //grabacion 
            //grabacion en firestore ´paso 3
            dispatch( eventStartAddNew(formValues));
            // console.log(e);

        } 
        closeModal();

    }

    return (
        <Modal
        //trabaja con el useState su estado 
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        //onRequisclose nos permite manejar que se cierre el modal 
        onRequestClose={closeModal}
        //closetimeoutMS nos permite la animacion de destrucion del modal para el cierre
        closeTimeoutMS={200}
        style={customStyles}
        //el classname y overlay vienen del stylesCalendar modal para su diseño 
        className="modal"
        overlayClassName="modal-fondo"
      >

<h1 className="text-center"> {(activeEvent)?'Editar Cita':'Nueva Cita'}   </h1>
<hr />
<form 
        onSubmit={handleSubmitForm}
        className="container">

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker
        //onchange gestiona el setstart para que guarde la fecha inicial
        onChange={handleStartDateChange}
        //el valor del value viene de afuera en la const dateStart
        value={dateStart}
        className="form-control"
      />
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker
        onChange={handleEndDateChange}
        //esta validacion minDate gestiona la fecha inicial no debe ser mayor a la final
        minDate={dateStart}
        value={dateEnd}
        className="form-control"
      />
    </div>

    <hr />
    <div className="form-group">
        <label>Datos del Paciente</label>
        <input 
            type="text" 
            className="form-control"
            placeholder="Ingrese Nombre o DNI  "
            name="cita"
            autoComplete="off"
            value={cita}
            onChange={handleInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"  
            placeholder="Detalle razon de la consulta"
            rows="5"
            name="detalle"
            value={detalle}
            onChange={handleInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block w-100"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
          </Modal>
    )
}

export default CalendarModal
