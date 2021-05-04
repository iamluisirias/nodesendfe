import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import AuthContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';

import Dropzone from '../components/Dropzone';
import Alerta from '../components/Alerta';

const Home = () => {

  const authContext = useContext(AuthContext);
  const { obtenerUsuarioAutenticado } = authContext;

  const appContext = useContext(AppContext);
  const { msg, url } = appContext;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      obtenerUsuarioAutenticado()
    }
    
  },[])

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {
          url ?
          (
            <div className="md:shadow-lg p-5 bg-white rounded-lg py-10 text-center">
              <p className="text-2xl text-black">Comparte este enlace para que puedan descargar tu archivo</p>
              {/*<p className="text-red-700 font-bold mt-5">{`${process.env.frontendURL}/enlaces/${url}`}</p>*/}
              <button 
                type="button"
                className="bg-red-500 px-5 py-3 rounded text-white font-bold uppercase mt-5 hover:bg-red-600"
                onClick={ () => navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`) }
              >Copiar Enlace</button>
            </div>
          )
          :
          <>
            {
              msg && <Alerta/>
            }
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone/>
               
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 
                  className="text-4xl font-sans font-bold text-gray-800 my-45"
                >Compartir archivos de forma sencilla y privada</h2>
                <p className="text-lg leading-loose my-5">
                  <span 
                    className="text-red-500 font-bold"
                  >ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo. Tu archivo es eliminado despues de ser descargado asi que puedes mantener privacidad en lo que compartes y asegurarte de que no permanezcan en línea para siempre.
                </p>
                <Link href="/registro">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">Obtén una cuenta para más beneficios.</a>
                </Link>  
              </div>
            </div> 
          </>
        }
      </div>
    </Layout>
  );
};

export default Home;