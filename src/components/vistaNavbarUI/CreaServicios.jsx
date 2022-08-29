import React, { useState } from 'react'
import {db} from '../firebase'
import {withRouter} from 'react-router-dom'
import {storage} from '../firebase'


const CreaServicios = (props) => {

    const [costoservicio, setCostoservicio] = useState('')
    const [nombreservicio, setNombreservicio] = useState('')
    const [detalleservicio, setDetalleservicio] = useState('')
    const [imgurlservicio, setImgurlservicio] = useState('')

    const agregar=async(e)=>{
        e.preventDefault()
        try {
            const nuevo={
                costo:costoservicio,
                nombre:nombreservicio,
                detalle:detalleservicio,
                imgservicio:imgurlservicio,
            }
            await db.collection('servicios').add(nuevo)
            setNombreservicio('')
            setDetalleservicio('')
            setImgurlservicio('')
            props.history.push('/servicios')
        
        } catch (error) {
            console.log(error);
        }
    }

    const [image, setImage] = useState(null)

    const handleChange=e=>{
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload=()=>{
        const uploadTask=storage.ref(`imagesServicios/${image.name}`).put(image);
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
                .ref("imagesServicios")
                .child(image.name)
                .getDownloadURL()
                .then(imgurlservicio=>{
                     setImgurlservicio(imgurlservicio)

                });
            }
        );
    };
    console.log("image:",image);


    return (
        <div>
            <h2 className="text-center mt-2">Gestionar Servicios Odontologicos</h2>
        <div className="py-5">
            <div className="d-block w-100 bg-info">
            <div className="container">
            <form onSubmit={agregar} className="text-center py-5">
             
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setNombreservicio(e.target.value)}
                        value={nombreservicio}
                        type="text"
                        className="form-control mb-2"
                        placeholder="nombre de servicio"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setCostoservicio(e.target.value)}
                        value={costoservicio}
                        type="text"
                        className="form-control mb-2"
                        placeholder="costo del servicio"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setDetalleservicio(e.target.value)}
                        value={detalleservicio}
                        type="text"
                        className="form-control mb-2"
                        placeholder="detalle de servicio"/>
                    </div>
                  
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setImgurlservicio(e.target.value)}
                        value={imgurlservicio}
                        type="text"
                        className="form-control mb-2"
                        placeholder="imgurl"/>
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
        {imgurlservicio}
        <img src={imgurlservicio} alt="" />

             </div>
        </div>
    )
}

export default withRouter(CreaServicios)
