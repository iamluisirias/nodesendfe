import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ErrorForm from '../components/ErrorForm';

const Registro = () => {

    //El orden importa, primero los valores iniciales, luego la validacion y luego el submit
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            password: ''
        },

        //ValidationSchema es una propiedad de formik donde se le pasa como argumento la validacion, en este caso otra dependencia (yup) muy similar a express-validator pero en react.
        //Definimos un objeto de yup con los parametros a someter a validacion.
        validationSchema: yup.object({
            nombre: yup.string().required('Ingresa un nombre'),
            email: yup.string().email('Correo no válido').required('Ingresa un correo'),
            password: yup.string().required('Define una contraseña').min(8, 'El password debe ser de 8 caracteres como minimo')
        }),

        onSubmit: datos => {
            console.log(datos);
        }
    })

    return (
        <Layout>
           <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">Crea tu cuenta</h2>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form 
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
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
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {
                                formik.touched.nombre && formik.errors.nombre ? (
                                   <ErrorForm  msg={formik.errors.nombre}/>
                                ) : null
                            }

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
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {
                                formik.touched.email && formik.errors.email ? (
                                   <ErrorForm  msg={formik.errors.email}/>
                                ) : null
                            }

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
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {
                                formik.touched.password && formik.errors.password ? (
                                   <ErrorForm  msg={formik.errors.password}/>
                                ) : null
                            }

                        <input 
                            type="submit" 
                            value="Crear Cuenta" 
                            className="bg-red-500 hover:bg-gray-900 w-full text-white uppercase font-bold py-1 rounded mt-5"
                        />
                            
                        </form>
                    </div>
                </div>
           </div>
        </Layout>
    );
};

export default Registro;