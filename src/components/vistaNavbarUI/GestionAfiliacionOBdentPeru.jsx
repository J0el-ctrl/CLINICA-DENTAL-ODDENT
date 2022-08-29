import React, { useEffect, useState } from 'react'

// import {withRouter} from 'react-router-dom'
import moment from 'moment'
import './FontUI.css'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import {db} from '../firebase'
// import AfiliadosOBdentPeru from './AfiliadosOBdentPeru';



const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1,'years');

const initEvent = {
    start: now.toDate(),
    end: nowPlus1.toDate(),
    nombre:'',
    apellidos:'',
    email:'',
    telefono:'',
    dni:''
}

const GestionAfiliacionOBdentPeru = (props) => {


    const [ dateStart, setDateStart ] = useState( now.toDate() );
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );    
    const [formValues, setFormValues] = useState( initEvent );

    const { start, end, nombre, apellidos,email,telefono,dni } = formValues;

    //
    
    //
    const getLinkById = async (id) => {
        const doc = await db.collection("afiliados").doc(id).get();
        setFormValues({ ...doc.data() });
      };

    useEffect(() => {
        if (props.currentId === "") {
          setFormValues({ ...initEvent });
        } else {
          getLinkById(props.currentId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.currentId]);

    // const getLinkById = async (id) => {
    //     const doc = await db.collection("afiliados").doc(id).get();
    //     setFormValues({ ...doc.data() });
    //   };
    // useEffect(() => {
    //    getLinkById(props.currentId)
    // }, [props.currentId])
    



    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        })
    }
    
    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        
        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if ( nombre.trim().length < 2 ) {
            return Swal.fire('Error','Debe ingresar un nombre', 'error');
        }
        if ( apellidos.trim().length < 2 ) {
            return Swal.fire('Error','Debe ingresar un apellidos', 'error');
        }
        if ( email.trim().length < 2 ) {
            return Swal.fire('Error','Debe ingresar un email', 'error');
        }
        if ( telefono.trim().length < 2 ) {
            return Swal.fire('Error','Debe ingresar un telefono', 'error');
        }
        if ( dni.trim().length < 2 ) {
            return Swal.fire('Error','Debe ingresar numero de DNI', 'error');
        }

        props.addOrEditLink(formValues);
        
        
        //    Swal.fire('Bienvenido','Nuevo afiliado a OBDENT PERU','success')

      setFormValues({...initEvent});
    // props.history.push('/')
      
        
    }


    return (
        <div>
        <div className="container mt-2 text-cuerpo text-center"><h2>Gestion de Afiliados</h2></div>
        
        <div className="d-block w-100 bg-info">
            <div className="container">
            <form 
             onSubmit={handleSubmitForm} 
            className="text-center py-5">


                <div className="row py-2">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <label> Fecha de Inicio de Afiliacion</label>
                        <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label>Vencimiento de Afiliacion</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd } 
                        minDate={ dateStart }
                        className="form-control"
                    />
                    </div>
                </div>


{/* //////// */}
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                         onChange={handleInputChange}
                         value={nombre}
                         name="nombre"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Nombre"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={handleInputChange}
                        value={apellidos}
                        type="text"
                        name="apellidos"
                        className="form-control mb-2"
                        placeholder="Apellidos"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={handleInputChange}
                        value={email}
                        type="email"
                        name="email"
                        className="form-control mb-2"
                        placeholder="Email"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={handleInputChange}
                        value={telefono}
                        type="text"
                        name="telefono"
                        className="form-control mb-2"
                        placeholder="Telefono"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                         onChange={handleInputChange}
                         value={dni}
                        type="text"
                        name="dni"
                        className="form-control mb-2"
                        placeholder="DNI"/>
                    </div>
                   
                </div>



                <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Afiliar" : "Actualizar"}
      </button>

              </form>
             </div>
             </div>
             
             
        {/* <AfiliadosOBdentPeru/> */}
             
        </div>
    )
}

// export default withRouter(GestionAfiliacionOBdentPeru) para redireccionar con routerdom
export default GestionAfiliacionOBdentPeru
