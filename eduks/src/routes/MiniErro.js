import React, { useContext, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import winSound from '../assets/win.wav';
import loseSound from '../assets/lose.wav';

import { SharedNumberContext } from '../App';
import { QuantidadeMiniGamesContext } from '../App';
import { AcertosContext } from '../App';

const MiniErro = () =>{

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);
    const {quantidadeAcertos, setQuantidadeAcertos} = useContext(AcertosContext);

    const numeroAtividade = sharedNumber;
    const totalAtividade = quantidadeGames;

    const quantidadeReal = quantidadeGames-1;

    function aleatorio(max) {
        return Math.floor(Math.random() * max);
    }
    function gerarProximaUrl(){
        if(sharedNumber == quantidadeReal){
            return "/fimAtividades";
        }else{
            const proximoMiniGameUrl = aleatorio(3);
            switch(proximoMiniGameUrl){
                case 0 : 
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

    function proximoMiniGame(){
        setSharedNumber(sharedNumber+1);
        setTimeout( () =>{
            navigate(url);
        }, 2000);
    }

    

    function tentativa(e){//testa a tentativa do usuario
        console.log(e.srcElement);
    
        if(e.srcElement.className === "correto botoes-letras fs-1"){
            console.log("teste 1");
            play(1);
            e.srcElement.style.color = "#1DD345";
            proximoMiniGame();
            setQuantidadeAcertos(quantidadeAcertos+1);
        }else{
            console.log("teste 5")
            play(2);
            e.srcElement.style.color = "#D92F2F";
            proximoMiniGame();
        }
    }

    function play(teste){
        if(teste === 1){
            new Audio(winSound).play();
        }
            else{
        new Audio(loseSound).play();
        }
    }
    let palavra = "abelia";//pegara do banco
    let imagem = "https://greenpng.com/wp-content/uploads/2020/06/desenho-abelha-png-300x300.png";//do banco
    let casaErrada = 4;//ira pegar a casa errado do banco de dados
    let casaTeste = 0;
    useEffect(()=>{
        casaTeste = 0;
        let divPai = document.getElementById("botoes");
        divPai.innerHTML = "";
    
        
        let palavraArray = palavra.split("");

        for(let i=0; i<palavraArray.length; i++){
            let div = document.createElement("div");
            div.setAttribute("class", "col-1");

            let button = document.createElement("button");

        
            if(casaTeste === casaErrada){
                button.setAttribute("class", "correto botoes-letras fs-1");
            }else{
                button.setAttribute("class", "errada botoes-letras fs-1");
            }
    
            let letra = document.createTextNode(palavraArray[i]);

            button.appendChild(letra);
            div.appendChild(button);

            divPai.appendChild(div);
            casaTeste++;
            button.addEventListener("click", tentativa);
        }
    }, [])
    return(
        <div className="App row col-12">
            <div className='row pt-4'>
                <div className='col-5'></div>
                <div className='col-2'>
                    <h2>{numeroAtividade}/{totalAtividade}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h1 className='text-dark'>Clique no erro da palavra:</h1>
                </div>
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
    );
}

export default MiniErro;