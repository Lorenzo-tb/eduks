import Header from "../components/Header";
import Button from "../components/Button";
import React, { useContext } from 'react';
import { useNavigate} from 'react-router-dom';

import { QuantidadeMiniGamesContext } from '../App';
import { AcertosContext } from '../App';

import umaEstrela from "../img/umaEstrela.png";
import duasEstrelas from "../img/duasEstrelas.png";
import tresEstrelas from "../img/tresEstrelas.png";
import nenhumaEstrela from "../img/nenhumaEstrela.png";
const FimAtividades = () =>{

    const navigate = useNavigate();
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);
    const {quantidadeAcertos, setQuantidadeAcertos} = useContext(AcertosContext);
    
    let estrelas;
    let parabenizacao;
        if(quantidadeAcertos == quantidadeGames){
            estrelas = tresEstrelas;
            parabenizacao = "PARABÉNS!"
        }
        else if(quantidadeAcertos <quantidadeGames && quantidadeAcertos > 0.5*quantidadeGames){
            estrelas = duasEstrelas;
            parabenizacao = "Bom, mas pode melhorar!"
        }
        else if(quantidadeAcertos <=0.5*quantidadeGames && quantidadeAcertos >0){
            estrelas = umaEstrela;
            parabenizacao = "Podia ter sido melhor!"
        }
        else{
            estrelas = nenhumaEstrela;
            parabenizacao = "Estude mais!"
        }

        function handleClick(){
            setQuantidadeAcertos(0);
            setQuantidadeGames(0);
            navigate("/dificuldade");
        }
    
    return(
        <div className='App'>
            <div className='container'>
                <div className='row'>
                    <Header/>
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <img className="minhas-estrelas" src={estrelas} alt="estrelas"/>
                    </div>
                </div>
                <div className='row mt-5'>
                    <h1 className='text-black'>{parabenizacao}</h1>
                </div>
                <div className='row mt-5'>
                    <div className='col-1 col-md-2'></div>
                    <div className='col-10 col-md-8'>
                        <Button conteudo='Fazer mais atividades!' onClick={handleClick}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FimAtividades;