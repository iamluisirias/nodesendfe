import clienteAxios from './axios';

const authToken = token => {
    if (token) {
        clienteAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`       //Mandar el token en el header, en la parte de auth como bearer token.
    } else {
        delete clienteAxios.defaults.headers.common['Authorization'];       //Borrar por si ya habia un token remanente.
    }
};  

export default authToken;