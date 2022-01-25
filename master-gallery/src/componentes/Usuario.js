import React, { useState, useEffect } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { getAuth, signOut } from 'firebase/auth'
import firebaseApp from '../config/Firebase_config';
import { getFirestore, doc, setDoc, collection, query, getDocs, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import validarTipoImagen from './comprobarImagen.js';
//import { Favorite } from '@mui/icons-material';
//import { Upload } from '@mui/icons-material';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default function Usuario( props ) {

    const [archivo, setArchivo] = useState("");
    const [barraCarga, setBarraCarga] = useState(0);
    const [imgList, setImgList] = useState([]);

    useEffect( async () =>{
        const q = query(collection(firestore, `imagenes-${props.user.email}`));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => { setImgList( oldArray => [...oldArray, doc.data()] ) });
    }, [] );

    const subirImagen = async () => {
        if( archivo ) {
            if(validarTipoImagen(archivo.type)) {
                setBarraCarga(10);
    
                const storageRef = ref(storage, `/imagenes/imagenes-${props.user.email}/${archivo.name}`);
                await uploadBytes(storageRef, archivo);
                setBarraCarga(30);
    
                const enlaceUrl = await getDownloadURL(storageRef);
                setBarraCarga(60);
    
                const docuRef = doc(firestore, `/imagenes-${props.user.email}/${archivo.name}`);
                await setDoc(docuRef, { nombre: archivo.name, url: enlaceUrl });
                setBarraCarga(100);

                window.location.href = './';
            }else{
                alert('Por favor, Inserte una imagen');
            }
        }else{
            alert('Por favor, Inserte una imagen');
        }
    }

    const eliminarImagen = async ( nombre ) => {
        setBarraCarga(10);
        //eliminando imagen del storage
        const deleteRef = ref(storage, `/imagenes/imagenes-${props.user.email}/${nombre}`);
        await deleteObject(deleteRef);

        setBarraCarga(50);
        //eliminando el documento de la imagen del firestore
        await deleteDoc(doc(firestore, `imagenes-${props.user.email}`, `${nombre}`));

        setBarraCarga(100);
        window.location.href = './';
    }

    const cerrarSesion = () => {
        signOut(auth);
        window.location.href = './';
    }
    

    return (
        <>
            <Overlay>
                <ContenedorModal>
                    <Encabezado>
                        <h4>Bienvenido {props.user.displayName.toUpperCase()}, esta es su colección de imagenes</h4>
                    </Encabezado>
                    <BotonCerrar onClick={cerrarSesion}> <img src='./imagenes/icono-cerrar.svg'></img> </BotonCerrar>
                    <ContenedorImagenes>
                        { imgList.map( (data) => {return ( 
                        <DivImagen> 
                            <Imagen key={data.url} src={data.url} ></Imagen> 
                            <BotonEliminar onClick={ () => eliminarImagen(data.nombre) } >x</BotonEliminar> 
                        </DivImagen> )} ) }
                        
                    </ContenedorImagenes>
                    <ContenedorInput>
                        <input type='file' onChange={(event) => {setArchivo(event.target.files[0])}}></input>
                        <progress value={barraCarga} max={100}></progress>
                        <BotonSubir onClick={subirImagen}> <img src='./imagenes/upload.svg'></img> </BotonSubir>
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


const button = styled.button`
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

const BotonCerrar = styled(button)`
    position: absolute;
    top: 15px;
    right: 15px;
    height: 35px;
    width: 35px;
`;

const ContenedorImagenes = styled.div`
    width: 100%;
    height: 80%;
    background-color: #EBEBEB;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    column-gap: 10px;
    row-gap: 10px;
    overflow-y: scroll;
`;

const DivImagen = styled.div`
    position: relative;
    max-width: 33%;
    height: 25%;
    flex-grow: 1;
`;

const Imagen = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:hover{
        box-sizing: border-box;
        border: 3px solid #B81BD6; 
    }

`;


const BotonEliminar = styled(button)`
    position: absolute;
    top: 3px;
    right: 3px;
    height: 20px;
    width: 20px;
    background: rgba(255, 255, 255, .5);
`;


const ContenedorInput = styled.div`
    display: flex;
    height: 10%;
    align-items: center;
    justify-content: space-between;
`;

const BotonSubir = styled(button)`
    height: 35px;
    width: 35px;
`;
