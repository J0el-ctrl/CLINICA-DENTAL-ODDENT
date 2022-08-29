import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {db} from '../firebase';
import {Link} from 'react-router-dom'
// import moment from 'moment'
import 'moment/locale/es'

import GestionAfiliacionOBdentPeru from './GestionAfiliacionOBdentPeru';
import PrepareEventsFechaAfiliados from '../helpersNavbarUI/PrepareEventsFechaAfiliados';
// import GestionAfiliacionOBdentPeru from './GestionAfiliacionOBdentPeru';




const AfiliadosOBdentPeru = () => {

    const [contactanos, setContactanos] = useState([])
    const [currentId, setCurrentId] = useState("");
    //para editar
    //  const [currentId, setCurrentId] = useState('')



    const getLinks = async () => {
        db.collection("afiliados").onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          const prepare= PrepareEventsFechaAfiliados(docs)

          setContactanos(prepare);
        });
      };


      useEffect(() => {
        getLinks()
      }, [])

    const eliminar =async(id)=>{
        try {
            
            await db.collection('afiliados').doc(id).delete()
            //este resive del hook, filtra cuando el item.id sea distinto al id que nosotros
            //estamos pasando como parametro
            const arrayFiltrado=contactanos.filter(item=>item.id!==id)
            setContactanos(arrayFiltrado)
        } catch (error) {
            console.log(error);
        }

    }


    const [buscaNombre, setBuscaNombre] = useState("")

 const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("afiliados").doc().set(linkObject);
        Swal.fire('Bienvenido','Nuevo Afiliado a OBDENT PERU','success')
    } else {
        await db.collection("afiliados").doc(currentId).update(linkObject);
        Swal.fire('Actualizado','Sus datos han sido actualizados','success')
        
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };




    return (
        <div>
        {/* <div className="mt-2"><GestionAfiliacionOBdentPeru {...{ addOrEditLink, currentId, contactanos }} /></div> */}
        <div><GestionAfiliacionOBdentPeru {...{ addOrEditLink, currentId, contactanos }} /></div>
    <div className="container mt-5 bg-info">
        
        
 <div className="container py-5">
 <h2 className="text-cuerpo text-center"> Buscar Afiliado </h2>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12 col-xxl-12">
                    <ul className="list-group">
                        <div className="py-5 ">
                            <input
                                className="form-control"
                                 type="text"
                                placeholder="INGRESE DNI DE AFILIADO"
                                onChange={(event)=>{
                                    setBuscaNombre(event.target.value);
                                }}
                        />
                        </div>
                       
                    
                        {
                            contactanos.filter((item)=>{
                                if(buscaNombre===""){
                                    return item
                                }else if(item.dni.toLowerCase().includes(buscaNombre.toLowerCase())){
                                    return item
                                }
                                return ""
                                //abajo de este .map debe is contactos solo para listarse 
                            }).map(item=>(
                                <li className="list-group-item " key={item.id}>
                                    <div className="">
                                        <table className="table ">
                                        <thead>
                                            <tr>
                                            <th scope="col">NOMBRE</th>
                                            <th scope="col">APELLIDOS</th>
                                            <th scope="col">EMAIL</th>
                                            <th scope="col">TELEFONO</th>
                                            <th scope="col">DNI</th>
                                            <th scope="col">FECHA INICIAL</th>
                                            <th scope="col">FECHA FINAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="table-info">{item.nombre}</td>
                                                <td className="table-info ">{item.apellidos}</td>
                                                <td className="table-info">{item.email}</td>
                                                <td className="table-info">{item.telefono}</td>
                                                <td className="table-info bg-primary text-light">{item.dni}</td>
                                                <td className="table-info bg-success text-light">{item.start}</td>
                                                <td className="table-info bg-danger text-light">{item.end}</td>
                                                  <td>
                                                <button 
                                                
                                    onClick={()=>eliminar(item.id)}
                                    className="btn btn-danger text-white mt-2  float-end ">
                                     Eliminar
                                        
                                        </button></td>
                                        <td>
                                                <button 
                                                
                                    onClick={()=>setCurrentId(item.id)}
                                    className="btn btn-warning text-white mt-2  float-end ">
                                     Editar
                                        
                                        </button> </td> 
                                        <td>
                                        <Link className="btn btn-success mt-2 text-white" to="/pagos">Gestionar Pagos</Link> </td>  
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
    </div>
    )
}

export default AfiliadosOBdentPeru
