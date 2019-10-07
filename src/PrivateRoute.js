import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        const authData = window.localStorage.getItem('auth');
        if(authData){
            const auth = JSON.parse(authData);
            if(auth.hasOwnProperty('token') && auth.token !== ''){
                return <Component {...props} />
            }else{
                return <Redirect to="/login" />
            }
        }else{
            return <Redirect to="/login" />
        }
        

    }} />
)

export default PrivateRoute;