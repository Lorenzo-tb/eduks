import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Button from "../components/Button";

const Dificuldade = () =>{
    return(
        <div className='App'>
            <div className='container'>
                <div className='row'>
                    <Header/>
                </div>

                <div className='row mt-5'>
                    <h1 className='text-black'>Qual dificuldade das atividades?</h1>
                </div>

                <div className='row mt-3'>
                    <div className='col-md-2'></div>
                    <div className='col-md-2'>
                        <Button conteudo="Facil"/>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2'>
                        <Button conteudo="Medio"/>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2'>
                        <Button conteudo="Dificil"/>
                    </div>
                </div>
                <div className='row mt-5'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <Button conteudo="Ver total de estrelas"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dificuldade;