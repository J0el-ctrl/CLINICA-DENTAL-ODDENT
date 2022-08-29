//6_2 redux los eventos son las acciones  que se van a realizar
/* eslint-disable */ 
import { types } from "../types/types";
import {db} from '../../../firebase'
import { prepareEvents } from "./prepareEvents";

//llama para inicializar el proceso de grabacion firestore - paso 2
export const eventStartAddNew=(event)=>{
    return async(dispatch)=>{
        // console.log(event);
        const resp = await db.collection('calendario').add(event)
        console.log(resp);


    }
}


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

    export const eventSetActive =(event)=>({
    type:types.eventSetActive,
    payload:event
    })
    export const eventClearActiveEvent=()=>({type:types.eventClearActiveEvent})


    
export const eventStartUpdate=(event)=>{
    return async(dispatch)=>{
        try {
             console.log(event);
             await db.collection('calendario').doc(event.id).update( {
                 end:event.end,
                 detalle:event.detalle,
                 start:event.start,
                 cita:event.cita,



                 }      
                );
            dispatch(eventUpdated(event))



       } catch (error) {
                console.log(error);            
        }
    }
}

export  const eventUpdated=(event)=>({
    type:types.eventUpdated,
    payload:event
});





export const eventStartDelete=()=>{
    return async(dispatch,getState)=>{
        const {id}=getState().calendar.activeEvent;
        console.log(id);
        try {
            // console.log(event);
            await db.collection('calendario').doc(id).delete();
           dispatch(eventDeleted())

            console.log("borrado");

      } catch (error) {
               console.log(error);            
       }
    }
}

 const eventDeleted = () => ({ type: types.eventDeleted });

 export const eventStartLoading=()=>{
    return async(dispatch)=>{
        
        try {
            
            const data=await db.collection('calendario').get()
            const arrayData= data.docs.map(doc=>({id:doc.id,...doc.data()}))
           
            //
        //     const eventos=prepareEvents(arrayData)
        //     console.log(eventos);
        //      dispatch(eventLoaded(eventos))
        //  } catch (error) {
        //      console.log(error);
        //  }
            
             const eventos=prepareEvents(arrayData)
            console.log(eventos);
             dispatch(eventLoaded(eventos))
         } catch (error) {
             console.log(error);
         }
            

    }
}



const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})





