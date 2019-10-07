import React, { Component } from 'react';
import Header from '../../components/Header/Header';

class Home extends Component{
    render() {
        return (
            <React.Fragment>
                <Header />
                <div>
                    <h1>Home Page</h1>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
