function Button(props){
    return(
        <>
          <button id={props.id} type={props.type} className="btn w-100" onClick={props.onClick}><h3>{props.conteudo}</h3></button>
        </>
    );
}

export default Button;