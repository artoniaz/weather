import React from 'react';
import "../css/User.css";

class User extends React.Component {

    state = {
        value: "",
    };

    handleInput = e => {
        if (e.target.value.length === 1) {
            this.props.clear();
        }
        const value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        this.setState({
            value,
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        const value = this.state.value;

        if (value === "") {
            return this.props.error();
        }

        this.props.add(value);
        e.target.querySelector("input").value = "";
    };

    handleMessage = () => {
        if (this.props.city > this.props.wind){
            return <h2>Wieje mocniej niż w Kielcach.</h2>;
        } else {
            return <h2>W Kielcach wieje mocniej.</h2>;
        }
    };

    render() {
        return (
            <section className="userChoice">
                <h3>Czy w Twoim mieście wieje bardziej?</h3>
                <form noValidate onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="wpisz nazwę Twojego miasta"
                           onChange={this.handleInput}/>
                    <button>sprawdź</button>
                </form>
                {this.props.city === null ? <p>Podaj nazwę miasta, które chcesz sprawdzić</p> : <h3>Siła wiatru dla miasta {this.state.value}: <span>{this.props.city}</span> m/s.</h3>}
                {this.props.city !== null && this.handleMessage()}
            </section>
        )
    }

}

export default User;