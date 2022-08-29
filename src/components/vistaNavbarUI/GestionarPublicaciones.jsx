import React, { useState } from 'react'
import {db} from '../firebase'
import {withRouter} from 'react-router-dom'
import {storage} from '../firebase'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import Swal from 'sweetalert2';

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1,'hours');
 const initEvent = {
    start: now.toDate(),
     end: nowPlus1.toDate(),
     nombre:'',
     url:''
    
   
 }

const GestionarPublicaciones = (props) => {
   




    // const [nombrepublicacion, setNombrepublicacion] = useState('')
    const [imgurlpublicacion, setImgurlpublicacion] = useState('')
  

    const [ dateStart, setDateStart ] = useState(now.toDate());
    const [ dateEnd, setDateEnd ] = useState(nowPlus1.toDate()); 
    // const [nombrepublicacion, setNombrepublicacion] = useState('')
    const [formValues, setFormValues] = useState(initEvent)

    const {start,end,nombre,url}=formValues

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        })
    }
    
    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }
    // const handleEndUrl = ( e ) => {
    //     setImgurlpublicacion( e );
    //     setFormValues({
    //         ...formValues,
    //         url: e
    //     })
    //     console.log('erroe ne url caja texto');
    // }
    

    const agregar=async(e)=>{
        e.preventDefault()
      
        const momentStart = moment( start );
        const momentEnd = moment( end );
        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }
        // if ( url.trim().length < 2 ) {
        //     return Swal.fire('Error','Debe ingresar un url', 'error');
        // }
           
            await db.collection('publicaciones').add(formValues)
           

            props.history.push('/publicaciones')
        
         
            
        
       
            
            
      
    }


   
      const [image, setImage] = useState(null)

    const handleChange=e=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }
    const handleUpload=()=>{
        const uploadTask=storage.ref(`imagesPublicacion/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot=>{
                // const progress=Math.round(
                //     (snapshot.bytesTransferred/snapshot.totalBytes)*100
                // );
                // setProgress(progress)
            },
            error=>{
                console.log(error);
            },
            ()=>{
                storage
                .ref("imagesPublicacion")
                .child(image.name)
                .getDownloadURL()
                .then(imgurlpublicacion=>{
                     setImgurlpublicacion(imgurlpublicacion)

                });
            }
        );
    };

    return (
        <div>
        <h2 className="text-center mt-2">Gestionar Publicaciones Odontologicas</h2>
    <div className="py-5">
        <div className="d-block w-100 bg-info">
        <div className="container">
        <form onSubmit={agregar} className="text-center py-5">
        <div className="row py-2">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <label> Fecha de Inicio de publicacion</label>
                        <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        
                        className="form-control"
                    />
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label>Vencimiento de publicacion</label>
                    <DateTimePicker
                        onChange={handleEndDateChange }
                        value={ dateEnd } 
                        
                        minDate={ dateStart }
                        className="form-control"
                    />
                    </div>
                </div>
         
            <div className="row">
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <input
                         onChange={handleInputChange}
                         value={nombre}
                         name="nombre"
                        type="text"
                        className="form-control mb-2"
                        placeholder="Nombre"/>
                </div>
              
              
                <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <input 
                    onChange={handleInputChange}
                    value={url}
                    type="text"
                    name="url"
                    className="form-control mb-2"
                    placeholder="INGRESE URL "/>
                </div>
            </div>
           
        <button 
        type="submit"
        className="btn btn-secondary w-100">Enviar</button>
                

          </form>
         </div>
         </div>
         </div>
         <div className="text-center">
         <input type="file" className="btn btn-warning" onChange={handleChange} />
    <button className="btn btn-info" onClick={handleUpload}>Subir Foto</button>
    <br /><br /><br /><hr />
    <h2 className="text-center">Copie la URL completa en la caja de texto URL </h2>
    {imgurlpublicacion}
    <br />
    <img src={imgurlpublicacion} alt="" />

         </div>
    </div>
    )
}

export default withRouter(GestionarPublicaciones)
