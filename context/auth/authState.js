import React from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

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

    
    return (
        <AuthContext.Provider           //Es el que provee el state. Value es un objeto con todos los states que se haran disponibles.
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje                                      
            }}
        >
            { children }                {/* Hara disponible el state en todos los componentes hijos. */}
        </AuthContext.Provider>
    );
};

export default AuthState; 