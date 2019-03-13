import React from 'react';
import "../css/Error.css";

const Error = props => {
    const api = props.api;
    const messages = ["Nie możemy znaleźć podanego miasta w bazie. Spróbuj ponownie. Pamiętaj, że miasta możesz dodawać w języku polskim oraz angielskim.", "Nie podano nazwy szukanego miasta"];
  return(
      <div className="error">
          <div className="background"></div>
          <div className="errorMessage">
              <h1>Błąd</h1>
              {api ? <p>{messages[0]}</p> : <p>{messages[1]}</p>}
              <button onClick={props.close}>zamknij</button>
          </div>
      </div>
  )
};

export default Error;