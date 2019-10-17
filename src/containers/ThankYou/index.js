import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './style.css';

class ThankYou extends Component{

    render() {

        const queryParams = this.props.location.search.split("?")[1];
        const orderId = queryParams.split("=")[1];

        return (
            <div>
                <Header />
                <div className="Content">
                    <div className="ThankyouPage">
                       <h1>Thank you for your order</h1>
                       <p className="OrderId">Order id is: {orderId.toLocaleUpperCase()}</p>
                       <p className="SmallText">You will receive an email confirmation shortly at email@gmail.com</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default ThankYou;