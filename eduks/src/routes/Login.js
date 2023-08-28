import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Button from '../components/Button';
import axios from 'axios';
//import { SharedLoginContext } from '../App'

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    //const { sharedLogin, setSharedLogin } = useContext(SharedLoginContext);

    //Pega as informacoes coletadas e manda para a api
    const handleClickLogin = async (values) => {
        try {
            const response = await axios.post('https://eduks-backend-render.onrender.com/auth/login', {
                email: values.email,
                password: values.password
            });

            if (response.status === 200) {
                //setSharedLogin(true);
                navigate('/dificuldade');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.msg);
            } else {
                setErrorMessage('Erro ao fazer login. Por favor, tente novamente mais tarde.');
            }
        }
    };

    //torna a senha visivel ou invisivel
    const checkbox = () => {
        let checkbox = document.getElementById('checkboxUm');
        let inputUm = document.getElementById('senha');
        if (checkbox.checked) {
            inputUm.setAttribute('type', 'text');
        } else {
            inputUm.setAttribute('type', 'password');
        }
    };

    //Faz as validacoes das informacoes coletadas
    const validationSchema = yup.object().shape({
        email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
        password: yup.string().required('A senha é obrigatória'),
    });

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <Header />
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-3 reforco">
                        <h2>O reforço de Português que você procurava</h2>
                    </div>
                </div>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={handleClickLogin}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <div className="inputs">
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="E-MAIL"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage
                                        component="span"
                                        name="email"
                                        className="form-error"
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="input-group input-group-lg">
                                        <Field
                                            type="password"
                                            id="senha"
                                            name="password"
                                            className="form-control"
                                            placeholder="SENHA"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <ErrorMessage
                                        component="span"
                                        name="password"
                                        className="form-error"
                                    />
                                </div>
                            </div>

                            <div className="row mt-1">
                                <div className="col-md-3"></div>
                                <div className="col-md-2">
                                    <div className="row">
                                        <div className="col-1">
                                            <input
                                                onClick={checkbox}
                                                type="checkbox"
                                                id="checkboxUm"
                                            />
                                        </div>
                                        <div className="col-10">
                                            <p className="reforco">Ver senha</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="row col-12">
                                <div className="col-md-6 offset-md-3 text-center">
                                    <p className="error-message">{errorMessage}</p>
                                </div>
                            </div>
                        )}

                        <div className="row col-12">
                            <div className="col-4" id="cadastrar">
                                <Link to="/cadastro">
                                    <h2 className="sublinhado">Cadastrar</h2>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Button conteudo="Entrar" type="submit" />
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Login;
