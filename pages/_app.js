import React from 'react'
import AuthState from '../context/auth/authState';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthState>     {/* Se consume el provider del context. */}
      <Component {...pageProps}/>
    </AuthState>
  )
}

export default MyApp;
