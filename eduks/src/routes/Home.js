import Button from '../components/Button';
import Header from '../components/Header';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


const Home = () =>{

    return(
        <div className="App">
            <div id="botoesHome" className='container'>
                <div className="row">
                    <Header/>
                </div>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className="col-md-3 reforco">
                    <h2>O reforço de Português que você procurava</h2>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                    <Link to="/login" >
                        <Button id="entrar" conteudo="Entrar"/>
                    </Link>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                    <Link to="/cadastro">
                        <Button id="cadastrar" conteudo="Cadastrar"/>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;