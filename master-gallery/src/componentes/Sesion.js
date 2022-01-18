import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../Componentes-css/background.css';
import '../Componentes-css/Sesion.css';
import '../imagenes/img-sesion.jpg';

export default class Sesion extends Component {
    render() {
        return(
            <div className='container-box'>
                <div className='content-box'>
                    <div className='img-sesion'></div>
                    <div className='content'>
                        <div className='logo'>
                            <h4>MASTER</h4>
                            <h2>GALLERY</h2>
                        </div>
                        <form className='form-sesion'>
                            <input className='input' type='email' placeholder='Correo'></input>
                            <input className='input' type='password' placeholder='Contraseña'></input>
                            <input className='submit-button' type='submit' value='INGRESAR'></input>
                        </form>
                        <div className='link-signup'>
                            <a href='#'>Crea una cuenta</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}