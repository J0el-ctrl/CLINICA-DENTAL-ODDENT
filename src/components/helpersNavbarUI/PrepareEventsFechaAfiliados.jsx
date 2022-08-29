
import moment from 'moment'

const PrepareEventsFechaAfiliados = (afiliados=[]) => {
    return afiliados.map(
        (e) => ({
            ...e,
             


            end: moment((e.end).toDate()).format('LL'),
             start: moment((e.start).toDate()).format('LL'),
            


            // end: (moment((e.end).toDate()).format()),
            // start: (moment((e.start).toDate()).format()),
            
        })
    );
   
}

export default PrepareEventsFechaAfiliados
