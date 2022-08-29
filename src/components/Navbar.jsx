
import React from 'react'
import {UsuarioContext} from './roles/context/UsuarioProvider'

import logoobdent from '../img/logo_ob_web.png'

import{
    NavLink
} from "react-router-dom"
 import './Navbar.css'

const Navbar = () => {

    //esto viene del usuario provider sus valores para ser usados aqui o diferentes sitios
     
    const {usuario,cerrarSesion} = React.useContext(UsuarioContext)    
    // const {usuario,iniciarSesion,cerrarSesion} = React.useContext(UsuarioContext)    


    return (

    

        <nav className="navbar navbar-expand-md bg-info">
            <div className="container">

            <NavLink className="nav-link-css" to="/">
                <img src={logoobdent} alt="logo" />
            </NavLink>  
            
               
                      
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggleMobileMenu" aria-controls="toggleMobileMenu" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-th"></i>
        </button>

        <div className="collapse navbar-collapse" id="toggleMobileMenu">
            <ul className="navbar-nav ms-auto text-center">
                <li>
                <NavLink className="nav-link-css" to="/">Home</NavLink>
                </li>
                <li>
                <NavLink className="nav-link-css" to="/publicaciones">Publicaciones</NavLink>
                </li>

                <li>
                <NavLink className="nav-link-css" to="/contactanos">contactanos</NavLink>
                </li>
                <li>
                <NavLink className="nav-link-css" to="/servicios">servicios</NavLink>
                </li>
                <li>
                <NavLink className="nav-link-css" to="/staf">staf</NavLink>
                </li>
                {/* <li>
                <NavLink className="nav-link-css" to="/login">login</NavLink>
                </li> */}
                <li>
                    {
                        usuario.rol==='admin' &&  <NavLink className="nav-link-css" to="/administrador">Administrador</NavLink>
                    }
                    {
                        usuario.rol==='doctor' &&  <NavLink className="nav-link-css" to="/administrador">Administrador</NavLink>
                    }
                    {
                        usuario.rol==='tecnico' &&  <NavLink className="nav-link-css" to="/administrador">Administrador</NavLink>
                    }

                </li>
                {
                    usuario.email?(
                        <li>
                            <button className="btn btn-danger" onClick={cerrarSesion}>Logout</button>
                         </li>
                    ):(
                        // <li>
                            
                        //     <button className="btn btn-primary" onClick={iniciarSesion}>
                        //         login
                        //          </button>
                        //  </li>
                        null
                        
                    )
                }

               
                

               
            </ul>

        </div>
        </div>
        </nav>
    


    )
}

export default Navbar
