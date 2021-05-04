import {
    OCULTAR_ALERTA,
    MOSTRAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE,
    
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
        
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload
            }    
        
        case CREAR_ENLACE_ERROR:
            return {
                ...state
            }   
            
        case LIMPIAR_STATE: 
            return {
                ...state,
                msg: null,
                nombre: '',
                nombre_original: '',
                cargando: null,
                descargas: 1,
                password: '',
                autor: null,
                url: ''
            }    

        default:
            return state;
    }
};

export default reducer;