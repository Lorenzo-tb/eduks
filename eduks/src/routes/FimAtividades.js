import Header from "../components/Header";
import Button from "../components/Button";
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { QuantidadeMiniGamesContext } from '../App';
import { AcertosContext } from '../App';
import { IdUserContext } from '../App';

import umaEstrela from "../img/umaEstrela.png";
import duasEstrelas from "../img/duasEstrelas.png";
import tresEstrelas from "../img/tresEstrelas.png";
import nenhumaEstrela from "../img/nenhumaEstrela.png";
import axios from "axios";
const FimAtividades = () => {

    const navigate = useNavigate();
    const { quantidadeGames, setQuantidadeGames } = useContext(QuantidadeMiniGamesContext);
    const { quantidadeAcertos, setQuantidadeAcertos } = useContext(AcertosContext);
    const { idUser, setIdUser } = useContext(IdUserContext);
    const [stars, setStars] = useState(0);
    const [moreStars, setMoreStars] = useState(0);

    const [estrelas, setEstrelas] = useState();
    const [parabenizacao, setParabenizacao] = useState();
    const [estrelasTotais, setEstrelasTotais] = useState();

    //Manda de volta para a aba de escolher o numero de atividades e atualiza o numero de estrelas
    async function handleClick() {
        setQuantidadeAcertos(0);
        console.log(stars + moreStars);

        try {
            const response = await axios.put(`https://eduks-back-end.vercel.app/${idUser}/atualizarEstrelas`, {
                stars: stars + moreStars
            })

            if (response.status === 200) {
                navigate("/dificuldade");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log(idUser);
        axios.get(`https://eduks-back-end.vercel.app/user/${idUser}`)
            .then((resp) => {
                setStars(resp.data.user.stars);
            })
            .then((resp) => {

                console.log(quantidadeAcertos);
                console.log(quantidadeGames)
                //Faz as validacoes de quantas estrelas o usuario deve ganhar equivalente aos seus acertos
                if (quantidadeAcertos == quantidadeGames) {
                    setMoreStars(3);
                    setEstrelas(tresEstrelas);
                    setParabenizacao("PARABÉNS!");
                }
                else if (quantidadeAcertos < quantidadeGames && quantidadeAcertos > 0.5 * quantidadeGames) {

                    setMoreStars(2);
                    setEstrelas(duasEstrelas);
                    setParabenizacao("Bom, mas pode melhorar!");
                }
                else if (quantidadeAcertos <= 0.5 * quantidadeGames && quantidadeAcertos > 0) {
                    setMoreStars(1);
                    setEstrelas(umaEstrela);
                    setParabenizacao("Podia ter sido melhor!");
                }
                else {
                    setMoreStars(0);
                    setEstrelas(nenhumaEstrela);
                    setParabenizacao("Estude mais!");
                }
            })

    }, [])
    return (
        <div className='App'>
            <div className='container'>
                <div className='row'>
                    <Header />
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <img className="minhas-estrelas" src={estrelas} alt="estrelas" />
                    </div>
                </div>
                <div className='row mt-5'>
                    <h1 className='text-black'>{parabenizacao}</h1>
                </div>
                <div className='row mt-5'>
                    <div className='col-1 col-md-2'></div>
                    <div className='col-10 col-md-8'>
                        <Button conteudo='Fazer mais atividades!' onClick={handleClick} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FimAtividades;