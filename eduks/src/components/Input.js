function Input(props){
    return(
        <>
          <div className="col-md-6">
            <div className="input-group input-group-lg">
              <input id={props.id} type={props.type} className="form-control" placeholder={props.placeHolder} aria-label="Large" aria-describedby="inputGroup-sizing-sm" autoComplete={props.autocomplete}/>
            </div>
          </div>
        </>
    );
}

export default Input;