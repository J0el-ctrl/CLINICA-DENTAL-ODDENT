import moment from 'moment'


export const prepareEvents = ( calendario = [] ) => {

    return calendario.map(
        (e) => ({
            ...e,
             end: moment((e.end).toDate()).format(),
             start: moment((e.start).toDate()).format(),
            


            // end: (moment((e.end).toDate()).format()),
            // start: (moment((e.start).toDate()).format()),
            
        })
    );
   

} 