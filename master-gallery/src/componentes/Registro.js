import React, { useState } from 'react';
import '../Componentes-css/background.css';
import '../Componentes-css/Sesion.css';
import firebaseApp from '../config/Firebase_config';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function Registro()  {
    const [registerNombre, setRegisterNombre] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerContraseña, setRegisterContraseña] = useState("");
    const [registerContraseña2, setRegisterContraseña2] = useState("");

    const registrarUsuario = async (e) => {
        e.preventDefault();

        let campoVacio = (registerNombre && registerEmail && registerContraseña && registerContraseña2) ? true : alert('Campo(s) Vacio(s)');
        if (campoVacio) {
            let isEqual = (registerContraseña === registerContraseña2) ? true : alert('Las contraseñas no coinciden');
            if (isEqual) {
                try{
                    const infoUsuario = await createUserWithEmailAndPassword(auth, registerEmail, registerContraseña);
                    console.log(infoUsuario);
                    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
                    await setDoc(docuRef, { correo: registerEmail, nombre: registerNombre })
                    const user = auth.currentUser;
                    const envioCorreo = await sendEmailVerification(user);
                    window.location.href = './respuesta';
                }catch (error){
                    alert(error.code);
                    console.log(error.message);
                }
            }
        }
    };
    

    return(
        <div className='container-box'>
            <div className='content content-resgister' style={{backgroundColor: 'white'}}>
                <div className='logo'>
                    <p className='tittle-logo'>CREA TU CUENTA</p>
                </div>
                <form className='form-sesion'>
                    <input className='input' type='text' name='nombreUsuario' 
                    onChange={(event) => {setRegisterNombre(event.target.value)}} placeholder='Nombre de Usuario' ></input>
                    
                    <input className='input' type='email' name='email' 
                    onChange={(event) => {setRegisterEmail(event.target.value)}} placeholder='Correo' required></input>
                    
                    <input className='input' type='password' name='contraseña' 
                    onChange={(event) => {setRegisterContraseña(event.target.value)}} placeholder='Contraseña' required></input>
                    
                    <input className='input' type='password' name='contraseña2' 
                    onChange={(event) => {setRegisterContraseña2(event.target.value)}} placeholder='Confirmar Contraseña' required></input>
                    
                    <input className='submit-button' type='submit' onClick={registrarUsuario} value='REGISTRAR'></input>
                </form>
                <div className='link-signup'>
                    <a href='/'>Inicia sesión</a>
                </div>
            </div>
        </div>
    );
}