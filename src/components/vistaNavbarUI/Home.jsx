import React from 'react'
import Carrusel from '../helpersNavbarUI/Carrusel'
import BarraInferior from './BarraInferior'
// import BtnFacebook from './BtnFacebook'
import BtnWSP from './BtnWSP'
import './FontUI.css'

const Home = () => {
    return (
        <div>
            <Carrusel/>
            <div className="container">
                <div className="row">
                    <div className="text-center col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 display-4 fst-italic"><h2 className="py-5 text-titulo">Bienvenido a Odontologia OBDent</h2></div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"><h3 className="text-titulo">Nuestro objetivo: Su satisfacción y sonrisa</h3></div>
                </div>
                <div className="row py-3">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 "><h3 className="text-center text-titulo">Visión</h3>
                    <br /><br /><h4 className="text-center text-cuerpo">Somos un grupo de especialistas que brindamos un servicio integral en el cuidado y tratamiento de tu salud bucal a toda la población de lima norte y este, estamos comprometidos en satisfacer las necesidades que el paciente demanda.</h4>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"><h3 className="text-center text-titulo">Misión</h3>
                    <br /><br /><h4 className="text-center text-cuerpo">Ser la primera opción de los clientes que buscan el servicio integral de la salud bucal en toda lima norte y este, conformada por un equipo de expertos en los diferentes tratamientos que se requiera por parte de los pacientes y lograr la satisfacción de esta.</h4>
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 "><h3 className="text-center text-titulo">Valores</h3>
                    <br /><br /><h4 className="text-center text-cuerpo">Responsabilidad – Tolerancia – Compromiso – Respeto - Esfuerzo</h4>
                    </div> 
                    
                </div>

            </div>

        
            <div className="d-block w-100 bg-info">
             <div className="container   ">
                <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 py-5 "><h1 className="display-1 text-white text-center">¿Porqué debe elegir a Odontologia OBdent?</h1></div>
                </div>
            </div>
            <div className="container">
            <div className="row py-3">
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 ">
                    <h1 className="text-center"><i className="fas fa-user-tie"></i></h1><h3 className="text-center text-titulo">Profesionalismo</h3>
                    <br /><br /><h4 className="text-center text-cuerpo">Profesionales y Especialistas Calificados que cuidarán de tu salud bucal </h4>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 ">
                    <h1 className="text-center"><i className="fas fa-users"></i></h1><h3 className="text-center text-titulo">Experiencia</h3>
                    <br /><br /><h4 className="text-center text-cuerpo">Un grupo de profesionales especialistas con amplia experiencia en las diversas areas de su tratamiento.</h4>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 ">
                    <h1 className="text-center"><i className="far fa-clock"></i></h1>
                        <h3 className="text-center text-titulo">Horarios Sumamente Flexibles </h3>
                    <br /><h4 className="text-center text-cuerpo">Trabajamos de Lunes a Sábado de 9am a 8pm y también Domingos y feriado previa cita</h4>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 ">
                    <h1 className="text-center"><i className="fas fa-user-shield"></i></h1><h3 className="text-center text-titulo">Garantia de Servicio Integral</h3>
                    <br /><h4 className="text-center text-cuerpo">Nuestros pacientes respaldan nuestros servicios el cual es nuestra mejor carta de presentación.</h4>
                    </div>
                    
                    
                </div>
            </div>
        </div>
             
        <BarraInferior/>
        <BtnWSP/>
        {/* <BtnFacebook/> */}

        </div>
    )
}

export default Home
