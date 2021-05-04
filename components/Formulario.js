import React, { useContext, useState } from 'react';
import AppContext from '../context/app/appContext';

const Formulario = () => {

    //State local
    const [ passwordHabilitada, habilitarPassword ] = useState(false);

    //State global
    const appContext = useContext( AppContext );
    const { agregarPassword, agregarNumeroDescargas } = appContext;

    return (
        <div className="w-full mt-20">
            <form>
                <div>
                    <label className="text-lg text-gray-800">Eliminar tras</label>
                    <select
                        className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rouded leading-none focus:outline-none focus:border-gray-500"
                        onChange={ e => agregarNumeroDescargas( parseInt(e.target.value) ) }
                    >
                        <option value="" selected disabled>-- Seleccione --</option>
                        <option value="1">1 Descarga</option>
                        <option value="5">5 Descargas</option>
                        <option value="10">10 Descargas</option>
                        <option value="20">20 Descargas</option>
                    </select>
                </div>

                <div className="mt-4">
                   <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2" htmlFor="password">Proteger con contraseña</label>
                    <input 
                        type="checkbox"
                        onChange={ () => habilitarPassword( !passwordHabilitada ) }
                    />
                   </div>

                    {
                        passwordHabilitada &&
                        (
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                                onChange={ e => agregarPassword( e.target.value ) }
                            />
                        )
                    }

                </div>
            </form>
        </div>
    );
};

export default Formulario;