import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../Componentes-css/Respuesta.css';

export default class Sesion extends Component {
    render() {
        return(
            <div className='container'>
                <div className='box'>
                    <img src='./imagenes/arrow_back_black_24dp.svg'></img>
                    <p>GRACIAS POR CONTACTARNOS</p>
                </div>
            </div>
        )
    }
}