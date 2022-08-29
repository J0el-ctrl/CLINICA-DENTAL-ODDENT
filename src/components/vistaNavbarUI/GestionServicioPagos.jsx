/* eslint-disable */ 
import React, { useEffect, useState } from 'react';
import {db} from '../firebase'
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'
import jsPDF from 'jspdf';

import {UsuarioContext} from '../roles/context/UsuarioProvider'
 import ConstanciaPago from './ConstanciaPago';

const GestionServicioDePagos = () => {
  
    const {usuario} = React.useContext(UsuarioContext)  

    const [iddni, setIddni] = useState([])
    const [nombree, setNombree] = useState(iddni)
    const [apellidoss, setApellidos] = useState(iddni)
    const [email, setEmail] = useState(iddni)
    const [telefono, setTelefono] = useState(iddni)
    const [mensaje, setMensaje] = useState('')

    


    const obtenerAfiliadosDni=async()=>{
        const   data =await db.collection('afiliados').get()
        const arrayAfiliados=  data.docs.map(doc=>({id:doc.id,...doc.data()}))
        setIddni(arrayAfiliados)
    }



    const [idArticulos, setIdArticulos] = useState([])
    // const [servicios, setServicios] = useState(idArticulos)
    const [costo, setCosto] = useState(idArticulos)
    
    
    const obtenerDatos=async()=>{

             const   data =await db.collection('servicios').get()
             const arrayData=  data.docs.map(doc=>({id:doc.id,...doc.data()}))
             console.log(arrayData);
             setIdArticulos(arrayData)
             
     }


     useEffect(() => {       
        obtenerDatos();
        console.log('test select servicio');
     }, [])

     useEffect(() => {
         obtenerAfiliadosDni();
         console.log('text select dni para get datos afiliados');
    }, [])

     const handlerCargar=function(e){
         const opcion=e.target.value;
        //  console.log(idArticulos[opcion].costo);
         setCosto(idArticulos[opcion].costo);
        //  setServicios(opcion);
        setCapservicio(idArticulos[opcion].nombre)
     }

     const handleDniAfiliados=function(e){
         const dniafiliados=e.target.value;
         setNombree(iddni[dniafiliados].nombre) 
         setApellidos(iddni[dniafiliados].apellidos) 
         setEmail(iddni[dniafiliados].email) 
         setTelefono(iddni[dniafiliados].telefono) 
         setCapdni(iddni[dniafiliados].dni)
         
     }

     const [capdni, setCapdni] = useState('')
     const [capservicio, setCapservicio] = useState('')

    
    const agregar=async(e)=>{
        e.preventDefault()
        try {
            const nuevo={
                nombre:nombree,
                apellidos:apellidoss,
                email:email,
                telefono:telefono,
                dni:capdni,
                servicio:capservicio,
                costo:costo,
                fecha:Date.now(),
                mensaje:mensaje,
                
            }
            await db.collection('pagoafiliadoshistorial').add(nuevo)
            Swal.fire('PAGO GRABADO ','pago procesado exitoso','success')
            setNombree('')
            setApellidos('')
            setEmail('')
            setTelefono('')
            setCapdni('')
            setCapservicio('')
            setCosto('')
            setMensaje('')
        
        } catch (error) {
            console.log(error);
        }
    }

    // const PasarDatos ={
    //     telefono:{telefono},
    //     nombre:{nombree},
    //     apellidos:{apellidoss},
    //     email:{email},
    //     dni:{capdni},
    //     servicio:{capservicio},
    //     costo:{costo},
    //     obervaciones:{mensaje}

    // }


    const  generatePDF=()=>{
        var doc=new jsPDF("p","pt","a4");
        doc.html(document.querySelector("#content"),{
            callback:function(pdf){
                pdf.save("pago.pdf")
            }
        });
    };

   
    return (
        <div>
        <h2 className="text-center mt-2">Gestionar Pagos de Servicios  </h2>
    <div className="py-5">
        <div className="d-block w-100 bg-info">
        <div className="container">
        <form onSubmit={agregar} className="text-center py-5">
         
            <div className="row">
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label > TELEFONO  </label>
                <input 
                     onChange={e=>setTelefono(e.target.value)}
                     value={telefono}
                    type="text"
                    className="form-control mb-2"
                    placeholder="telefono "/>
                </div>
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label > APELLIDOS  </label>
                <input 
                    onChange={e=>setApellidos(e.target.value)}
                    value={apellidoss}
                    type="text"
                    className="form-control mb-2"
                    placeholder="apellidos"/>
                </div>
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label > EMAIL  </label>
                <input 
                    onChange={e=>setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="form-control mb-2"
                    placeholder="email"/>
                </div>
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label > NOMBRE  </label>
                <input 
                    onChange={e=>setNombree(e.target.value)}
                    value={nombree}
                    type="text"
                    className="form-control mb-2"
                    placeholder="nombre"/>
                </div>
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label > DNI  </label>
                <input 
                    onChange={e=>setCapdni(e.target.value)}
                    value={capdni}
                    type="text"
                    className="form-control mb-2"
                    placeholder="dni"/>
                </div>
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label > SERVICIO </label>
                <input 
                    onChange={e=>setCapservicio(e.target.value)}
                    value={capservicio}
                    type="text"
                    className="form-control mb-2"
                    placeholder="servicio"/>
                </div>




                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                
                    <label > BUSCAR DNI "AFILIADOS"  </label>
                <select   
                //  onChange={e=>setIddni(e.target.value)}
                //  value={capdni}
                className="form-control"  name="afiliados" id="selafiliados" onClick={handleDniAfiliados}>
                        
                   {
                    iddni.map((item,i)=>(                       
                    <option 

                    //  onChange={e=>setCapdni(e.target.value)}
                    //  value={capdni}
                    key={item.id+i} 
                    value={i}
                    
                                        >{item.dni} </option>
                                               ))
                   }
                </select>


                </div>


                <div className="form-group col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label > SELECCIONE  SU SERVICIO </label>
                    <select  
                 
                    className="form-control"  name="categorias" id="selCategorias" onClick={handlerCargar}>
                        
                   {
                    idArticulos.map((item,i)=>(                       
                    <option 
                    
                    key={item.id+i} 
                    value={i}
                    
                                        >{item.nombre} </option>
                                               ))
                   }
                   </select>
              
                </div>
                
                

            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-3">
                <input 
                    onChange={e=>setCosto(e.target.value)}
                     value={costo } 
                    type="text"
                    className="form-control mb-2"
                    placeholder="costo"/>
            </div>
            <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 mt-3">
            <textarea  
                        onChange={e=>setMensaje(e.target.value)}
                        value={mensaje}
                        type="text"
                        className="form-control mb-2 w-100"
                        placeholder="Observaciones"  ></textarea>
            </div>

            </div>
           <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
           <button 

        type="submit"
        className="form-control mb-2 btn btn-success">GRABAR PAGO</button>
           </div>
          
                   
            {
                usuario.rol==='admin' || usuario.rol==='doctor'?(
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
           <Link className="btn btn-primary mt-3 w-100" to="/histopagoafiliados">HISTORIAL DE PAGO  </Link>
           </div>
                ):(
                    null
                )
            }

           
       
                

          </form>
         
         </div>
         <div className="text-center">
           <button 

        onClick={generatePDF}
        className="mb-2 btn btn-secondary">GENERAR NOTA DE PAGO</button>
           </div>
         </div>
         </div>
         <div>

          <ConstanciaPago nombre={nombree} apellido={apellidoss} costo={costo} telefono={telefono} mensaje={mensaje} servicio={capservicio} dni={capdni}/> 
         </div>
       
    </div>
    )
}

export default GestionServicioDePagos
