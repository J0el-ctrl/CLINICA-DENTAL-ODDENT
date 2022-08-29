import React, { useState } from 'react'
import {db} from '../firebase'
import imgtelefono from '../../img/imgtelefono.png'
import imgmovil from '../../img/imgcelular.png'
import MapasGoogle from './MapasGoogle'
import './FontUI.css'

const Contactanos = (props) => {

    const [contactoNombre, setContactoNombre] = useState('')
    const [contactoApellido, setContactoApellido] = useState('')
    const [contactoEmail, setContactoEmail] = useState('')
    const [contactoTelefono, setContactoTelefono] = useState('')
    const [contactoMensaje, setContactoMensaje] = useState('')

    const agregar= async(e)=>{
        e.preventDefault()

        try {

            
            const nuevo={
                nombre:contactoNombre,
                apellido:contactoApellido,
                email:contactoEmail,
                telefono:contactoTelefono,
                mensaje:contactoMensaje,
                fecha:Date.now()
            }
            await db.collection('contactanos').add(nuevo)

            setContactoNombre('')
            setContactoApellido('')
            setContactoEmail('')
            setContactoTelefono('')
            setContactoMensaje('')
            
            props.history.push('/')
        } catch (error) {
            console.log(error);
        }

    }

    const numeroTelefono=('(01)6054101')
    const numeroCelular=('982562304 - 982528676 ')
    return (
        <div>
              <div>
            <div className="container">
                <div className="row py-5">
                    <div className="text-center  col mb-5 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 display-4 fst-italic">
                        <h2>FORMULARIO DE CONTACTO</h2>
                        <p>Nuestra especilidad : Su sonrisa</p>
                        </div>
                </div>
               
                <div className="row py-3 text-center">
                   
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 "><img src={imgtelefono} alt="" className="rounded mx-auto d-block"/><br/><h2 className="text-cuerpo">{numeroTelefono}</h2>
                    
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 "><img src={imgmovil} alt="" className="rounded mx-auto d-block"/><br /><h2 className="text-cuerpo">{numeroCelular}</h2>
                    
                    </div>                    
                </div>
           </div>
           </div>
            

           <div className="d-block w-100 bg-info">
            <div className="container">
            <form onSubmit={agregar} className="text-center py-5">
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                        onChange={e=>setContactoNombre(e.target.value)}
                        value={contactoNombre}
                        type="text"
                        className="form-control mb-2"
                        placeholder="Nombre"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setContactoApellido(e.target.value)}
                        value={contactoApellido}
                        type="text"
                        className="form-control mb-2"
                        placeholder="Apellidos"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setContactoEmail(e.target.value)}
                        value={contactoEmail}
                        type="email"
                        className="form-control mb-2"
                        placeholder="Email"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setContactoTelefono(e.target.value)}
                        value={contactoTelefono}
                        type="text"
                        className="form-control mb-2"
                        placeholder="Telefono"/>
                    </div>
                </div>
                <textarea  
                        onChange={e=>setContactoMensaje(e.target.value)}
                        value={contactoMensaje}
                        type="text"
                        className="form-control mb-2 w-100"
                        placeholder="Mensaje"  ></textarea>
            <button 
            type="submit"
            className="btn btn-secondary w-100">Enviar</button>

              </form>
             </div>
             </div>

             <div className="container py-5">
             
             <div className="row">
                 <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                     <p className="text-center"><h2 className="text-titulo">UBICANOS</h2></p>
                     <br /><br />
                     <h2><i className="fas fa-home"></i></h2> 
                     <p className="text-cuerpo fs-5">  Prolg. AV. Pacasmayo Mz A Lote 02 - Residencial las vegas - SMP
                    
                    </p> 

                    <h2><i className="fas fa-home"></i></h2> 
                     <p className="text-cuerpo fs-5">  Av. Cesar Vallejo Mz B Lote 15 - El Agustino
                         
                    </p> 
                    
                   
        
                  
                 </div>
                 <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                 <MapasGoogle/>
                </div>
             </div>
             </div>


        </div>
    )
}

export default Contactanos
