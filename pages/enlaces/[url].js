import React from 'react';
import clienteAxios from '../../config/axios';
import Layout from '../../components/Layout';

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

    const { archivo } = url;

    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga el archivo</h1>
            <div className="flex items-center justify-center mt-10">
                <a href={`${process.env.backendURL}/api/archivos/${archivo}`} className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer">Aquí</a>

            </div>
        </Layout>
    );
};

export default URL;