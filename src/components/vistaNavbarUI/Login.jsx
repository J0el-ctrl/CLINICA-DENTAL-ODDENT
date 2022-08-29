import React from 'react'
import {UsuarioContext} from '../roles/context/UsuarioProvider'

const Login = () => {

     const {iniciarSesion,cerrarSesion} = React.useContext(UsuarioContext)  

    return (
        <div className="py-5">
             <div className="container bg-info text-center ">
            <p>Control de  Session</p>
           

                  <button className="btn btn-danger" onClick={cerrarSesion}>Logout</button>
                 <button className="btn btn-primary" onClick={iniciarSesion}>Login</button> 
                </div>
        </div>
    )
}

export default Login
