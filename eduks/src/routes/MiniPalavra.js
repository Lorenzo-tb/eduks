import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import winSound from '../assets/win.wav';
import loseSound from '../assets/lose.wav';

import { SharedNumberContext } from '../App';
import { QuantidadeMiniGamesContext } from '../App';
import { AcertosContext } from '../App';

const MiniPalavra = () =>{

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);
    const {quantidadeAcertos, setQuantidadeAcertos} = useContext(AcertosContext);

    const numeroAtividade = sharedNumber;
    const totalAtividade = quantidadeGames;

    const quantidadeReal = quantidadeGames-1;

    //gera numero aleatorio
    function aleatorio(max) {
        return Math.floor(Math.random() * max);
    }

    //gera o caminho da proxima atividade
    function gerarProximaUrl(){
        if(sharedNumber == quantidadeReal){
            return "/fimAtividades";
        }else{
            const proximoMiniGameUrl = aleatorio(3);
            switch(proximoMiniGameUrl){
                case 0 : 
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

    function proximoMiniGame(){
        setSharedNumber(sharedNumber+1);
        setTimeout( () =>{
            navigate(url);
        }, 2000);
    }

    let palavraCerta = "estrela";//puxara do banco
    let imagem = "https://i0.wp.com/multarte.com.br/wp-content/uploads/2020/05/estrela-fundo-transparente2.png?resize=696%2C709&ssl=1";//banco

    //mostra a palavra escrita da forma correta caso o usuario erre
    function formaCorreta(){//mostra a forma correta caso esteja escrito da forma errada
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

    function play(teste){
        if(teste === 1){
            new Audio(winSound).play();
        }
        else{
            new Audio(loseSound).play();
        }
    }

    function handleClick(){//faz o teste para saber se o usuario escreveu de forma correta
        let input = document.getElementById("input");
        let palavraTentada = input.value.toLowerCase();
        console.log(palavraTentada);
        console.log(palavraCerta)
        if(palavraTentada === palavraCerta){
            play(1);
            input.style.color = "#1DD345";
            proximoMiniGame();
            setQuantidadeAcertos(quantidadeAcertos+1);
        }else{
            play(2);
            input.style.color = "#D92F2F";
            formaCorreta();
            proximoMiniGame();
        }

    }

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
                <div className="row mt-5">
                    <div className="col-5"></div>
                    <div className="col-2">
                        <img className="minha-imagem" src={imagem}></img>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-md-3"></div>
                    <div className="col-md-6 fs-1">
                        <input className="inputTeste" id="input" type="text"></input>
                    </div>
                </div>

                <div className="row mt-1">
                    <div className="col-md-4"></div>
                    <div className="row col-md-4" id="formaCorreta">
                        
                        {/*preenchido por js.*/}

                    </div>
                </div>
                
                <div className="row mg-2">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <button onClick={handleClick} className="botaoTeste fs-2">Corrigir</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default MiniPalavra;