import React from 'react';
import Layout from '../components/Layout';

const Registro = () => {
    return (
        <Layout>
           <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crea tu cuenta</h2>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label 
                                    htmlFor="nombre" 
                                    className="block text-black text-sm font-bold mb-2"
                                >Nombre</label>
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    id="nombre"
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Nombre de usuario"
                                />
                            </div>
                            <div className="mb-4">
                                <label 
                                    htmlFor="email" 
                                    className="block text-black text-sm font-bold mb-2"
                                >Correo</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Correo de usuario"
                                />
                            </div>
                            <div className="mb-4">
                                <label 
                                    htmlFor="password" 
                                    className="block text-black text-sm font-bold mb-2"
                                >Contraseña</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Defina una contraseña"
                                />
                            </div>

                            <button 
                                type="submit"
                            >Crear usuario</button>
                            
                        </form>
                    </div>
                </div>
           </div>
        </Layout>
    );
};

export default Registro;