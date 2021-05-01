import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

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

import clienteAxios from '../../config/axios';
import authToken from '../../config/authToken';

const AuthState = ({ children }) => {

    //Se define el state inicial
    const initialState = {
        token:  typeof window !== 'undefined' ? localStorage.getItem('token') : '',       //NextJS es un framework hibrido donde el servidor tambien ejecuta y renderiza este codigo, por lo tanto se hace una comprobacion si estamos utilizando window, que es solo parte del cliente, si es asi, entonces el valor del token será el almacenado en el storage, sino es asi y estamos en el server ejecutando esto, el valor del token sera un string vacío ya que en este no existe el localStorage.
        autenticado: null,
        usuario: null, 
        mensaje: null
    }

    //Se configura el reducer.
    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    //Funciones que modifican el state.

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

    //Inicia sesion con un usuario.
    const iniciarSesion = async datos => {
       
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            
            dispatch({
                type: LOGIN_EXITO,
                payload: respuesta.data.token
            });

        } catch (error) {
            
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });

            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                    payload: null
                })
            }, 3000)
        }
    }

    //Obtiene el usario autenticado en base al JWT generado.
    const obtenerUsuarioAutenticado = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            authToken(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });

        } catch (error) {
             
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            });

            setTimeout(() => {
                dispatch({
                    type: LIMPIAR_ALERTA,
                    payload: null
                })
            }, 3000)
        }
        
    }

    //Cerrar la sesión del usuario.
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider           //Es el que provee el state. Value es un objeto con todos los states que se haran disponibles.
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                obtenerUsuarioAutenticado,
                cerrarSesion                                           
            }}
        >
            { children }                {/* Hara disponible el state en todos los componentes hijos. */}
        </AuthContext.Provider>
    );
};

export default AuthState; 