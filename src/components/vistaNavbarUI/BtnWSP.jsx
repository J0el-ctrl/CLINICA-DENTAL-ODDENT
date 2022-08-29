import React from 'react'
import wspicon from '../../img/wsp-icon.png'

const BtnWSP = () => {
//     <div className="container-boton-wsp">
//     <a href="https://wa.me/+51982562304?text=Deseo%20más%20informacion" target="_blank" rel="noopener noreferrer">
//   <img className="boton-wsp" src={wspicon} alt=""/>
// </a>
  
// </div>
    const numero='+51982562304'
    const mensaje='Deseo mas Información doctor muelas'

    const enlace =`https://wa.me/${numero}?text=${mensaje}`


    

    // rel="noopener noreferrer
    return (

        <div className="container-boton-wsp">
              <a href={enlace} target="_blank" rel="noopener noreferrer">
            <img className="boton-wsp" src={wspicon} alt=""/>
        </a>
            
        </div>
      
    
        
    )
}

export default BtnWSP
