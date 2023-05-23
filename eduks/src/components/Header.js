import logo from "../img/logo.svg";

function Header(){
    return(
        <div className="row">
            <div className="col-lg-6 divTitulo">
                <h1 className="titulo">EDUKS</h1>
            </div>
        
            <div className="col-lg-6 logo">
                <img className="logoImg" src={logo} alt="logo"/>
            </div>
        </div>
        
    );
}

export default Header;