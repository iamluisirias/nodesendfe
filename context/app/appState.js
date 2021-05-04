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
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE
} from '../../types'


const AppState = ({ children }) => {

    const initialState = {
        msg: null,
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
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

    //Funcion para generar el enlace del archivo subido.
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
        
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            });

        } catch (error) {
            dispatch({
                type: CREAR_ENLACE_ERROR
            })
        }
    }

    //Limpiando o reniciando todo el state porque termino todo el ciclo
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    return (
        <AppContext.Provider
            value={{
                msg: state.msg,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState
            }}
        >
            { children }
        </AppContext.Provider>
    );
};

export default AppState;