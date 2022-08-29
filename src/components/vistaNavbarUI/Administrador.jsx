import React from 'react'
import {Link} from 'react-router-dom'
import VistaAdmin from '../roles/vistaadmin/VistaAdmin'

import {UsuarioContext} from '../roles/context/UsuarioProvider'

const Administrador = () => {

    const {usuario} = React.useContext(UsuarioContext)   
    return (
        <div>
            <div className="text-center">
            <h2>{usuario.email?usuario.email:null}</h2>
            <h2>{usuario.email?usuario.rol:null}</h2>

            </div>
            {
                usuario.rol==='admin'?(
                    <VistaAdmin/>
                ):(null)
            }

            {/* // */}

        <div className="container py-4">
            <div className="row mt-5">
                <div className="col-sm-4">
                    <div className="card">
                    <div className="card-body text-center">
                        <h5 className="card-title"><h2><i className="bi bi-chat-square-text"></i></h2></h5>
                        <p className="card-text">Gestionar mensajes de contacto</p>
                        <Link className="btn btn-info mt-3" to="/mensaje">Ver mensajes de Contacto</Link>
                    </div>
                    </div>
                </div>

             

                {
                    usuario.rol!=='admin'?(null):(
                        <div className="col-sm-4">
                    <div className="card">
                    <div className="card-body text-center">
                        <h2 className="card-title"><i className="bi bi-journals"></i></h2>
                        <p className="card-text">Gestionar servicios Odontologicos</p>
                        <Link className="btn btn-info mt-3" to="/crearservicios">Crear Servicios Odontologicos</Link>
                    </div>
                    </div>
                </div>
                    )
                }
                
            </div>
            <div className="row mt-3">
                <div className="col-sm-4">
                    <div className="card">
                    <div className="card-body text-center">
                        <h2 className="card-title"><i className="bi bi-person-check"></i></h2>
                        <p className="card-text">Gestion del sistema de afiliados</p>
                        <Link className="btn btn-info mt-3" to="/afiliacion">Gestionar Afiliacion de Pacientes</Link>
                    </div>
                    </div>
                </div>

                {
                    usuario.rol!=='admin'?(null):(<div className="col-sm-4">
                    <div className="card">
                    <div className="card-body text-center">
                        <h2 className="card-title"><i className="bi bi-shield-plus"></i></h2>
                        <p className="card-text">Gestionar a personal medico</p>
                        <Link className="btn btn-info mt-3" to="/createstaf">Crear Staf de Doctores</Link>
                    </div>
                    </div>
                </div>)
                }
                

                {
                    usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico'  ?(
                        <div className="col-sm-4">
                        <div className="card">
                        <div className="card-body text-center">
                            <h2 className="card-title"><i className="bi bi-calendar3"></i></h2>
                            <p className="card-text">Gestion de sistema de citas</p>
                            <Link className="btn btn-info mt-3" to="/calendario">Gestionar Calendario de Citas</Link>
                        </div>
                        </div>
                    </div>
                    ):(
                       null
                    )
                }
                
            </div>
             <div className="row mt-3">
                <div className="col-sm-4">
                    <div className="card">
                    <div className="card-body text-center">
                        <h2 className="card-title"><i className="bi bi-file-earmark-check"></i></h2>
                        <p className="card-text">Gestion de documentos Odontologicos </p>
                        <Link className="btn btn-info mt-3" to="/gestiondocumentos">Gestion de Documentos</Link>
                    </div>
                    </div>
                </div>

                {
                    usuario.rol==='admin' || usuario.rol==='doctor' ?(<div className="col-sm-4">
                    <div className="card">
                    <div className="card-body text-center">
                        <h2 className="card-title"><i className="bi bi-file-earmark-ppt"></i></h2>
                        <p className="card-text">Gestionar publicaciones</p>
                        <Link className="btn btn-info mt-3" to="/crearpublicaciones">Crear publicaciones</Link>
                    </div>
                    </div>
                </div>):(null)
                }
                

                {
                    usuario.rol==='admin' || usuario.rol==='doctor' || usuario.rol==='tecnico'  ?(
                        <div className="col-sm-4">
                        <div className="card">
                        <div className="card-body text-center">
                            <h2 className="card-title"><i class="bi bi-cash-coin"></i></h2>
                            <p className="card-text">Gestionar los pagos de los servicios brindados</p>
                            <Link className="btn btn-info mt-3" to="/pagos">Gestionar pagos</Link>
                        </div>
                        </div>
                    </div>
                    ):(
                       null
                    )
                }
                
            </div> 
        </div>
            

            
        </div>
    )
}

export default Administrador
