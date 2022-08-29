
import React, { useEffect, useState } from 'react'
import {auth,db,firebase} from '../../firebase'

 
export const UsuarioContext = React.createContext();

const UsuarioProvider = (props) => {
    const dataUsuarioInicial={
        email:null,uid:null,activo:null
    }
    const [usuario, setUsuario] = useState(dataUsuarioInicial)
    //iniciamos el usuario todo en null
   

    useEffect(() => {
       detectarUsuario()
    }, [])

    const detectarUsuario =()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                console.log(user)

                user.getIdTokenResult()
               .then(idTokenResult=>{
                   console.log(idTokenResult)
                   if(!!idTokenResult.claims.admin){
                       console.log('es administrador')
                       setUsuario({
                           email:user.email,
                           uid:user.uid,
                           activo:true,
                           rol:'admin'
                       })
                   }else if(!!idTokenResult.claims.doctor) {
                    console.log('es doctor')
                    setUsuario({
                        email:user.email,
                        uid:user.uid,
                        activo:true,
                        rol:'doctor'
                    })
                   }else if(!!idTokenResult.claims.tecnico){
                    console.log('es tecnico')
                    setUsuario({
                        email:user.email,
                        uid:user.uid,
                        activo:true,
                        rol:'tecnico'
                    })
                   }else{
                    console.log('es invitado')
                    setUsuario({
                        email:user.email,
                        uid:user.uid,
                        activo:true,
                        rol:'invitado'
                    })
                   }
               })

            }else{
                console.log(user);
                setUsuario({
                    email:null,
                    uid:null,
                    activo:false,
                    rol:null
                })
            }
        })
    }



    //el state recibe al usuario todo null inicial
    // const [usuario, setUsuario] = useState(dataUsuarioInicial)
 
    const iniciarSesion = async()=>{
        try {
            //crea el usuario, ademas si se registra por  primara ves le asigna el rol de tecnico
            //con el get() consulta si hay caso contrario con set crea 
            const provider= new firebase.auth.GoogleAuthProvider()
            const res =await auth.signInWithPopup(provider)

            const existe= await db.collection('usuarios').doc(res.user.email).get()

            if(!existe.exists){
                await db.collection('usuarios').doc(res.user.email).set({
                    uid:res.user.uid,
                    email:res.user.email,
                    rol:'invitado'
                })
            }


        } catch (error) {
            console.log(error);
        }
    }

    const cerrarSesion=()=>{
        auth.signOut()
    }


    return (
        //pasamos el usuario del state para que puedan ser trabajados con los children components

        <UsuarioContext.Provider value={{usuario,iniciarSesion,cerrarSesion}}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export default UsuarioProvider
