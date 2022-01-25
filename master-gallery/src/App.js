import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import firebaseApp from './config/Firebase_config';
import Sesion from './componentes/Sesion';
import Registro from './componentes/Registro';
import Respuesta from './componentes/Respuesta';
import Usuario from './componentes/Usuario';
import './App.css';

const auth = getAuth(firebaseApp);

export default function App () {
  const [user, setUser] = useState(null);

  onAuthStateChanged( auth, ( usuarioFirebase ) => {
    if ( usuarioFirebase ) {
      setUser(usuarioFirebase)
    }else{
      setUser(null);
    }
  });

  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={ <Sesion/> } />

          <Route path='/registro' element={ <Registro/> } />

          <Route path='/respuesta' element={ <Respuesta/> } />

        </Routes>
    </Router>
    </>
  );
}
