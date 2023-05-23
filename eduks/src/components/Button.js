function Button(props){
    return(
        <div className="col-4" id={props.id}>
          <button type="button" className="btn mt-5 w-100"><h3>ENTRAR</h3></button>
        </div>
    );
}

export default Button;