import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

//Types
import {
    USUARIO_REGISTRADO_EXITO, 
    USUARIO_REGISTRADO_ERROR,
    LIMPIAR_ALERTA
    
} from '../../types';

import clienteAxios from '../../config/axios';

const AuthState = ({ children }) => {

    //Se define el state inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null, 
        mensaje: null
    }

    //Se configura el reducer.
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    //Registra un nuevo usuario
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            
            dispatch({
                type: USUARIO_REGISTRADO_EXITO,
                payload: respuesta.data.msg
            });

            //Limpia la alerta despues de 3 segundos
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                    payload: null
                })
            }, 3000)

        } catch (error) {
            dispatch({
                type: USUARIO_REGISTRADO_ERROR,
                payload: error.response.data.msg
            });

             //Limpia la alerta despues de 3 segundos
            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                    payload: null
                })
            }, 3000)
        }
    }

    return (
        <AuthContext.Provider           //Es el que provee el state. Value es un objeto con todos los states que se haran disponibles.
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                                               
            }}
        >
            { children }                {/* Hara disponible el state en todos los componentes hijos. */}
        </AuthContext.Provider>
    );
};

export default AuthState; 