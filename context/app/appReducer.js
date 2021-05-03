import {
    OCULTAR_ALERTA,
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    
} from '../../types'

const reducer = ( state, action ) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
        case OCULTAR_ALERTA:    
            return {
                ...state,
                msg: action.payload
            }

        case SUBIR_ARCHIVO: 
            return {
                ...state,
                cargando: true
            }    
        
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: false
            }    
        
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                msg: action.payload,
                cargando: false
            }
    
        default:
            return state;
    }
};

export default reducer;