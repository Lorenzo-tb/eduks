import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import winSound from '../assets/win.wav';
import loseSound from '../assets/lose.wav';

import { SharedNumberContext } from '../App';
import { QuantidadeMiniGamesContext } from '../App';
import { AcertosContext } from '../App';

const MiniOpcoes = () =>{

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);
    const {quantidadeAcertos, setQuantidadeAcertos} = useContext(AcertosContext);

    const numeroAtividade = sharedNumber;
    const totalAtividade = quantidadeGames;

    const quantidadeReal = quantidadeGames-1;

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
                    return "/miniAcento";
                    break;

                case 2:
                    return "/miniPalavra";
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

    function aleatorio(max) {
        return Math.floor(Math.random() * max);
    }
    let ordem = aleatorio(2);

    function play(teste){
        if(teste === 1){
        new Audio(winSound).play();
        }else{
            new Audio(loseSound).play();
        }
    }

    function tentativa(e){
        if(e.srcElement.id === "correto"){//teste se clicou no botao correto

            console.log(e.srcElement);
            console.log("correto");
            play(1);
            e.srcElement.style.backgroundColor = "#1DD345";
            proximoMiniGame();
            setQuantidadeAcertos(quantidadeAcertos+1);
        }else{
            console.log(e.srcElement);
            console.log("errado");
            play(2);
            e.srcElement.style.backgroundColor = "#D92F2F";
            proximoMiniGame();
        }
    }

    let i = 0;
    let nome = "CACHORRO";//puxa do banco
    let imagem = "https://i.pinimg.com/originals/55/e6/8e/55e68e106b05593ee2affdae805462ff.png";//banco
    let opcaoErrada = "CAXORRO";//puxa do banco;
    useEffect(() => {//isto faz pegar os elementos so depois de renderixados na tela

        let espacoUm = document.getElementById("botaoUm");
        let espacoDois = document.getElementById("botaoDois");

        let btnUm = document.createElement("button");
        btnUm.setAttribute("class", "meu-btn");
        btnUm.setAttribute("id", "correto");
        btnUm.appendChild(document.createTextNode(nome));
        btnUm.style.backgroundColor = "#1DA7D3";
        btnUm.style.color = "#fff";
        btnUm.addEventListener("click", tentativa);

        let btnDois = document.createElement("button");
        btnDois.setAttribute("class", "meu-btn");
        btnDois.setAttribute("id", "errado");
        btnDois.appendChild(document.createTextNode(opcaoErrada));
        btnDois.style.backgroundColor = "#1DA7D3";
        btnDois.style.color = "#fff";
        btnDois.addEventListener("click", tentativa);

        if(i == 0){
            if (ordem === 0) {
                espacoUm.appendChild(btnUm);
                espacoDois.appendChild(btnDois);
            } else {
                espacoUm.appendChild(btnDois);
                espacoDois.appendChild(btnUm);
            }
        }
        i++;
    
    }, []);

    return (
        <div className="App row col-12">
            <div className='row pt-4'>
                <div className='col-5'></div>
                <div className='col-2'>
                    <h2>{numeroAtividade}/{totalAtividade}</h2>
                </div>
            </div>
            <div className='row pt-2'>
                <div className='col-5'></div>
                <div className='col-2'>
                    <img className='minha-imagem' src={imagem}></img>
                </div>
            </div>
            <div className="row mt-5">
                <h1 className='text-dark' >Qual das opções esta escrita corretamente?</h1>
            </div>
            <div className="row fs-2">
                {/*aqui vai os botoes de opcoes*/}
                <div className="col-md-2"></div>
                <div className="col-md-3" id="botaoUm">
                    {/*botao 1*/}
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-3" id="botaoDois">
                    {/*botao 2*/}
                </div>
            </div>
        </div>
    );
}

export default MiniOpcoes;