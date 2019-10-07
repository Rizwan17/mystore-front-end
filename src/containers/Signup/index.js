import React, { Component } from 'react';
import './style.css';
import Logo from '../../components/Logo';
import MobileTypeInput from '../../components/UI/MobileTypeInput';
import SubmitGradientButton from '../../components/UI/SubmitGradientButton';
import * as authActions from '../../store/actions/authActions';

import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';

class Signup extends Component {

    state = {
        redirectToreferrer: false,
        signupForm: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            repassword: ''
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

    signupHandler = (e) => {
        e.preventDefault();
        console.log(this.state);
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
        authenticate: (email, password) => dispatch(authActions.authenticate(email, password)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);