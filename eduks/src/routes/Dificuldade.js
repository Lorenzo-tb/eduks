import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from 'react-router-dom';

import { SharedNumberContext } from '../App';
import { DificuldadeGamesContext } from '../App';
import { IdUserContext } from '../App';
import umaEstrelaUnica from '../img/umaEstrelaUnica.png'
import axios from 'axios';


const Dificuldade = () => {

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { dificuldadeGames, setDificuldadeGames } = useContext(DificuldadeGamesContext);

    const { idUser, setIdUser } = useContext(IdUserContext);
    const [name, setName] = useState("");
    const [stars, setStars] = useState(0);

    //gera numero aleatorio
    function aleatorio(max) {
        return Math.floor(Math.random() * max);
    }
    //gera a url da proxima atividade que o usuario ira jogar
    function gerarProximaUrl() {
        const proximoMiniGameUrl = aleatorio(3);

        switch (proximoMiniGameUrl) {
            case 0:
                return "/miniAcento";
                break;

            case 1:
                return "/miniOpcoes";
                break;

            case 2:
                return "/miniPalavra";
                break;

        }
    }

    let url;
    function proximoMiniGame() {
        url = gerarProximaUrl();
        navigate(url);
    }

    const facil = () => {
        setDificuldadeGames(25);
        setSharedNumber(0);
        proximoMiniGame();

    }

    const medio = () => {
        setDificuldadeGames(17);
        setSharedNumber(0);
        proximoMiniGame();
    }

    const dificil = () => {
        setDificuldadeGames(10);
        setSharedNumber(0);
        proximoMiniGame();
    }


    useEffect(() => {

        console.log(idUser);
        axios.get(`https://eduks-back-end.vercel.app/user/${idUser}`)
            .then((resp) => {
                setName(resp.data.user.name);
                setStars(resp.data.user.stars);
            })
    }, [])
    return (
        <div className='App'>
            <div className='container'>
                <div className='row'>
                    <Header />
                </div>

                <div className='row mt-2'>
                    <h1 className='text-black'>Olá {name}</h1>
                </div>
                <div className='row mt-3'>
                    <h1 className='text-black'>Dificuldade das atividades</h1>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-2'></div>
                    <div className='col-md-2 mt-3'>
                        <Button conteudo="Fácil" onClick={facil} />
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2 mt-3'>
                        <Button conteudo="Médio" onClick={medio} />
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2 mt-3'>
                        <Button conteudo="Difícil" onClick={dificil} />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <h1>Total de estrelas: </h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-5'></div>
                    <div className='col-2'>
                        <div className='row'>
                            <div className='col-6'>
                                <img src={umaEstrelaUnica} alt="estrelas" style={{ width: "8vw" }} />
                            </div>
                            <div className='col-6 d-flex align-items-center'>
                                <h1 className='text-center'>{stars}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dificuldade;