//paso 6_1 redux
//esto nos permite tener todos los tipos de las acciones 

export const types={
    uiOpenModal:'[ui] Open modal',
    uiCloseModal:'[ui] Close modal',

    eventSetActive: '[event] Set Active',
        //inicializa el proceso de grabacion en db firestore - paso 1
    evetStartAddNew:'[event] Start add new',

        //para mostrar en el calendario view  - paso 2 firestore
    

    
    eventAddNew:'[event] Add new',
    eventClearActiveEvent:'[event] clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted:'[event] Event Deleted',

    eventLoaded: '[event] Events loaded',
}