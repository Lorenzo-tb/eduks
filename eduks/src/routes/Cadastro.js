import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Input from "../components/Input"
import Button from "../components/Button";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Cadastro = () =>{


    function checkboxDois(){
        let checkbox = document.getElementById("checkboxDois");
        let inputUm = document.getElementById("senha")
        let inputDois = document.getElementById("conSenha");
        if(checkbox.checked){
            inputUm.setAttribute("type", "text");
            inputDois.setAttribute("type", "text");
        }else{
            inputUm.setAttribute("type", "password");
            inputDois.setAttribute("type", "password");
        }
    }

    return(
    <div className="App">
        <div className="container">
                <div className='row'>
                    <Header/>
                </div>
                    
                <div className='inputs'>
                    <form>
                        <div className='row'>
                            <div className='col-md-3'></div>
                            <Input type="text" placeHolder="INSIRA SEU NOME" id="nome" autocomplete="username"/>
                        </div>
                        <div className='row mt-3'>
                        <div className='col-md-3'></div>
                            <Input type="email" placeHolder="INSIRA SEU E-MAIL" id="email" autocomplete="username"/>
                        </div>

                        <div className='row mt-3'>
                        <div className='col-md-3'></div>
                            <Input type="password" placeHolder="CRIE SUA SENHA" id="senha" autocomplete="new-password"/>
                        </div>

                        <div className='row mt-3'>
                        <div className='col-md-3'></div>
                            <Input type="password" placeHolder="CONFIRME SUA SENHA" id="conSenha" autocomplete="new-password"/>
                            <div className="col-lg-2 ">
                                <div className='row'>
                                    <div className='col-1'>
                                        <input onClick={checkboxDois} type="checkbox" id='checkboxDois'/>
                                    </div>
                                    <div className='col-10'>
                                        <p className='reforco'>Ver senha</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    
                </div>
            <div className="row col-12">
                <div className="col-4" id="cadastrar">
                    <Link to="/login">
                        <h2 className="sublinhado">Ja sou cadastrado</h2>
                    </Link>
                </div>
                <div className='col-4'>
                    <Button conteudo="Cadastrar"/>
                </div>
                    
            </div>
        </div>           
    </div>
    );
}

export default Cadastro;