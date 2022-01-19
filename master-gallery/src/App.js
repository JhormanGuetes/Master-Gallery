import React, {Component} from 'react';
import Sesion from './componentes/Sesion'
import Registro from './componentes/Registro'
import Respuesta from './componentes/Respuesta'
import './App.css';

class App extends Component {
    render() {
      return (
        <div>
          <Respuesta/>
        </div>
      )
    }
}

export default App;
