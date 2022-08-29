/* eslint-disable */ 
import React, { useEffect, useState } from 'react'

 import {UsuarioContext} from '../roles/context/UsuarioProvider'

import {db} from '../firebase'
import {auth} from '../firebase'
import './FontUI.css'
// import { withRouter } from 'react-router-dom'

const Staf = () => {

     const {usuario} = React.useContext(UsuarioContext)   


    const [stafuser, setStafuser] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged(user=>{
            if(user){
                setStafuser(user)
            }else{
                setStafuser(null)
            }
        })
    }, [])

    //
    const [listastaf, setListastaf] = useState([])

    useEffect(() => {
        const obtenerDatos=async()=>{

            try {
                //const dba=app.firestore() todo esto jala del firebase js el 
                //app debe ser igual a lo que se exporta
                
                //aqui la respuesta se esta guardando en data
                const data= await db.collection('staf').get()
                //{id:doc.id,...doc.data()} objetos que trae de la base de datos
                const arrayData=  data.docs.map(doc=>({id:doc.id,...doc.data()}))
                console.log(arrayData);
                setListastaf(arrayData)
                

            } catch (error) {
                console.log(error);
            }

        }

       obtenerDatos();
       console.log('test staf');
    }, [])

    const elminar=async(id)=>{
        try {
             db.collection('staf').doc(id).delete()
            const arrayFiltrado=listastaf.filter(item=>item.id!==id)
            setListastaf(arrayFiltrado)
        } catch (error) {
            console.log(error);
        }    
         }



    return (
        <div>
            <h2 className="text-center text-cuerpo  py-5">Nuestro Staff de Profesionales </h2>
            <div className="container py-5">
                
                <div className="row justify-content-center">

                {
                    
                    listastaf.map(item=>(
                        <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xxl-4  py-3" key={item.id}>
                         <div className="card">
        <img src={item.imgstaf} className="card-img-top" alt="..."/>
        <div className="card-body text-center">
            <h5 className="card-title">{item.alias}</h5>
            <p className="card-text">{item.cop}</p>
            <button className="btn btn-info w-100" type="button" data-bs-toggle="modal" data-bs-target={`#`+(item.id)}>Conoce más
        </button>
                    

        
                        
        {
                usuario.rol !=='admin'?(
                    null
                ):(
                    <button 
                    className="btn btn-danger w-100 mt-3"
                    type="button"
                    onClick={()=>elminar(item.id)}
                    >Eliminar</button>
                )
            }
     
            
        <div className="modal fade " id={item.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

{/*  */}    <div className="container mt-3">
            <div className="justify-content-center">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{item.nombre}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <p>{item.descripcion}</p>
                
            <div className="row">
                <div className="col-12">
                    <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="row"> 2012</th>
                            <td>{item.logros}</td>
                        </tr>
                       
                        <tr>
                            <th scope="row"> 2012</th>
                            <td>Titulo de cirujano destista - UNFV</td>
                        </tr>
                        
                    </tbody>
                    </table>
                </div>
            </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                
            </div>
            </div>
        </div>
        </div>
        </div>

        {/*  */}
        </div>
        



        </div>
        </div>
                        </div>
                    ))
                }

                </div>
            </div>
           
  
        </div>
    )
}

export default Staf
