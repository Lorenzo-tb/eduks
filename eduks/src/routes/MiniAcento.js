import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reproduzir from "../img/reprodutor.png";


const MiniAcento = () =>{

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
                        <h2>2/5</h2>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10'>
                        <h1 className='text-dark'>Onde vai o acento desta palavra?</h1>
                    </div>
                </div>
                <div className='row pt-5'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
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
                        <h1 className='text-dark minha-palavra'>J A C A R E</h1>
                    </div>
                </div>

                <div className='row pt-5 mt-3'>
                    <div className='col-md-4 col-2'></div>
                    <div className='col-md-4 col-8'>
                        <div className='row'>
                            <div className='col-md-2 col-5'>
                                <button className='meu-botao'>
                                    <img className="imgReprodutor" src={imgreprodutor}/>
                                </button>
                                
                            </div>
                            <div className='col-md-10 col-7'>
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

export default MiniAcento;