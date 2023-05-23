function Input(props){
    return(
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4" id={props.id}>
            <div className="input-group input-group-lg">
              <input type="text" class="form-control transparencia" placeholder={props.placeHolder} aria-label="Large" aria-describedby="inputGroup-sizing-sm"/>
            </div>
          </div>
        </div>
    );
}

export default Input;