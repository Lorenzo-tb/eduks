import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import winSound from '../assets/win.wav';
import loseSound from '../assets/lose.wav';

import { SharedNumberContext } from '../App';
import { DificuldadeGamesContext } from '../App';
import { QuantidadeMiniGamesContext } from '../App';
import { AcertosContext } from '../App';
import axios from 'axios';

const MiniErro = () => {

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { dificuldadeGames, setDificuldadeGames } = useContext(DificuldadeGamesContext);

    const [tempoRestante, setTempoRestante] = useState(dificuldadeGames);
    const [temporizadorAtivo, setTemporizadorAtivo] = useState(true);

    const { quantidadeAcertos, setQuantidadeAcertos } = useContext(AcertosContext);
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);

    const numeroAtividade = sharedNumber;
    const totalAtividade = quantidadeGames;

    const quantidadeReal = quantidadeGames - 1;

    //gera numero aleatorio
    function aleatorio(max) {
        return Math.floor(Math.random() * max);
    }

    //gera o caminho da proxima atividade
    function gerarProximaUrl() {
        if (sharedNumber == quantidadeReal) {
            return "/fimAtividades";
        } else {
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
    }
    let url = gerarProximaUrl();

    function proximoMiniGame() {
        setSharedNumber(sharedNumber + 1);
        navigate(url);
    }

    function tentativa(e) {//testa a tentativa do usuario
        console.log(e.target);

        if (e.target.className === "correto botoes-letras fs-1") {
            console.log("teste 1");
            play(1);
            e.target.style.color = "#1DD345";
            proximoMiniGame();
            setQuantidadeAcertos(quantidadeAcertos + 1);
        } else {
            console.log("teste 5")
            play(2);
            e.target.style.color = "#D92F2F";
            proximoMiniGame();
        }
        setTemporizadorAtivo(false);
        pararTemporizador();
    }

    function play(teste) {
        if (teste === 1) {
            new Audio(winSound).play();
        }
        else {
            new Audio(loseSound).play();
        }
    }
    const [opcaoErrada, setOpcaoErrada] = useState("");//pegara do banco
    const [imagem, setImagem] = useState("");//do banco
    const [casaErrada, setCasaErrada] = useState();//ira pegar a casa errado do banco de dados
    const [casaTeste, setCasaTeste] = useState();
    const [palavraArray, setPalavraArray] = useState([]);


    function acabouTempo() {
        if (temporizadorAtivo) {
            let botoesCorretos = document.getElementsByClassName("correto botoes-letras fs-1");
            let botoesErrados = document.getElementsByClassName("errada botoes-letras fs-1");

            for (let i = 0; i < botoesCorretos.length; i++) {
                botoesCorretos[i].style.color = "#1DD345";
            }

            for (let i = 0; i < botoesErrados.length; i++) {
                botoesErrados[i].style.color = "#D92F2F";
            }
            play(2);
            proximoMiniGame();
        }
    }

    let timerId;
    function iniciarTemporizador() {
        const delay = dificuldadeGames * 1000;
        timerId = setTimeout(() => {
            if (temporizadorAtivo) {
                acabouTempo();
            }
        }, delay);
    }

    function pararTemporizador() {
        clearTimeout(timerId);
    }

    useEffect(() => {
        axios.get('https://eduks-back-end.vercel.app/getObjeto')
            .then((resp) => {
                setImagem(resp.data[0].img);
                setOpcaoErrada(resp.data[0].opcaoErrada);
                setCasaErrada(resp.data[0].casaErrada);
                setPalavraArray(resp.data[0].opcaoErrada.split(""));
            });

        iniciarTemporizador();
const intervalId = setInterval(() => {
        if (temporizadorAtivo) {
            setTempoRestante((prevTempo) => prevTempo - 1);
        }
    }, 1000);

    return () => {
        clearInterval(intervalId);
        pararTemporizador();
    };

    }, [temporizadorAtivo]);

    return (
        <div className="App">
            <div className="row col-12">
                <div className='row pt-4'>
                    <div className='col-5'></div>
                    <div className='col-2'>
                        <h2>{numeroAtividade}/{totalAtividade}</h2>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <h1 className='text-dark'>Clique no erro da palavra:</h1>
                    </div>
                </div>
                <div>
                    <div className="temporizador">Tempo Restante: {tempoRestante} segundos</div>
                </div>
                <div className="row mt-5">
                    <div className="col-5"></div>
                    <div className="col-2">
                        <img className="minha-imagem" src={imagem}></img>
                    </div>
                </div>
                <div className="row mt-5 pt-5" >
                    <div className="col-4"></div>
                    <div className="row col-12 justify-content-center mt-4" id="botoes">
                        {palavraArray.map((item, index) => (
                            <div className="col-1" key={index}>
                                {index === casaErrada ? (
                                    <button className="correto botoes-letras fs-1" onClick={tentativa}>{item}</button>
                                ) : (
                                    <button className="errada botoes-letras fs-1" onClick={tentativa}>{item}</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MiniErro;