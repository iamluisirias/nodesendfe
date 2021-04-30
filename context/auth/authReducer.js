//Types
import {
    USUARIO_REGISTRADO_EXITO, 
    USUARIO_REGISTRADO_ERROR,
    LIMPIAR_ALERTA
    
} from '../../types';

const reducer = ( state, action ) => {
    switch (action.type) {
        case USUARIO_REGISTRADO_EXITO:
        case USUARIO_REGISTRADO_ERROR:
        case LIMPIAR_ALERTA:
            return {
               ...state,                    //Una copia del state
               mensaje: action.payload      //Se modifica solo el valor que necesitamos. 
            }
    
        default:
            return state;
    }
}

export default reducer;