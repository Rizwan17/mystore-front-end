import React, { Component } from 'react';
import './style.css';
import Logo from '../../components/Logo';
import MobileTypeInput from '../../components/UI/MobileTypeInput';
import SubmitGradientButton from '../../components/UI/SubmitGradientButton';
import * as authActions from '../../store/actions/authActions';

import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import Error from '../../components/Error';

class Signup extends Component {

    state = {
        redirectToreferrer: false,
        signupForm: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repassword: '',
            isError: false,
            errorMessage: ''
        }
    }

    textHandler = (e) => {
        const signupForm = this.state.signupForm;
        const updateSignupForm = {
            ...signupForm,
            [e.target.name] : e.target.value
        }
        this.setState({
            signupForm: updateSignupForm
        })
    }

    setError = (error, message) => {
        const { signupForm } = this.state;
        const updatedSignupForm = {
            ...signupForm,
            isError: error,
            errorMessage: message
        }
        this.setState({
            signupForm: updatedSignupForm
        });
    }

    signupHandler = (e) => {
        e.preventDefault();
        const { signupForm } = this.state;
        if(signupForm.firstName === ''){
            this.setError(true, 'Enter First Name'); return;
        }
        if(signupForm.lastName === ''){
            this.setError(true, 'Enter Last Name');
            return;
        }

        const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if(!emailPattern.test(signupForm.email)){
            this.setError(true, 'Invalid Email Address'); return;
        }

        if(signupForm.email === ''){
            this.setError(true, 'Enter Email');
            return;
        }
        if(signupForm.password === ''){
            this.setError(true, 'Enter Password');
            return;
        }
        if(signupForm.repassword === ''){
            this.setError(true, 'Enter Repassword');
            return;
        }
        if(signupForm.password !== signupForm.repassword){
            this.setError(true, 'Password dosent match');
            return;
        }

        const user = {
            firstName: signupForm.firstName,
            lastName: signupForm.lastName,
            email: signupForm.email,
            password: signupForm.password
        }

        this.props.signup(user)
        .then(jsonResponse => {
            console.log(jsonResponse);
            this.props.history.push({
                pathname: '/login',
               search: '?signup=success',
               state: jsonResponse.message 
            });
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
                        redirectToreferrer: true
                    });
                }
                
            })
            .catch(er => {
                console.log(er);
            });
        }
    }

    render() {

       const { signupForm, redirectToreferrer }  = this.state;

       if(redirectToreferrer){
           return <Redirect to="/" />
       }

        return (
            <div className="LoginContainer">
                <div className="WelcomeText">
                    <h3>Signup</h3>
                </div>
                <Logo style={{margin: '0 auto'}} />
                <div className="LoginWrapper">
                    <form onSubmit={this.signupHandler} autoComplete="off">

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{width: '49%'}}>
                                <MobileTypeInput 
                                    type="text"
                                    placeholder="First Name"
                                    value={signupForm.firstName}
                                    textHandler={this.textHandler}
                                    name="firstName"
                                />
                            </div>
                            <div style={{width: '49%'}}>
                                <MobileTypeInput 
                                    type="text"
                                    placeholder="Last Name"
                                    value={signupForm.lastName}
                                    textHandler={this.textHandler}
                                    name="lastName"
                                />
                            </div>
                        </div>
                        
                        
                        <MobileTypeInput 
                            type="text"
                            placeholder="Email"
                            value={signupForm.email}
                            textHandler={this.textHandler}
                            name="email"
                        />
                        <MobileTypeInput 
                            type="password"
                            placeholder="Password"
                            value={signupForm.password}
                            textHandler={this.textHandler}
                            name="password"
                        />
                        <MobileTypeInput 
                            type="password"
                            placeholder="Re-enter Password"
                            value={signupForm.repassword}
                            textHandler={this.textHandler}
                            name="repassword"
                        />
                        
                        <Error>
                            {this.state.signupForm.errorMessage}
                        </Error>

                        <SubmitGradientButton 
                            label="Signup"
                            style={{marginTop: '30px'}}
                        />
                    </form>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link to="/login">Login</Link>
                    <Link to="/forget-password">Forgot Password ?</Link>
                </div>
                
                
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (user) => dispatch(authActions.signup(user)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);