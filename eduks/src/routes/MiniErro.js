import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "../components/Button";
import reproduzir from "../img/reprodutor.png";


const MiniErro = () =>{

    const imgreprodutor = reproduzir;

    return(
        <div className='App'>
            <div className='container'>
                <div className='row pt-4'>
                    <div className='col-5'></div>
                    <div className='col-2'>
                        {/*

                            Aqui vai o numero da atividade 
                            ex: 1/5

                        */}
                        <h3>2/5</h3>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10'>
                        <h2 className='text-dark'>Qual das opcoes esta escrita corretamente?</h2>
                    </div>
                </div>
                <div className='row pt-5'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <img className="imgAtividades" src=''/>{/*imagem que o banco de dados retorna*/}
                    </div>
                </div>

                <div className='row pt-5'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        {/* 
                        
                            forEach que gere um botao para cada letra

                        */}
                        {/*exemplo*/}
                        <h1 className='text-dark minha-palavra'>A B E L I A</h1>
                    </div>
                </div>

                <div className='row pt-5 mt-5'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <div className='row'>
                            <div className='col-2'>
                                <button className='meu-botao'>
                                    <img className="imgReprodutor" src={imgreprodutor}/>
                                </button>
                                
                            </div>
                            <div className='col-10'>
                                <div className='row'>
                                    <h1 className='text-dark'>SOM DA</h1>
                                </div>
                                <div className='row'>
                                    <h1 className='text-dark'>PALAVRA</h1>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniErro;