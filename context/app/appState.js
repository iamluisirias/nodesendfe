import React from 'react';
import AppContext from './appContext';

import {
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from '../../types'


const AppState = ({ children }) => {

    const stateInicial = {
        nombre: ''
    }

    //const 

    return (
        <AppContext.Provider
            value={{

            }}
        >
            { children }
        </AppContext.Provider>
    );
};

export default AppState;