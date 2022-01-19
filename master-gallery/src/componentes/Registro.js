import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../Componentes-css/background.css';
import '../Componentes-css/Sesion.css';

export default class Sesion extends Component {
    render() {
        return(
            <div className='container-box'>
                <div className='content content-resgister' style={{backgroundColor: 'white'}}>
                    <div className='logo'>
                        <p className='tittle-logo'>CREA TU CUENTA</p>
                    </div>
                    <form className='form-sesion'>
                        <input className='input' type='text' placeholder='Nombre de Usuario'></input>
                        <input className='input' type='email' placeholder='Correo'></input>
                        <input className='input' type='password' placeholder='Contraseña'></input>
                        <input className='input' type='password' placeholder='Confirmar Contraseña'></input>
                        <input className='submit-button' type='submit' value='REGISTRAR'></input>
                    </form>
                    <div className='link-signup'>
                        <a href='#'>Inicia sesión</a>
                    </div>
                </div>
            </div>
        )
    }
}