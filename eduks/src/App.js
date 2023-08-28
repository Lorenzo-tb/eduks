import React, { useState, createContext, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Cadastro from './routes/Cadastro';
import Login from './routes/Login';
import Dificuldade from './routes/Dificuldade';
import Home from './routes/Home';
import MiniOpcoes from './routes/MiniOpcoes';
import MiniErro from './routes/MiniErro';
import MiniAcento from './routes/MiniAcento';
import MiniLetra from './routes/MiniLetra';
import MiniPalavra from './routes/MiniPalavra';
import FimAtividades from './routes/FimAtividades';

//export const SharedLoginContext = createContext();
export const SharedNumberContext = createContext();//contexto do numero de atividades feitas
export const QuantidadeMiniGamesContext = createContext();//contexto do numero total de atividade
export const AcertosContext = createContext();//contexto do numero de acertos nas atividades


function App() {
  //const [sharedLogin, setSharedLogin] = useState(false);
  const [sharedNumber, setSharedNumber] = useState(0); //contexto do numero de atividades feitas get e set
  const [quantidadeGames, setQuantidadeGames] = useState(0); //contexto do numero total de atividade get e set
  const [quantidadeAcertos, setQuantidadeAcertos] = useState(0); //contexto do numero de acertos nas atividades get e set

  //console.log(sharedLogin);
  return (
      //<SharedLoginContext.Provider value={{ sharedLogin, setSharedLogin}}>
      <QuantidadeMiniGamesContext.Provider value={{quantidadeGames, setQuantidadeGames}}>
        <SharedNumberContext.Provider value={{sharedNumber, setSharedNumber}}>
          <AcertosContext.Provider value={{quantidadeAcertos, setQuantidadeAcertos}}>
            <Router>
              <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path="/cadastro" element={<Cadastro />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dificuldade" element={<Dificuldade/>} />
                <Route exact path='/miniOpcoes' element={<MiniOpcoes/>}/>
                <Route exact path='/miniErro' element={<MiniErro/>}/>
                <Route exact path='/miniAcento' element={<MiniAcento/>} />
                <Route exact path='/miniLetra' element={<MiniLetra/>} />
                <Route exact path='/miniPalavra' element={<MiniPalavra/>} />
                <Route exact path='/fimAtividades' element={<FimAtividades/>}/>
              </Routes>
            </Router>  
          </AcertosContext.Provider> 
        </SharedNumberContext.Provider>
      </QuantidadeMiniGamesContext.Provider>
        
      //</SharedLoginContext.Provider>
  );
}
/*
{
  sharedLogin ?(
    ROTAS
  ) : (
    OUTRAS ROTAS
  )
}*/
export default App;
