import React from 'react'
import fcbicon  from '../../img/fcb-icon.png'
const BtnFacebook = () => {

   

    const enlace =`https://www.facebook.com/obdentperu`
    return (
        <div className="container-boton-fcb">
        <a href={enlace} target="_blank" rel="noopener noreferrer">
      <img className="boton-fcb" src={fcbicon} alt=""/>
  </a>
      
  </div>
    )
}

export default BtnFacebook
