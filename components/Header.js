import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';

const Header = () => {

    const authContext = useContext(AuthContext);
    const { usuario, obtenerUsuarioAutenticado, cerrarSesion } = authContext;

    const appContext = useContext(AppContext);
    const { limpiarState } = appContext;

    const router = useRouter();
  
    useEffect(() => {
      obtenerUsuarioAutenticado();
    },[])


    const redireccionar = () => {
        router.push('/');
        limpiarState();
    };

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between"> 
              
            <img 
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" alt="Logotipo"
                onClick={ () => redireccionar() }
            />
           
            {
                usuario ? 
                (
                    <div className="flex items-center">
                        <p className="mr-4">Hola <span className="font-bold">{usuario.nombre}</span> </p>
                        <button
                            type="button"
                            className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mr-2"
                            onClick={ () => cerrarSesion() }
                        >Cerrar Sesión</button>
                    </div>
                ) 
                : 
                (
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