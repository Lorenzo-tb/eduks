import instagram from "../img/instagram.svg";
import whatsapp from "../img/whatsapp.svg";

function Contatos(){
    return(
        <div id="fixed">
            <div>
                <h2>Contatos</h2>
            </div>
            <div>
                <a href="https://www.instagram.com/lorenzotbolfe/">
                    <img src={instagram} alt="instagram"/>
                </a>
            </div>
            <div>
                <a href="https://www.instagram.com/lorenzotbolfe/">
                    <img src={whatsapp} alt="whatsapp"/>
                </a>
            </div>
        </div>
    )
}
export default Contatos;