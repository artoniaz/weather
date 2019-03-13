import React, {Component} from 'react';
import '../css/App.css';
import "../css/Cities.css";
import "./Header";
import Header from "./Header";
import Result from "./Result";
import User from "./User";
import Error from "./Error";

class App extends Component {

    state = {
        Kielce: 0,
        Warszawa: 0,
        Kraków: 0,
        Wrocław: 0,
        Poznań: 0,
        Gdańsk: 0,
        Łódź: 0,
        Białystok: 0,
        userChoice: null,
        av: 0,
        error: false,
        APIerr: false,
    };

    cities = ["Kielce", "Warszawa", "Kraków", "Wrocław", "Poznań", "Gdańsk", "Łódź", "Białystok"];
    windValues = [];


    addUserCity = (value) => {

        const API = `http://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=c6db8635ab8d878bcbcd8a49d74596d8`;

        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    throw Error("Błąd");
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    userChoice: data.wind.speed,
                })
            })
            .catch(err => {
                this.setState({
                    userChoice: null,
                    error: true,
                    APIerr: true,
                });
            })
    };

    clearUser = () => {
        this.setState({
            userChoice: null,
        })
    };

    displayError = () => {
        this.setState({
            error: true,
        })
    };

    closeError = () => {
        this.setState({
            error: false,
            APIerr: false,
        })
    };


    render() {
        let cities = [...this.cities];
        let wind = [...this.windValues];
        let city = null;
        const index = cities.findIndex(el => el === 'Kielce');
        if (cities.length === wind.length) {
            cities = cities.filter(el => el !== "Kielce");
            wind.splice(index, 1);

            city = cities.map(el => {
                const elIndex = cities.indexOf(el);
                return (
                    <p key={elIndex}>{el}: <span style={{fontWeight: 700}}>{wind[elIndex]}</span> m/s</p>
                )
            });
        }

        return (

            <>
                <div className="background"></div>
                <div className="mainContainer">
                    <Header/>
                    <Result wind={this.state.Kielce} av={this.state.av}/>
                    <section className="citiesSection">
                        <div className="cities">
                            <p>Siła wiatru w dużych miastach Polski:</p>
                            {city}
                        </div>
                        <User add={this.addUserCity} city={this.state.userChoice} wind={this.state.Kielce}
                              clear={this.clearUser} error={this.displayError}/>
                    </section>
                    {this.state.error && <Error api={this.state.APIerr} close={this.closeError}/>}
                </div>
            </>
        );
    }

    componentDidMount() {

        this.cities.map(el => {
            const API = `http://api.openweathermap.org/data/2.5/weather?q=${el}&APPID=c6db8635ab8d878bcbcd8a49d74596d8`;

            return fetch(API)
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        throw Error("Błąd");
                    }
                })
                .then(response => response.json())
                .then(data => {
                    this.windValues.push(data.wind.speed);
                    const sum = this.windValues.reduce((prev, cur) => prev + cur);

                    this.setState({
                        [el]: data.wind.speed,
                        av: Number((sum / this.windValues.length).toFixed(2)),
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        });

    }

}

export default App;
