//paso 6_3 es la combinaciond elos reducers  calendario  y ui ,etc


import {combineReducers} from 'redux'
import { calendarReducer } from './CalendarReducer'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
    //estos se muestran en el redux y llaman a calendar reducer o uireducer etc
    ui:uiReducer,
    calendar:calendarReducer
    //calendar Reducer
})