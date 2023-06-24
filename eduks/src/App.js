import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Cadastro from './routes/Cadastro';
import Login from './routes/Login';
import Dificuldade from './routes/Dificuldade';
import Home from './routes/Home';
import MiniOpcoes from './routes/MiniOpcoes';
import MiniErro from './routes/MiniErro';
import MiniAcento from './routes/MiniAcento';
import MiniLetra from './routes/MiniLetra';
import MiniPalavra from './routes/MiniPalavra';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dificuldade" element={<Dificuldade/>} />

        <Route path='/miniOpcoes' element={<MiniOpcoes/>}/>
        <Route path='/miniErro' element={<MiniErro/>}/>
        <Route path='/miniAcento' element={<MiniAcento/>} />
        <Route path='/miniLetra' element={<MiniLetra/>} />
        <Route path='/miniPalavra' element={<MiniPalavra/>} />
      </Routes>
    </Router>

  );
}

export default App;
