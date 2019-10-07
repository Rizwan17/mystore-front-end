import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.css';
import Logo from '../../components/Logo';

import MobileTypeInput from '../../components/UI/MobileTypeInput';
import SubmitGradientButton from '../../components/UI/SubmitGradientButton';

import * as authActions from '../../store/actions/authActions';
import { connect } from 'react-redux';


class Login extends Component {

    state = {
        redirectToReferrer: false,
        email: '',
        password: ''
    }

    textHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    loginHandler = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state.email, this.state.password)
        .then(response => {
            console.log(response);
            if(response.hasOwnProperty('token')){
                window.localStorage.setItem('auth', JSON.stringify(response))
                this.setState({
                    redirectToReferrer: true
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {
                // result will be either true or false
                if(result){
                    this.setState({
                        redirectToReferrer: true
                    });
                }
                
            })
            .catch(er => {
                console.log(er);
            });
        }
    }


    render() {

        if(this.state.redirectToReferrer){
            return <Redirect to="/" />
        }

        return (
            <div className="LoginContainer">
                <div className="WelcomeText">
                    <h3>Login</h3>
                </div>
                <Logo style={{margin: '0 auto'}} />
                <div className="LoginWrapper">
                    <form onSubmit={this.loginHandler} autoComplete="off">

                        <MobileTypeInput 
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            textHandler={this.textHandler}
                            name="email"
                        />
                        <MobileTypeInput 
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            textHandler={this.textHandler}
                            name="password"
                        />
                        <SubmitGradientButton 
                            label="Login"
                            style={{marginTop: '30px'}}
                        />
                    </form>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/signup">Create a new account</Link>
                    <Link to="/forget-password">Forgot Password ?</Link>
                </div>
                
                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (email, password) => dispatch(authActions.authenticate(email, password)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);