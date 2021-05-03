import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import AuthContext from '../context/auth/authContext';

import Dropzone from '../components/Dropzone';

const Home = () => {

  const authContext = useContext(AuthContext);
  const { obtenerUsuarioAutenticado } = authContext;

  useEffect(() => {
    obtenerUsuarioAutenticado();
  },[])

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone/>
           
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
            <h2 
              className="text-4xl font-sans font-bold text-gray-800 my-45"
            >Compartir archivos de forma sencilla y privada</h2>
            <p className="text-lg leading-loose my-5">
              <span 
                className="text-red-500 font-bold"
              >ReactNodeSend</span> te permite compartir archivos con cifrado de extremo a extremo. Tu archivo es eliminado despues de ser descargado asi que puedes mantener privacidad en lo que compartes y asegurate de que no permanezcan en línea para siempre.
            </p>
            <Link href="/registro">
              <a className="text-red-500 font-bold text-lg hover:text-red-700">Obtén una cuenta para más beneficios.</a>
            </Link>  
          </div>
        </div> 
      </div>
    </Layout>
  );
};

export default Home;