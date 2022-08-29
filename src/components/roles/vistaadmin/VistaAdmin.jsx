
import React, { useEffect, useState } from 'react'
import {db,functions} from '../../firebase'



const VistaAdmin = () => {

    const [usuarios, setUsuarios] = useState([])
    
    useEffect(() => {
       fetchUsuarios()
    }, [])

    const fetchUsuarios=async()=>{
        try {
                const res= await db.collection('usuarios').get()
                const arrayUsuarios= res.docs.map(doc=>doc.data())
                setUsuarios(arrayUsuarios)

        } catch (error) {
            console.log(error);

        }
    }

                //este =(email) se recibe del boton
    const administrador=(email)=>{
        if(!email.trim()){
            return console.log('email vacio');
        }
        const agregarRol=functions.httpsCallable('agregarAdministrador')
        //primer email: debe ser igual al backend email del data.email del backend
        // segundo emaik: es el valor que se pasa con la accion del boton onclick
        agregarRol({email:email})
        .then(res=>{
            console.log(res);
            //esto se muestra en el clg de objet data.error
            if(res.data.error){
                console.log('no tiene los permisos');
                return
            }
            //si tiene los permisos va a actualizar el rol
            db.collection('usuarios').doc(email).update({rol:'admin'})
            .then(user=>{
                console.log('usuario modificado rol administrador');
                //el fetch nos actualiza en el state para actualizar ejecutar
                fetchUsuarios()
            })


        })
    }


    const eliminarAdministrador=email=>{
        const agregarRol=functions.httpsCallable('eliminarAdministrador')
        agregarRol({email:email})
        .then(res=>{
            console.log(res)
            if(res.data.error){
                console.log('no tiene los permisos')
                return
            }
            db.collection('usuarios').doc(email).update({rol:'invitado'})
            .then(user=>{
                console.log('usuario modificado a invitado')
                fetchUsuarios()
            })
        })
    }

    const crearDoctor=email=>{
        const agregarRol=functions.httpsCallable('crearDoctor')
        agregarRol({email:email})
        .then(res=>{
            console.log(res)
            if(res.data.error){
                console.log('no tiene permisos')
                return
            }
            db.collection('usuarios').doc(email).update({rol:'doctor'})
            .then(user=>{
                console.log('usuario modificado rol doctor')
                fetchUsuarios()
            })
        })
    }

    const eliminarDoctor=email=>{
        const agregarRol=functions.httpsCallable('eliminarDoctor')
        agregarRol({email:email})
        .then(res=>{
            console.log(res)
            if(res.data.error){
                console.log('no tiene los permisos')
                return
            }
            db.collection('usuarios').doc(email).update({rol:'invitado'})
            .then(user=>{
                console.log('usuario modificado a invitado')
                fetchUsuarios()
            })
        })
    }
    const crearTecnico=email=>{
        const agregarRol=functions.httpsCallable('crearTecnico')
        agregarRol({email:email})
        .then(res=>{
            console.log(res)
            if(res.data.error){
                console.log('no tiene permisos')
                return
            }
            db.collection('usuarios').doc(email).update({rol:'tecnico'})
            .then(user=>{
                console.log('usuario modificado rol tecnico')
                fetchUsuarios()
            })
        })
    }



    return (
        <div className="container bg-info">
            <h2 className="text-center">Administracion de Usuarios</h2>
            {
                usuarios.map(usuario=>(
                    <div key={usuario.uid} className="text-center mb-2">
                        {usuario.email}  - {usuario.rol}

                        {
                            usuario.rol==="admin"?(
                                <button 
                        //aqui se envia el email que se desea transformar a admin
                        onClick={()=>eliminarAdministrador(usuario.email)}
                        className="btn btn-danger mx-2">
                            Eliminar Administrador</button>
                            ):(
                                <div>
                                <button 
                                //aqui se envia el email que se desea transformar a admin
                                onClick={()=>administrador(usuario.email)}
                                className="btn btn-danger mx-2">
                                    Administrador</button>
                                     <button 
                                     //aqui se envia el email que se desea transformar a doctor
                                     onClick={()=>crearDoctor(usuario.email)}
                                     className="btn btn-success mx-2 ">
                                         Doctor</button>
                                     <button 
                                     //aqui se envia el email que se desea transformar a doctor
                                     onClick={()=>crearTecnico(usuario.email)}
                                     className="btn btn-success mx-2 ">
                                         Tecnico</button>
                                     <button 
                                     //aqui se envia el email que se desea transformar a doctor
                                     onClick={()=>eliminarDoctor(usuario.email)}
                                     className="btn btn-danger mx-2 ">
                                         invitado</button>
                                         </div>
                            )
                        }
                     
                        

                        {/* <button 
                        //aqui se envia el email que se desea transformar a doctor
                        onClick={()=>crearDoctor(usuario.email)}
                        className="btn btn-success mx-2 ">
                            Doctor</button>
                        <button 
                        //aqui se envia el email que se desea transformar a doctor
                        onClick={()=>crearTecnico(usuario.email)}
                        className="btn btn-success mx-2 ">
                            Tecnico</button>
                        <button 
                        //aqui se envia el email que se desea transformar a doctor
                        onClick={()=>eliminarDoctor(usuario.email)}
                        className="btn btn-danger mx-2 ">
                            invitado</button> */}
                    </div>
                ))
            }
        </div>
    )
}

export default VistaAdmin

