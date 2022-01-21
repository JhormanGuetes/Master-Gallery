import React, { useState } from 'react';
import Usuario from './Usuario';
import '../Componentes-css/background.css';
import '../Componentes-css/Sesion.css';
import firebaseApp from '../config/Firebase_config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function Sesion() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerContraseña, setRegisterContraseña] = useState("");

    const [objUsuario, setObjUsuario] = useState(null);

    const iniciarSesion = async (e) => {
        e.preventDefault();
        
        let camposLlenos = (registerEmail && registerContraseña) ? true : alert('Campo(s) Vacio(s)');
        if (camposLlenos) {
            try{
                const infoUsuario = await signInWithEmailAndPassword(auth, registerEmail, registerContraseña);

                const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
                const docuCifrada = await getDoc(docuRef);
                const infoFinal = docuCifrada.data().nombre;

                const usuarioDatos = {
                    uid: infoUsuario.user.uid,
                    email: infoUsuario.user.email,
                    name: infoFinal,
                };
                setObjUsuario(usuarioDatos);

            }catch (error){
                alert(error.code);
                console.log(error);
            } 
        }
    }

    return(
        <>
            {objUsuario && <Usuario user={ objUsuario } />}
            <div className='container-box'>
                <div className='content-box'>
                    <div className='img-sesion'></div>
                    <div className='content'>
                        <div className='logo'>
                            <img src='./imagenes/logo-MG.svg'></img>
                        </div>
                        <form className='form-sesion'>
                            <input className='input' type='email' name='email' 
                            onChange={(event) => {setRegisterEmail(event.target.value)}} placeholder='Correo' required></input>
                            
                            <input className='input' type='password' name='contraseña' 
                            onChange={(event) => {setRegisterContraseña(event.target.value)}} placeholder='Contraseña' required></input>
                            
                            <input className='submit-button' type='submit' onClick={iniciarSesion} value='INGRESAR'></input>
                        </form>
                        <div className='link-signup'>
                            <a href='/registro'>Crea una cuenta</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}