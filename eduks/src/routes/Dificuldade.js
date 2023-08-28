import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate} from 'react-router-dom';

import { SharedNumberContext } from '../App';
import { QuantidadeMiniGamesContext } from '../App';


const Dificuldade = () =>{

    const navigate = useNavigate();
    let { sharedNumber, setSharedNumber } = useContext(SharedNumberContext);
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);

    function aleatorio(max) {
        return Math.floor(Math.random() * max);
    }

    function gerarProximaUrl(){
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
    
    let url;
    function proximoMiniGame(){ 
        url = gerarProximaUrl();
        navigate(url);
    }

    const cincoAtividades = () =>{
        setQuantidadeGames(5);
        setSharedNumber(0);
        proximoMiniGame();
        
    }

    const dezAtividades = () =>{
        setQuantidadeGames(10);
        setSharedNumber(0);
        proximoMiniGame();
    }

    const quinzeAtividades = () =>{
        setQuantidadeGames(15);
        setSharedNumber(0);
        proximoMiniGame();
    }
    return(
        <div className='App'>
            <div className='container'>
                <div className='row'>
                    <Header/>
                </div>

                <div className='row mt-5'>
                    <h1 className='text-black'>Quantas atividades você deseja fazer?</h1>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-2'></div>
                    <div className='col-md-2 mt-3'>
                        <Button conteudo="5" onClick={cincoAtividades}/>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2 mt-3'>
                        <Button conteudo="10" onClick={dezAtividades}/>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2 mt-3'>
                        <Button conteudo="15" onClick={quinzeAtividades}/>
                    </div>
                </div>
                <div className='row mt-1'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <h1>Total de estrelas: </h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-5'></div>
                    <div className='col-2'>
                        {/*
                        
                            aqui vai as estrelas totais que o usuario possui

                        */}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Dificuldade;