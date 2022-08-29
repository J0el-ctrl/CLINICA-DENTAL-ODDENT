//paso 6_2 redux

import { types } from "../types/types";

const initialState={
    modalOpen:false,
}

    //el uiReducer es enviado el rootReducer
export const uiReducer=(state=initialState,action)=>{
    switch (action.type) {
        //esto es llamado de los types modal abierto
        case types.uiOpenModal:
            
            return{
                ...state,
                modalOpen:true
            };
            
        case types.uiCloseModal:
            
            return{
                ...state,
                modalOpen:false
            };
    
        default:
            return state;
    }
}