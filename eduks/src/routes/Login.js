import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../components/Header";
import Button from "../components/Button";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Login = () =>{

    const handleClickLogin = (values)=>{
        console.log(values);
    };

    function checkboxUm(){
        let checkbox = document.getElementById("checkboxUm");
        let input = document.getElementById("senha");
        if(checkbox.checked){
            input.setAttribute("type", "text");
        }else{
            input.setAttribute("type", "password");
        }
    };
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
                <Formik initialValues={{}} onSubmit={handleClickLogin} /*validationSchema={validationLogin}*/>
                    <Form>
                        <div className='inputs'>
                        
                            <div className='row'>
                            <div className='col-md-3'></div>
                            <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field name="email" className="form-control" placeholder="E-MAIL"/>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage component="span" name="email" className="form-error"/>
                                </div>
                            </div>

                            <div className='row mt-3'>
                                <div className='col-md-3'></div>
                                <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field type="password" id="senha" name="password" className="form-control" placeholder="SENHA"/>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage component="span" name="password" className="form-error"/>
                                </div>
                            </div>
                            <div className='row mt-1'>
                                <div className='col-md-3'></div>
                                <div className="col-md-2 ">
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
                            <div className='col-md-4'>
                                <Button conteudo="Entrar" type="submit"/>
                            </div>
                        
                        </div>
                    </Form>
                </Formik>
                
            </div>
        </div>
        
    );
}

export default Login;