 
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {db} from '../firebase'
import {auth} from '../firebase'
import './FontUI.css'

import {UsuarioContext} from '../roles/context/UsuarioProvider'
import PreparePublicacion from '../helpersNavbarUI/PreparePublicacion'
import BtnFacebook from './BtnFacebook'

const Publicaciones = () => {
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
    const [listaservicio, setListaservicio] = useState([])
    useEffect(() => {
        const obtenerDatos=async()=>{

            try {
                //const dba=app.firestore() todo esto jala del firebase js el 
                //app debe ser igual a lo que se exporta
                
                //aqui la respuesta se esta guardando en data
                const data= await db.collection('publicaciones').get()
                //{id:doc.id,...doc.data()} objetos que trae de la base de datos
                const arrayData=  data.docs.map(doc=>({id:doc.id,...doc.data()}))

                const prepare=PreparePublicacion(arrayData)
                // console.log(arrayData);
                setListaservicio(prepare)
                

            } catch (error) {
                console.log(error);
            }

        }

       obtenerDatos();
       console.log('test servicio');
    }, [])

    const elminar=async(id)=>{
        try {
             db.collection('publicaciones').doc(id).delete()
            const arrayFiltrado=listaservicio.filter(item=>item.id!==id)
            setListaservicio(arrayFiltrado)
        } catch (error) {
            console.log(error);
        }    
         }
    return (
    <div>
                <h2 className="text-center text-cuerpo  py-5">Nuestras Publicaciones </h2>
            <div className="container py-5">            
                     <div className="row justify-content-center">
            {                
                listaservicio.map(item=>(
                    <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xxl-4  py-3" key={item.id}>
                        <div className="card">
        <img src={item.url} className="card-img-top" alt="..."/>
        <div className="card-body text-center">
        <h5 className="card-title">{item.nombre}</h5>
        <p className="card-text bg-success text-light">{item.start}</p>
        <p className="card-text bg-danger text-light">{item.end}</p>
        <Link className="btn btn-info mt-3" to="/contactanos">Consulte Promocion</Link>                    
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
        </div>
        </div>
                    </div>
                ))
            }

            </div>
        </div>
        
        <BtnFacebook/>
        </div>
    )
}

export default Publicaciones
