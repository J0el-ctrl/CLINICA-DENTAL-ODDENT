/* eslint-disable */ 
import React, { useEffect } from 'react'
import {db,storage} from '../firebase'
import Swal from 'sweetalert2';
import './FontUI.css'


import {UsuarioContext} from '../roles/context/UsuarioProvider'
const GestionDocumentos = () =>  {
    const {usuario} = React.useContext(UsuarioContext)  

    const [archivoUrl, setArchivoUrl] = React.useState("");
    const [docus,setDocus] = React.useState([]);
  
    const archivoHandler = async (e)=> {
  
      const archivo = e.target.files[0];
      const storageRef =storage.ref();
      const archivoPath = storageRef.child(archivo.name);
      await archivoPath.put(archivo);
      console.log("archivo cargado:",archivo.name);
      const enlaceUrl = await archivoPath.getDownloadURL();
      setArchivoUrl(enlaceUrl);
  
    }
  
    const submitHandler = async (e)=> {  
        e.preventDefault()
        const nombreArchivo=e.target.nombre.value;
        if(!nombreArchivo){
            Swal.fire("Error","Campo Nombre Obligatorio","warning")
            return
        }

        

        const coleccionRef=db.collection("archivos");
        const docu=await coleccionRef.doc().set({nombre:nombreArchivo,url:archivoUrl});
        console.log("archivo Cargado:",nombreArchivo,"url",archivoUrl);
        window.location="/gestiondocumentos"
  
    }
  
   
    useEffect(() =>  {
        const obtenerDatos=async()=>{

            try {
                //const dba=app.firestore() todo esto jala del firebase js el 
                //app debe ser igual a lo que se exporta
                
                //aqui la respuesta se esta guardando en data
                const data= await db.collection('archivos').get()
                //{id:doc.id,...doc.data()} objetos que trae de la base de datos
                const arrayData=  data.docs.map(doc=>({id:doc.id,...doc.data()}))
                console.log(arrayData);
                setDocus(arrayData)
                

            } catch (error) {
                console.log(error);
            }

        }

       obtenerDatos();
       console.log('test servicio');
    }, [])

    const elminar=async(id)=>{
        try {
           await  db.collection('archivos').doc(id).delete()
            const arrayFiltrado=docus.filter(item=>item.id!==id)
            setDocus(arrayFiltrado)
            console.log("se borro");
        } catch (error) {
            console.log(error);
            console.log("no se pudo borrar");
        }    
         }
   
  
    return (
      <div>
      <div className=" container text-center bg-info mt-5">

        {/* {
            usuario.rol!=='admin'?(
                null
            ):(
                <form onSubmit={submitHandler}  >
                <input type="file" onChange={archivoHandler} />
                <input type="text" name="nombre" placeholder="nombre de tu archivo"  className="form-control"/>
                <button>Enviar </button>
                 </form>
            )
        } */}
        {
            usuario.rol==='doctor'?(
                <form onSubmit={submitHandler}  >
                <input type="file" onChange={archivoHandler} />
                <input type="text" name="nombre" placeholder="nombre de tu archivo"  className="form-control"/>
                <button>Enviar </button>
                 </form>
            ):(
                null
            )
        }

    
      </div>    
      <h2 className="text-center text-cuerpo ">Documentos</h2>

      <div className=" container  bg-info py-3">
      
         <div className="row justify-content-center">
           {docus.map(doc=>
            <div className="col-md-4 col-sm-4 col-lg-4 col-xl-4 col-xxl-4  py-3" key={doc.id}>
                <div className="card">
                    <a href={doc.url} target="_blank" > <i className="bi bi-caret-down-square"></i>Descargar Pdf</a>
                    <div className="card-body text-center">
                        <h4 className="card-title">{doc.nombre}</h4>
                        {
                            usuario.rol !=='admin'?(
                                null
                            ):(
                                <button 
                                type="button"
                                onClick={()=>elminar(doc.id)}
                                className="btn btn-danger mt-3">Eliminar</button>
                            )
                        }
                   

                    </div>

                </div>

            </div>
            
           )}
         </div>

      </div>

      </div>
    );
  }

export default GestionDocumentos
