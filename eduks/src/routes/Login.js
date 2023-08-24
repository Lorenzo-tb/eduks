import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Input from "../components/Input"
import Button from "../components/Button";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Login = () =>{

    function checkboxUm(){
        let checkbox = document.getElementById("checkboxUm");
        let input = document.getElementById("senha");
        if(checkbox.checked){
            input.setAttribute("type", "text");
        }else{
            input.setAttribute("type", "password");
        }
    }
    return(
        
        <div className='App'>
            
            <div className="container">
                <div className='row'>
                    <Header/>
                </div>
            
                <div className="row">
                    <div className='col-md-1'></div>
                    <div className="col-md-3 reforco">
                        <h2>O reforço de Português que você procurava</h2>
                    </div>
                </div> 
                <form>
                    <div className='inputs'>
                        
                            <div className='row'>
                            <div className='col-md-3'></div>
                                <Input type="email" placeHolder="E-MAIL" id="email" autocomplete="username"/>
                            </div>
                            <div className='row mt-3'>
                            <div className='col-md-3'></div>
                                <Input type="password" placeHolder="SENHA" id="senha" autocomplete="current-password"/>
                                <div className="col-lg-2 ">
                                    <div className='row'>
                                        <div className='col-1'>
                                            <input onClick={checkboxUm} type="checkbox" id='checkboxUm'/>
                                        </div>
                                        <div className='col-10'>
                                            <p className='reforco'>Ver senha</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        
                    </div>

                    <div className="row col-12">
                        <div className="col-4" id="cadastrar">
                        <Link to="/cadastro">
                            <h2 className="sublinhado">Cadastrar</h2>
                        </Link>
                        </div>
                        <div className='col-4'>
                            <Button conteudo="Entrar" type="submit"/>
                        </div>
                    
                    </div>
                </form>
                
            </div>
        </div>
        
    );
}

export default Login;