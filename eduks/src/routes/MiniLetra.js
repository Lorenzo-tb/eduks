import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import reproduzir from "../img/reprodutor.png";


const MiniLetra = () =>{

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
                    <div className='col-md-10 '>
                        <h1 className='text-dark'>Complete a palavra:</h1>
                    </div>
                </div>
                <div className='row pt-5'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        <img className="imgAtividades" src=''/>{/*imagem que o banco de dados retorna*/}
                    </div>
                </div>

                <div className='row pt-5 mt-5'>
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        {/* 
                        
                            forEach que gere um botao para cada letra

                        */}
                        {/*exemplo*/}
                        <h1 className='text-dark minha-palavra'>B O L _</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniLetra;
