import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cadastro from './routes/Cadastro';
import Login from './routes/Login';
import Dificuldade from './routes/Dificuldade';
import Home from './routes/Home';



function App() {
  
  

  
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dificuldade" element={<Dificuldade/>} />
        </Routes>
      </Router>

  );
}

export default App;

/*
import Header from "./components/Header";
import Button from "./components/Button";
<div className='container'>
        <div className='row'>
          <Header/>
        </div>

        <div className="row">
          <div className='col-md-1'></div>
            <div className="col-md-3 reforco">
              <h2>O reforço de Português que você procurava</h2>
            </div>
        </div> 

        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <Link to="/login">
              <Button conteudo="Entrar"/>
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
          <Link to="/cadastro">
            <Button conteudo="Cadastrar"/>
          </Link>
          </div>
        </div>






      </div>
      
      

*/