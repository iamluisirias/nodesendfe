//Types
import {
    USUARIO_REGISTRADO_EXITO, 
    USUARIO_REGISTRADO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
    
} from '../../types';

const reducer = ( state, action ) => {
    switch (action.type) {
        case USUARIO_REGISTRADO_EXITO:
        case USUARIO_REGISTRADO_ERROR:
        case LIMPIAR_ALERTA:
        case LOGIN_ERROR:    
            return {
               ...state,                    //Una copia del state
               mensaje: action.payload      //Se modifica solo el valor que necesitamos. 
            }

        case LOGIN_EXITO:

            localStorage.setItem('token', action.payload);  //Ademas de asignarlo al state, este token se almacena en el localStorage.

            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        
        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload
            }
        
        case CERRAR_SESION:
            localStorage.removeItem('token');
            
            return {
                ...state,
                usuario: null,
                autenticado: null,
                token: null
            }    
    
        default:
            return state;
    }
}

export default reducer;