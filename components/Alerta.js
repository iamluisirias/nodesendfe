import React, { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';

const Alerta = () => {

    const authContext = useContext(AuthContext);
    const { mensaje } = authContext;

    const appContext = useContext(AppContext);
    const { msg } = appContext;

    return (
        <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto rounded">
           { mensaje || msg } 
        </div>
    );
};

export default Alerta;