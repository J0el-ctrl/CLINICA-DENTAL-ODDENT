import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {db} from '../firebase'
import moment from 'moment'
import 'moment/locale/es'
import './FontUI.css'

const HistoPagoAfiliados = () => {
    const [getdatahistopagoafili, setGetdatahistopagoafili] = useState([])

    const GetDatos =async()=>{
        try {
            
            const data= await db.collection('pagoafiliadoshistorial').orderBy('fecha','desc').get()
            const arrayData=  data.docs.map(doc=>({id:doc.id,...doc.data()}))
            setGetdatahistopagoafili(arrayData)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      GetDatos();
    }, [])

    const eliminar =async(id)=>{
        try {
            
            await db.collection('pagoafiliadoshistorial').doc(id).delete()
            //este resive del hook, filtra cuando el item.id sea distinto al id que nosotros
            //estamos pasando como parametro
            const arrayFiltrado=getdatahistopagoafili.filter(item=>item.id!==id)
            setGetdatahistopagoafili(arrayFiltrado)
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
                    <h2 className="text-center text-cuerpo">Historial de Pagos </h2>
                    <ul className="list-group">
                        <div className="py-5 ">
                        <input
                                className="form-control"
                                 type="text"
                                placeholder="Buscar DNI"
                                onChange={(event)=>{
                                    setBuscaNombre(event.target.value);
                                }}
                        />
                        </div>
                       
                       
                    
                        {
                            getdatahistopagoafili.filter((item)=>{
                                if(buscaNombre===""){
                                    return item
                                }else if(item.dni.toLowerCase().includes(buscaNombre.toLowerCase())){
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
                                            <th className="text-dark">APELLIDOS</th>
                                            <th className="text-dark">EMAIL</th>
                                            <th className="text-dark">SERVICIO</th>
                                            <th className="text-dark">TELEFONO</th>
                                            <th className="text-dark">OBSERVACIONES</th>
                                            <th className="text-dark">FECHA</th>
                                            <th className="text-dark">DNI</th>
                                            <th className="text-dark">COSTO</th>
                                            </tr>
                                           
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-info">{item.nombre}</td>
                                                <td className="table-info ">{item.apellidos}</td>
                                                <td className="table-info">{item.email}</td>
                                                <td className="table-info">{item.servicio}</td>
                                                <td className="table-info">{item.telefono}</td>
                                                <td className="table-info">{item.mensaje}</td>
                                                <td className="table-info">{moment(item.fecha).format('LLL')}</td>
                                                <td className="table-info">{item.dni}</td>
                                                <td className="table-info">{item.costo}</td>
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

export default HistoPagoAfiliados
