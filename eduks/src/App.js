import './App.css';
import Contatos from "./components/Contatos";
import Header from "./components/Header";
import Input from "./components/Input"
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      
      <div className="container">
      
      <Header/>

        <div className="row">
          <div className="col-lg-3 reforco">
            <h2>O reforço de Português que você procurava</h2>
          </div>
        </div> 

        <Input placeHolder="E-MAIL" id="email"/>
        <Input placeHolder="SENHA" id="senha"/>
      </div>

      <div className="row col-12">
        <div className="col-4" id="cadastrar">
          <a id="cadastrar">
            <h2 className="sublinhado">Cadastrar</h2>
          </a>
        </div>
        <Button id=""/>
      </div>
      <Contatos/>                 
    </div>
  );
}

export default App;
