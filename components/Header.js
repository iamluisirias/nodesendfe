import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import AuthContext from '../context/auth/authContext';

const Header = () => {

    const authContext = useContext(AuthContext);
    const { usuario, obtenerUsuarioAutenticado, cerrarSesion } = authContext;
  
    useEffect(() => {
      obtenerUsuarioAutenticado();
    },[])

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between"> 
            <Link href="/">
                <img className="w-64 mb-8 md:mb-0" src="logo.svg" alt="Logotipo"/>
            </Link>

            {
                usuario 
                ? (
                    <div className="flex items-center">
                        <p className="mr-4">Hola <span className="font-bold">{usuario.nombre}</span> </p>
                        <button
                            type="button"
                            className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2"
                            onClick={ () => cerrarSesion() }
                        >Cerrar Sesión</button>
                    </div>
                ) 
                : (
                    <div>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2">Iniciar Sesion</a>
                        </Link>
                        <Link href="/registro">
                            <a className="bg-black px-5 py-3 rounded text-white font-bold uppercase">Crear Cuenta</a>
                        </Link>
                    </div>
                )
            }
        </header>
    );
};

export default Header;