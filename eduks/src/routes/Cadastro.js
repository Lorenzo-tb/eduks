import React, { useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Button from '../components/Button';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { IdUserContext, TokenContext } from '../App';
import axios from 'axios';
//import { SharedLoginContext } from '../App'

const Cadastro = () => {
    //const { sharedLogin, setSharedLogin } = useContext(SharedLoginContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { idUser, setIdUser } = useContext(IdUserContext);
    const {token, setToken} = useContext(TokenContext);

    //Pega os valores coletados e manda para a api
    const handleClickCadastro = async (values) => {
        try {
            const response = await axios.post('https://eduks-back-end.vercel.app/auth/register', {
                name: values.name,
                email: values.email,
                password: values.password,
                confirmpassword: values.confirmPassword
            });

            console.log(response.data);

            if (response.status === 201) {
                console.log(idUser);
                console.log(response.data.token);
                console.log(response.data.idUser);
                const usuarioId = response.data.idUser;
                const novoToken = response.data.token;
                setIdUser(usuarioId);
                setToken(novoToken);

                if (usuarioId === response.data.idUser) {
                    navigate('/dificuldade');
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data); // Isso deve conter detalhes sobre o erro
            } else {
                console.log('Erro desconhecido');
            }
        }
    };

    //Faz as validacoes das informacoes coletadas
    const validationCadastro = yup.object().shape({
        name: yup.string().required('Este campo é obrigatório'),
        email: yup.string().email('Este não é um email válido').required('Este campo é obrigatório'),
        password: yup.string().min(8, 'A senha deve conter pelo menos 8 caracteres').required('Este campo é obrigatório'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais').required('Este campo é obrigatório')
    });

    //opcao de ver senha ou deixar oculta
    function checkboxDois() {
        let checkbox = document.getElementById('checkboxDois');
        let inputUm = document.getElementById('senha');
        let inputDois = document.getElementById('conSenha');
        if (checkbox.checked) {
            inputUm.setAttribute('type', 'text');
            inputDois.setAttribute('type', 'text');
        } else {
            inputUm.setAttribute('type', 'password');
            inputDois.setAttribute('type', 'password');
        }
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <Header />
                </div>
                <Formik initialValues={{}} onSubmit={handleClickCadastro} validationSchema={validationCadastro}>
                    <Form>
                        <div className="inputs">
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field name="name" className="form-control" placeholder="Nome" />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage component="span" name="name" className="form-error" />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field name="email" className="form-control" placeholder="INSIRA SEU E-MAIL" />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage component="span" name="email" className="form-error" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field id="senha" type="password" name="password" className="form-control" placeholder="CRIE SUA SENHA" />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage component="span" name="password" className="form-error" />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field id="conSenha" type="password" name="confirmPassword" className="form-control" placeholder="CONFIRME SUA SENHA" />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage component="span" name="confirmPassword" className="form-error" />
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col-md-3"></div>
                                <div className="col-md-2 ">
                                    <div className="row">
                                        <div className="col-1">
                                            <input onClick={checkboxDois} type="checkbox" id="checkboxDois" />
                                        </div>
                                        <div className="col-10">
                                            <p className="reforco">Ver senha</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-4" id="cadastrar">
                                <Link to="/login">
                                    <h2 className="sublinhado">Já sou cadastrado</h2>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Button conteudo="Cadastrar" type="submit" />
                            </div>
                        </div>
                        {error && (
                            <div className="row mt-3">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Cadastro;
