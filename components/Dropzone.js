import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import AppContext from '../context/app/appContext';

const Dropzone = () => {

    //Accediendo al state global
    const appContext = useContext(AppContext);
    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = appContext;

    //Manejando el archivo al momento del drop
    const onDropRejected = () => {
        mostrarAlerta('Archivo Rechazado, el límite es de 1MB, crea una cuenta y obtén el beneficio de subir archivos más grandes.');
    };

    //useCallback es utilizado para evitar multiples renders del componente a medida de que ocurre un cambio en el archivo subido nitampoco cuando se esté subiendo
    const onDropAccepted = useCallback( acceptedFiles => {
        //En caso de pasar las validaciones de dropzone, se sube el archivo
        subirArchivo(acceptedFiles[0]);
    }, []);

    //Extraer contenido de dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

    const archivos = acceptedFiles.map( archivo => (
        <li 
            key={archivo.lastModified}
            className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
        >
            <p className="font-bold text-xl">
                {archivo.path}
            </p>
            <p className="text-sm text-gray-500">{ ( archivo.size / Math.pow(1024, 2) ).toFixed(2) } MB</p>
        </li>
    ) );

    return (
        <div 
            className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4"
        >
            {
                acceptedFiles.length > 0 ? 
                (
                   <div className="mt-10 w-full">
                       <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                        <ul>
                            { archivos }
                        </ul>

                        {
                            cargando ? 
                                <p
                                    className="my-10 text-center text-gray-600"
                                >Subiendo archivo...</p> 
                            : 
                                <button 
                                    type="button"
                                    className="bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800" 
                                    onClick={() => crearEnlace() }
                                >
                                    Crear Enlace
                                </button>
                        }

                        
                   </div>
                ) 
                :  
                (
                    <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
                        <input className="h-100" { ...getInputProps() }/>   
                        {
                            isDragActive ? 
                                <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> 
                            : 
                            (    <div className="text-center">
                                    <p 
                                        className="text-2xl text-center text-gray-600"
                                    >Arrastra un archivo aquí o haz click para seleccionar</p>
                                    <button 
                                        className="bg-blue-700 w-full py-3 rounded text-white my-10 hover:bg-blue-800" 
                                        type="button"
                                    >Seleccionar archivos</button>
                                </div>
                            )    
                        }
                    </div>
                )    
            } 

        </div>
    );
};

export default Dropzone;
