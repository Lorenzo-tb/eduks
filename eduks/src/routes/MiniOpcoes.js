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

const MiniOpcoes = () => {

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);
    const { quantidadeAcertos, setQuantidadeAcertos } = useContext(AcertosContext);

    const { dificuldadeGames, setDificuldadeGames } = useContext(DificuldadeGamesContext);
    const [tempoRestante, setTempoRestante] = useState(dificuldadeGames);
    const [temporizadorAtivo, setTemporizadorAtivo] = useState(true);
    const [ordemOpcoes, setOrdemOpcoes] = useState(aleatorio(2));

    const numeroAtividade = sharedNumber;
    const totalAtividade = quantidadeGames;

    const quantidadeReal = quantidadeGames - 1;

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
                    return "/miniAcento";
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

    //gera um numero aleatorio
    function aleatorio(max) {
        return Math.floor(Math.random() * max);
    }


    function play(teste) {
        if (teste === 1) {
            new Audio(winSound).play();
        } else {
            new Audio(loseSound).play();
        }
    }

    //faz o teste se o jogador clicou na opcao correta
    function tentativa(e) {
        if (e.target.id === "correto") {//teste se clicou no botao correto

            console.log(e.target);
            console.log("correto");
            play(1);
            e.target.style.backgroundColor = "#1DD345";
            proximoMiniGame();
            setQuantidadeAcertos(quantidadeAcertos + 1);
        } else {
            console.log(e.target);
            console.log("errado");
            play(2);
            e.target.style.backgroundColor = "#D92F2F";
            proximoMiniGame();
        }
        setTemporizadorAtivo(false);
        pararTemporizador();
    }

    const [nome, setNome] = useState("");//puxa do banco
    const [imagem, setImagem] = useState("");//banco
    const [opcaoErrada, setOpcaoErrada] = useState("");//puxa do banco;

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

    useEffect(() => {//isto faz pegar os elementos so depois de renderixados na tela

        //coloca as opcoes de respostas nos botoes
        axios.get('https://eduks-back-end.vercel.app/getObjeto')
            .then((resp) => {
                console.log(resp.data[0]);
                console.log(resp.data[0].nome);
                setNome(resp.data[0].nome);
                console.log(resp.data[0].img);
                setImagem(resp.data[0].img);
                console.log(resp.data[0].opcaoErrada);
                setOpcaoErrada(resp.data[0].opcaoErrada);
            })

        setOrdemOpcoes(aleatorio(2));

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

    function renderizarBotoes() {
        if (ordemOpcoes === 0) {
            return (
                <div className="row fs-2 mt-3">
                    {/*aqui vai os botoes de opcoes*/}
                    <div className="col-md-2 col-2"></div>
                    <div className="col-md-3 col-9 mt-3" id="botaoUm">
                        <button class="meu-btn" id="errado" onClick={tentativa} style={{ backgroundColor: "#1DA7D3", color: "#fff" }}>{opcaoErrada}</button>
                    </div>
                    <div className="col-md-2 col-2"></div>
                    <div className="col-md-3 col-9 mt-3" id="botaoDois">
                        <button class="meu-btn" id="correto" onClick={tentativa} style={{ backgroundColor: "#1DA7D3", color: "#fff" }}>{nome}</button>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="row fs-2 mt-3">
                    {/*aqui vai os botoes de opcoes*/}
                    <div className="col-md-2 col-2"></div>
                    <div className="col-md-3 col-9 mt-3" id="botaoUm">
                        <button class="meu-btn" id="correto" onClick={tentativa} style={{ backgroundColor: "#1DA7D3", color: "#fff" }}>{nome}</button>
                    </div>
                    <div className="col-md-2 col-2"></div>
                    <div className="col-md-3 col-9 mt-3" id="botaoDois">
                        <button class="meu-btn" id="errado" onClick={tentativa} style={{ backgroundColor: "#1DA7D3", color: "#fff" }}>{opcaoErrada}</button>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="App">
            <div className='row col-12'>
                <div className='row pt-4'>
                    <div className='col-5'></div>
                    <div className='col-2'>
                        <h2>{numeroAtividade}/{totalAtividade}</h2>
                    </div>
                </div>
                <div className='row pt-2'>
                    <div className='col-5'></div>
                    <div className='col-2'>
                        <img className='minha-imagem' src={imagem} />
                    </div>
                </div>
                <div className="row mt-5">
                    <h1 className='text-dark' >Qual das opções esta escrita corretamente?</h1>
                </div>
                <div>
                    <div className="temporizador">Tempo Restante: {tempoRestante} segundos</div>
                </div>
                {renderizarBotoes()}
            </div>

        </div>
    );
}

export default MiniOpcoes;