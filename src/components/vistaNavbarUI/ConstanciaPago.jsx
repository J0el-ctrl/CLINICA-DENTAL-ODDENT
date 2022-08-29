// import jsPDF from 'jspdf';
import React from 'react'
import logo from '../../img/logo_ob_web.png'
import './FontUI.css'

const ConstanciaPago = (props)=>  {

  

    return (
        <div>            
    <div id="content">
        <div className="container text-center  mt-4 ">
          <div className="container">
            <div className="row">
                <div className="col-12 col-sm-12 ">
                    <img src={logo} alt="odontologia" />
                </div>
            </div>
            <br /><br />
            <div className="row">
            <div className="col-12 col-sm-12 ">
                    <h4>"COMPROBANTE"</h4>
            </div>
            <div className="row">
                <div className="col-12 col-sm-12 ">
                    <p>RUC:77541984</p>

                </div>
            </div>
                    
            </div>
            <div className="row">
                <div className="col-12 col-sm-12 "><p>Calle Alfa. ref.cdra 41 Av.peru Callao</p></div>
                <hr />
            </div> <br />
           

          </div>
    <div className="container">
          <div className="row">
                <div className="col-6 col-sm-6">
                      <p>{`Cliente: ${props.nombre} ${props.apellido} `} </p>
                </div>
                <div className="col-6 col-sm-6">
                      <p>{`DNI: ${props.dni}`} </p>
                </div>
                
          </div>
          <div className="row">
                <div className="col-6 col-sm-6">
                      <p>{`Telefono: ${props.telefono}`} </p>
                </div>
                <div className="col-6 col-sm-6">
                      <p>{`Servicio: ${props.servicio}`}</p>
                </div>
                
          </div>

        
            
            <div className="row">
                <div className="col-6 col-sm-6">
                      <p>{`Costo:S/ ${props.costo}`}</p>
                </div> 
                <div className="col-6 col-sm-6">
                      <p>{`Mensaje:  ${props.mensaje}`}</p>
                </div>                
          </div>
            
          <hr />
    </div>
    {/* <ConstanciaPago nombre={nombree} apellido={apellidoss} costo={costo} telefono={telefono} mensaje={mensaje} servicio={capservicio} dni={capdni}/> 
         </div> */}
            
        </div>
        </div>
        </div>
    )
}

export default ConstanciaPago
