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

const MiniPalavra = () => {

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);
    const { quantidadeAcertos, setQuantidadeAcertos } = useContext(AcertosContext);

    const { dificuldadeGames, setDificuldadeGames } = useContext(DificuldadeGamesContext);
    const [tempoRestante, setTempoRestante] = useState(dificuldadeGames);
    const [temporizadorAtivo, setTemporizadorAtivo] = useState(true);

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
                    return "/miniErro";
                    break;

                case 1:
                    return "/miniOpcoes";
                    break;

                case 2:
                    return "/miniAcento";
                    break;
            }
        }
    }

    let url = gerarProximaUrl();

    function proximoMiniGame() {
        setSharedNumber(sharedNumber + 1);
        navigate(url);
    }


    const [palavraCerta, setPalavraCerta] = useState("");//puxara do banco
    const [imagem, setImagem] = useState("");//banco

    //mostra a palavra escrita da forma correta caso o usuario erre
    function formaCorreta() {//mostra a forma correta caso esteja escrito da forma errada
        let div = document.getElementById("formaCorreta");

        let h4 = document.createElement("h4");
        h4.appendChild(document.createTextNode("Forma correta: "));
        h4.setAttribute("class", "col-md-5 col-6");

        let h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(palavraCerta.toUpperCase()));
        h2.setAttribute("class", "col-md-6 col-6");
        h2.style.color = "#1DD345"

        div.appendChild(h4);
        div.appendChild(h2);
    }

    function play(teste) {
        if (teste === 1) {
            new Audio(winSound).play();
        }
        else {
            new Audio(loseSound).play();
        }
    }

    function handleClick() {//faz o teste para saber se o usuario escreveu de forma correta
        let input = document.getElementById("input");
        let palavraTentada = input.value.toLowerCase();
        console.log(palavraTentada);
        console.log(palavraCerta)
        if (palavraTentada === palavraCerta) {
            play(1);
            input.style.color = "#1DD345";
            proximoMiniGame();
            setQuantidadeAcertos(quantidadeAcertos + 1);
        } else {
            play(2);
            input.style.color = "#D92F2F";
            formaCorreta();
            proximoMiniGame();
        }
        setTemporizadorAtivo(false);
        pararTemporizador();
    }

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
                console.log(resp.data[0]);
                console.log(resp.data[0].nome);
                setPalavraCerta(resp.data[0].nome);
                console.log(resp.data[0].img);
                setImagem(resp.data[0].img);
            })

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
                        <h2>{numeroAtividade}/{quantidadeGames}</h2>
                    </div>
                </div>
                <div className="row">
                    <h1 className='text-dark'>O que é isso?</h1>
                </div>
                <div>
                    <div className="temporizador">Tempo Restante: {tempoRestante} segundos</div>
                </div>
                <div className="row mt-5">
                    <div className="col-5"></div>
                    <div className="col-2">
                        <img className="minha-imagem" src={imagem} />
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-md-3 col-1"></div>
                    <div className="col-md-6 fs-1 col-11">
                        <input className="inputTeste" id="input" type="text"></input>
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-md-4"></div>
                    <div className="row col-md-4" id="formaCorreta">
                    </div>
                </div>

                <div className="row mg-2">
                    <div className="col-md-4 col-2"></div>
                    <div className="col-md-4 col-9">
                        <button onClick={handleClick} className="botaoTeste fs-2">Corrigir</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MiniPalavra;