import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import AppContext from './appContext';
import AppReducer from './appReducer';

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from '../../types'


const AppState = ({ children }) => {

    const initialState = {
        msg: null,
        nombre: '',
        nombre_original: '',
        cargando: null
    };

    const [ state, dispatch ] = useReducer(AppReducer, initialState);

   //Muestra una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
                payload: null
            })
        }, 3000)
    }

    //Función para subir el archivo
    const subirArchivo = async archivo => {

        dispatch({
            type: SUBIR_ARCHIVO
        })

        //Creando un formData
        const formData = new FormData();
        formData.append('archivo', archivo);       //Se llama archivo y quiero el dato pasado que es la primera posicion del arreglo.

        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: archivo.path
                }
            });

        } catch (error) { 
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    return (
        <AppContext.Provider
            value={{
                msg: state.msg,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                mostrarAlerta,
                subirArchivo
            }}
        >
            { children }
        </AppContext.Provider>
    );
};

export default AppState;