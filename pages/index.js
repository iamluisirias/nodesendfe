import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import AuthContext from '../context/auth/authContext';

const Home = () => {

  const authContext = useContext(AuthContext);
  const { obtenerUsuarioAutenticado } = authContext;

  useEffect(() => {
    obtenerUsuarioAutenticado();
  },[])

  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  );
};

export default Home;