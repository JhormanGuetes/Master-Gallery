import React from 'react';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth'
import firebaseApp from '../config/Firebase_config';

const auth = getAuth(firebaseApp);

export default function Usuario( props ) {

    const cerrarSesion = () => {
        signOut(auth);
        window.location.href = './';
    }

    return (
        <>
            <Overlay>
                <ContenedorModal>
                    <Encabezado>
                        <h4>Bienvenido {props.user.name}</h4>
                    </Encabezado>
                    <BotonCerrar onClick={cerrarSesion}> <img src='./imagenes/icono-cerrar.svg'></img> </BotonCerrar>
                    <ContenedorImagenes>

                    </ContenedorImagenes>
                    <ContenedorInput>
                        <input type='file'></input>
                    </ContenedorInput>
                </ContenedorModal>
            </Overlay>
        </>
    );
}

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .2);
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContenedorModal = styled.div`
    width: 500px;
    height: 500px;
    background: #fff;
    position: relative;
    z-index: 50;
    box-shadow: 2px 4px 5px #555555;
    padding: 15px;
`;

const Encabezado = styled.div`
    height: 10%;
    display: flex;
    align-items: center;
    margin: 0px 0px 5px 10px;
    padding-bottom: 5px;
`;

const BotonCerrar = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    height: 35px;
    width: 35px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 50%;

    &:hover{
        background-color: #EBEBEB;
    }

    &:active{
        transform: scale(90%);
    }

    img {
        height: 100%;
        width: 100%;
    }
`;

const ContenedorImagenes = styled.div`
    width: 100%;
    height: 80%;
    background-color: #EBEBEB;
`;

const ContenedorInput = styled.div`
    display: flex;
    height: 10%;
    align-items: center;
    justify-content: end;

    input {
        
    }
`;