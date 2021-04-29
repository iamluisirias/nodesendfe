import React from 'react';
import { useFormik } from 'formik';
import Layout from '../components/Layout';
import * as yup from 'yup'
import ErrorForm from '../components/ErrorForm';

const Login = () => {

    //Manejando el state del formulario.
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        //Que campos y como se validaran esos campos.
        validationSchema: yup.object({
            email: yup.string().required('Ingrese un correo').email('Correo no válido'),
            password: yup.string().required('Ingrese su contraseña')
        }),

        //Que se hará una vez haya pasado la validación y se envíe el formulario.
        onSubmit: datos => {
            console.log(datos);
        }
    });

    return (
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h1  
                    className="text-4xl font-sans font-bold text-gray-800 text-center my-4"
                >Inicia Sesión</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form 
                            onSubmit={formik.handleSubmit}
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                        >
                            <div className="mb-4">
                                <label 
                                    htmlFor="email"
                                    className="block text-black text-sm font-bold mb-2"
                                >Correo</label>
                                <input 
                                    type="email" 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="email" 
                                    id="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>

                            {
                                formik.touched.email && formik.errors.email ? (
                                    <ErrorForm msg={formik.errors.email}/>
                                ) : null
                            }

                            <div className="mb-4">
                                <label 
                                    htmlFor="password"
                                    className="block text-black text-sm font-bold mb-2"
                                >Contraseña</label>
                                <input 
                                    type="password" 
                                    className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="password" 
                                    id="password"  
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                   
                                />
                            </div>

                            {
                                formik.touched.password && formik.errors.password ? (
                                    <ErrorForm msg={formik.errors.password}/>
                                ) : null
                            }

                            <input 
                                type="submit" 
                                value="Iniciar Sesión" 
                                className="bg-red-500 hover:bg-gray-900 w-full text-white uppercase font-bold py-1 rounded mt-5"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;