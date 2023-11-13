import React, { useState, createContext, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import { PrivateRoutes } from './routes/PrivateRoute';

//export const SharedLoginContext = createContext();
export const SharedNumberContext = createContext();//contexto do numero de atividades feitas
export const DificuldadeGamesContext = createContext();//contexto da dificuldade das atividades
export const QuantidadeMiniGamesContext = createContext();//contexto do numero de atividades dos minigames
export const AcertosContext = createContext();//contexto do numero de acertos nas atividades
export const IdUserContext = createContext();//contexto do id de usuario
export const TokenContext = createContext();


function App() {
  //const [sharedLogin, setSharedLogin] = useState(false);
  const [sharedNumber, setSharedNumber] = useState(0); //contexto do numero de atividades feitas get e set
  const [dificuldadeGames, setDificuldadeGames] = useState(0); //contexto do numero total de atividade get e set
  const [quantidadeAcertos, setQuantidadeAcertos] = useState(0); //contexto do numero de acertos nas atividades get e set
  const [idUser, setIdUser] = useState("");
  const [token, setToken] = useState("");
  const [quantidadeGames, setQuantidadeGames] = useState(10);

  //console.log(sharedLogin);
  return (
    //<SharedLoginContext.Provider value={{ sharedLogin, setSharedLogin}}>
    <DificuldadeGamesContext.Provider value={{ dificuldadeGames, setDificuldadeGames }}>
      <SharedNumberContext.Provider value={{ sharedNumber, setSharedNumber }}>
        <AcertosContext.Provider value={{ quantidadeAcertos, setQuantidadeAcertos }}>
          <IdUserContext.Provider value={{ idUser, setIdUser }}>
            <TokenContext.Provider value={{ token, setToken }}>
              <QuantidadeMiniGamesContext.Provider value={{ quantidadeGames, setQuantidadeGames }}>
                <Router>
                  <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path="/cadastro" element={<Cadastro />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route path='/dificuldade' element={<PrivateRoutes />}>
                      <Route exact path="/dificuldade" element={<Dificuldade />} />
                    </Route>
                    <Route path='/miniOpcoes' element={<PrivateRoutes />}>
                      <Route exact path='/miniOpcoes' element={<MiniOpcoes />} />
                    </Route>
                    <Route path='/miniErro' element={<PrivateRoutes />}>
                      <Route exact path='/miniErro' element={<MiniErro />} />
                    </Route>
                    <Route path='/miniAcento' element={<PrivateRoutes />}>
                      <Route exact path='/miniAcento' element={<MiniAcento />} />
                    </Route>
                    <Route path='/miniLetra' element={<PrivateRoutes />}>
                      <Route exact path='/miniLetra' element={<MiniLetra />} />
                    </Route>
                    <Route path='/miniPalavra' element={<PrivateRoutes />}>
                      <Route exact path='/miniPalavra' element={<MiniPalavra />} />
                    </Route>
                    <Route path='/fimAtividades' element={<PrivateRoutes />}>
                      <Route exact path='/fimAtividades' element={<FimAtividades />} />
                    </Route>
                  </Routes>
                </Router>
              </QuantidadeMiniGamesContext.Provider>
            </TokenContext.Provider>
          </IdUserContext.Provider>
        </AcertosContext.Provider>
      </SharedNumberContext.Provider>
    </DificuldadeGamesContext.Provider>

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
