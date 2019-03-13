import React from 'react';
import "../css/Result.css";

const Result = props => {
    return (
        <section className="resultSection">
            <h1>Aktualna siła wiatru w Kielcach: <span>{props.wind}</span> m/s</h1>
            <h3>Aktualna średnia siła wiatru w dużych miastach Polski: <span>{props.av}</span> m/s</h3>
            <h1>Wniosek?</h1>
            {props.wind > props.av ? <h1 className="result" style={{color: "green"}}>w Kielcach wieje</h1> : <h1 className="result" style={{color: "royalblue"}}>w Kielcach nie wieje</h1>}
        </section>
    )
};

export default Result;