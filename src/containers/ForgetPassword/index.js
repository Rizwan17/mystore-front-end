import React, { Component } from 'react';
import './style.css';
import Logo from '../../components/Logo';
import MobileTypeInput from '../../components/UI/MobileTypeInput';
import SubmitGradientButton from '../../components/UI/SubmitGradientButton';

import { Link } from 'react-router-dom';

class Login extends Component {

    state = {
        email: ''
    }

    textHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    forgetPasswordHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="LoginContainer">
                <div className="WelcomeText">
                    <h3>Reset Password</h3>
                </div>
                <Logo style={{margin: '0 auto'}} />
                <div className="LoginWrapper">
                    <form onSubmit={this.forgetPasswordHandler} autoComplete="off">

                        <MobileTypeInput 
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            textHandler={this.textHandler}
                            name="email"
                        />
                        <SubmitGradientButton 
                            label="Send"
                            style={{marginTop: '30px'}}
                        />
                    </form>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/signup">Create a new account</Link>
                    <Link to="/login">Login</Link>
                </div>
                
                
            </div>
        );
    }
}

export default Login;