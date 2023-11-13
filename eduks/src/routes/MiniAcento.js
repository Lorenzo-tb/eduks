import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import winSound from '../assets/win.wav';
import loseSound from '../assets/lose.wav';

import { SharedNumberContext } from '../App';
import { DificuldadeGamesContext } from '../App';
import { QuantidadeMiniGamesContext } from '../App';
import { AcertosContext } from '../App';

const MiniAcento = () => {

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
    //gera o caminho da proxima atividade jogada
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
        console.log(e.srcElement);

        if (e.srcElement.className === "correto botoes-letras fs-1") {
            console.log("teste 1");
            play(1);
            e.srcElement.style.color = "#1DD345";
            proximoMiniGame();
            setQuantidadeAcertos(quantidadeAcertos + 1);
        } else {
            console.log("teste 5")
            play(2);
            e.srcElement.style.color = "#D92F2F";
            proximoMiniGame()
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

    let palavra = "jacare";//pegara do banco
    let imagem = "https://images.vexels.com/media/users/3/162064/isolated/preview/97fb5a234433931f01b4e66f26fa9f24-crocodilo-jacare-mandibula-cauda-presa-achatada.png";//banco
    let casaErrada = 5;//ira pegar a casa errado do banco de dados
    let casaTeste = 0;
    useEffect(() => {
        casaTeste = 0;
        let divPai = document.getElementById("botoes");
        divPai.innerHTML = "";


        let palavraArray = palavra.split("");

        //cria um botao para cada letra da palavra puxada pelo banco
        for (let i = 0; i < palavraArray.length; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "col-1");

            let button = document.createElement("button");


            if (casaTeste === casaErrada) {
                button.setAttribute("class", "correto botoes-letras fs-1");
            } else {
                button.setAttribute("class", "errada botoes-letras fs-1");
            }

            let letra = document.createTextNode(palavraArray[i]);

            button.appendChild(letra);
            div.appendChild(button);

            divPai.appendChild(div);
            casaTeste++;
            button.addEventListener("click", tentativa);
        }

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
            <div className='row col-12'>
                <div className='row pt-4'>
                    <div className='col-5'></div>
                    <div className='col-2'>
                        <h2>{numeroAtividade}/{totalAtividade}</h2>
                    </div>
                </div>
                <div className="row">

                    <div className="col-2"></div>
                    <div className="col-8">
                        <h1 className='text-dark'>Onde vai o acento desta palavra?</h1>
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
                <div className="row pt-5" >
                    <div className="col-4"></div>
                    <div className="row col-8" id="botoes">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniAcento;