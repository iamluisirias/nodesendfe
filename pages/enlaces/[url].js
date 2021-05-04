import React, { useContext, useState } from 'react';
import clienteAxios from '../../config/axios';
import Layout from '../../components/Layout';
import AppContext from '../../context/app/appContext';

import Alerta from '../../components/Alerta';

export async function getServerSideProps({ params }) {
    //Se extrae de lo que se manda en el path de abajo.
    const { url } = params;

    const resultado = await clienteAxios.get(`/api/enlaces/${url}`);

    return {
        props: {
            url: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');

    return {
        paths: enlaces.data.enlaces.map(enlace => ({
            params: { url : enlace.url }
        })),
        fallback: false         //Devuelve pagina 404 si el enlace no existe en la db y evita renderizar una pagina modelo para ese enlace.
    }
}

const URL = ({ url }) => {
    //Accediendo al state global
    const appContext = useContext(AppContext);
    const { msg, mostrarAlerta } = appContext;

    //Destructuring de la respuesta que se recibe al hacer un get a /api/usuarios/:url
    //Se recibe si el enlace esta protegido o no con una contraseña y el enlace de la página de donde está ese archivo protegido.
    const { enlace, password } = url;

    //state local
    const [ passHabilitada, habilitarPassword ] = useState(password);   //Se define la respuesta del req como state inicial de si la contrasena se habilita o no.
    const [ archivo, setArchivo ] = useState(null);

    const [ passwordForm, setPassword ] = useState('');

    const verificarPassword = async e => {
        e.preventDefault();

        const data = {
            password: passwordForm
        }

        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace}`, data);
            //guardamos el archivo de respuesta en el state.
            setArchivo(resultado.data.archivo); 

            //Deshabilitando la password, en caso de que no tenga o se haya ingresado correctamente.
            habilitarPassword(resultado.data.password);

        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    }

    return (
        <Layout>
            {
                passHabilitada ?
                (
                   <div className="md:w-3/5 xl:w-2/5 mx-auto mb-32">
                        <div className="py-10 text-center">
                            <p className="font-bold">Este enlace está protegido con una contraseña</p>

                            {
                                msg && <Alerta/>
                            }

                            <form 
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 mt-8"
                                onSubmit={ e => verificarPassword(e) }
                            >
                                <div className="mb-4">
                                    <label 
                                        htmlFor="password"
                                        className="block text-black text-sm font-bold mb-2"
                                    >Ingrese Contraseña</label>
                                    <input 
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                        placeholder="Ingrese la contraseña para poder descargar el archivo"
                                        value={passwordForm}
                                        onChange={ e => setPassword( e.target.value ) }
                                    />
                                </div>

                                <input 
                                    type="submit" 
                                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold rounded mt-5"
                                    value="Obtener Enlace"
                                />
                            </form>    
                        </div>
                   </div>
                )
                :
                (
                    <div className="md:w-3/5 xl:w-2/5 mx-auto mb-32">
                        <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 mt-8">
                            <h1 className="text-4xl text-center text-gray-700">Descarga el archivo</h1>
                            <div className="flex items-center justify-center mt-10">
                                <a href={`${process.env.backendURL}/api/archivos/${archivo}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Aquí</a>
            
                            </div>
                        </div>
                    </div>
                )
            }
        </Layout>
    );
};

export default URL;