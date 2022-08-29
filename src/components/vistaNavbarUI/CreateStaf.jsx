
import React, { useState } from 'react'
import {db} from '../firebase'
import {withRouter} from 'react-router-dom'
import {storage} from '../firebase'

const CreateStaf = (props) => {
    const [stafalias, setStafalias] = useState('')
    const [stafcop, setStafcop] = useState('')
    const [stafnombre, setStafnombre] = useState('')
    const [stafdescripcion, setStafdescripcion] = useState('')
    const [staflogros, setStaflogros] = useState('')
    const [imgurlstaf, setImgurlstaf] = useState('')

    const agregar =async(e)=>{
        e.preventDefault()
        try {
            const nuevo={
                alias:stafalias,
                cop:stafcop,
                nombre:stafnombre,
                descripcion:stafdescripcion,
                logros:staflogros,
                imgstaf:url,
                
            }
            await db.collection('staf').add(nuevo)

            setStafalias('')
            setStafcop('')
            setStafnombre('')
            setStafdescripcion('')
            setStaflogros('')
            setImgurlstaf('')
            props.history.push('/staf')

        } catch (error) {
            console.log(error);
        }
    }

        //para la subida de imagen
        const [image, setImage] = useState(null)
        const [url, setUrl] = useState("")
        // const [progress, setProgress] = useState(0)

        const handleChange=e=>{
            if(e.target.files[0]){
            setImage(e.target.files[0])
            }
        }

        const handleUpload=()=>{
            const uploadTask=storage.ref(`images/${image.name}`).put(image);
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
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                         setUrl(url)
    
                    });
                }
            );
        };
        console.log("image:",image);
        
        //


    return (
        <div>
        <div className="py-5">
            <div className="d-block w-100 bg-info">
            <div className="container">
            <form onSubmit={agregar} className="text-center py-5">
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input
                        onChange={e=>setStafalias(e.target.value)}
                        value={stafalias}
                        type="text"
                        className="form-control mb-2"
                        placeholder="alias"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setStafcop(e.target.value)}
                        value={stafcop}
                        type="text"
                        className="form-control mb-2"
                        placeholder="colegiatura"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setStafnombre(e.target.value)}
                        value={stafnombre}
                        type="text"
                        className="form-control mb-2"
                        placeholder="nombre"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setStafdescripcion(e.target.value)}
                        value={stafdescripcion}
                        type="text"
                        className="form-control mb-2"
                        placeholder="descripcion"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setStaflogros(e.target.value)}
                        value={staflogros}
                        type="text"
                        className="form-control mb-2"
                        placeholder="logros"/>
                    </div>
                    <div className="col mb-6 col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <input 
                        onChange={e=>setUrl(e.target.value)}
                        value={url}
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
        {url}
        <img src={url} alt="" />

             </div>
        </div>
    )
}

export default withRouter(CreateStaf)
