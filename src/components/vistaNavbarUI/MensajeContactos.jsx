import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {db} from '../firebase'
import moment from 'moment'
import 'moment/locale/es'
import './FontUI.css'

const MensajeContactos = () => {
    const [contactanos, setContactanos] = useState([])

    useEffect(() => {
        const obtenerDatos=async()=>{

            try {
                //const dba=app.firestore() todo esto jala del firebase js el 
                //app debe ser igual a lo que se exporta
                
                //aqui la respuesta se esta guardando en data
                const data= await db.collection('contactanos').orderBy('fecha','desc').get()
                //{id:doc.id,...doc.data()} objetos que trae de la base de datos
                const arrayData=  data.docs.map(doc=>({id:doc.id,...doc.data()}))
                console.log(arrayData);
                setContactanos(arrayData)
                

            } catch (error) {
                console.log(error);
            }

        }

       obtenerDatos();
       console.log('test');
    }, [])


    const eliminar =async(id)=>{
        try {
            
            await db.collection('contactanos').doc(id).delete()
            //este resive del hook, filtra cuando el item.id sea distinto al id que nosotros
            //estamos pasando como parametro
            const arrayFiltrado=contactanos.filter(item=>item.id!==id)
            setContactanos(arrayFiltrado)
        } catch (error) {
            console.log(error);
        }

    }
    const [buscaNombre, setBuscaNombre] = useState("")


   


    return (
        <div>
        <div className="container py-5">
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12 col-xxl-12">
                    <h2 className="text-center text-cuerpo">Bandeja de Mensaje </h2>
                    <ul className="list-group">
                        <div className="py-5 ">
                        <input
                                className="form-control"
                                 type="text"
                                placeholder="Buscar Nombre"
                                onChange={(event)=>{
                                    setBuscaNombre(event.target.value);
                                }}
                        />
                        </div>
                       
                       
                    
                        {
                            contactanos.filter((item)=>{
                                if(buscaNombre===""){
                                    return item
                                }else if(item.nombre.toLowerCase().includes(buscaNombre.toLowerCase())){
                                    return item
                                }
                                return ""
                                //abajo de este .map debe is contactos solo para listarse 
                            }).map(item=>(
                                <li className="list-group-item" key={item.id}>
                                    <div className="table-responsive-md">
                                        <table className="table">
                                        <thead>
                                            <tr>
                                            <th className="text-dark">NOMBRE</th>
                                            <th className="text-dark">TELEFONO</th>
                                            <th className="text-dark">EMAIL</th>
                                            <th className="text-dark">MENSAJE</th>
                                            <th className="text-dark">Fecha</th>
                                            </tr>
                                           
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-info">{item.nombre}</td>
                                                <td className="table-info ">{item.telefono}</td>
                                                <td className="table-info">{item.email}</td>
                                                <td className="table-info">{item.mensaje}</td>
                                                <td className="table-info">{moment(item.fecha).format('LLL')}</td>
                                                <td>  <button 
                                                type="button"
                                    onClick={()=>eliminar(item.id)}
                                    className="btn btn-danger  float-end ">
                                     Eliminar
                                        
                                        </button></td>
                                            </tr>
                                            
                                        </tbody>
                                        </table>
                                      </div>
                                
                                </li>
                            ))
                        }
                    </ul>
                </div>
               
            </div>
            
        </div>
        </div>
    )
}

export default MensajeContactos
