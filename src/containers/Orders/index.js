import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import Header from '../../components/Header/Header';
import * as authActions from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { base_url } from '../../constants';

class Orders extends Component{

    state = {
        ordersList: []
    }

    componentDidMount(){

        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {
                if(result){
                    this.getOrders();
                }else{
                    this.props.history.push('/login');
                }
            })
        }else{
            this.getOrders();
        }

        
    }

    getOrders = () => {
        console.log(this.props.auth.isAuthenticated)
        const token =  this.props.auth.token;
        const userId = this.props.auth.user.userId;
        fetch(`${base_url}/order/getorders/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            this.setState({
                ordersList: jsonResponse.message
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

    formatDate = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    getOrderTotal = (id) => {
        const singleOrder = this.state.ordersList.find(order => order._id === id);
        let orderTotal = 0;
        singleOrder.order.forEach(order => {
            orderTotal = orderTotal + (order.price * order.quantity)
        });

        return orderTotal;
    }

    render() {

        

        return (
            <React.Fragment>
                <Header />
                <div className="Content">
                    <div className="Card">
                        <p className="CardText">My Orders</p>

                        {
                            this.state.ordersList.map(order => {
                                return (
                                    <div key={order._id} className="Order">
                                        <div className="OrderHeader">
                                            <a href="#">{order._id}</a>
                                        </div>
                                        <div className="OrderDescription">
                                            <div className="od1">
                                                <p className="odtitle">Delivered Address</p>
                                                <p>{`${order.address.address} ${order.address.cityDistrictTown} ${order.address.state} - ${order.address.pinCode}`}</p>
                                            </div>
                                            <div className="od2">
                                                <p className="odtitle">Payment Type</p>
                                                <a className="odp">{order.paymentType}</a>
                                            </div>
                                            <div className="od3">
                                                <p className="odtitle">Payment Status</p>
                                                <a className="odp">{order.paymentStatus}</a>
                                            </div>
                                        
                                        </div>
                                        <div>
                                            {order.order.map(item => (
                                                <div key={item._id} style={{display: 'flex', alignItems: 'center', margin: '5px 0', borderBottom: '1px solid #cecece'}}>
                                                    <div style={{width: '80px', height: '80px', overflow: 'hidden', position: 'relative'}} className="ImageContainer">
                                                        <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={item.product.productPic[0].img}/>
                                                    </div>
                                                    <div>
                                                        <p className="odtitle">{item.product.name}</p>
                                                        <div style={{fontSize: '14px', color: '#555', fontWeight: 'bold'}}>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <p>${item.price * item.quantity}</p>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="OrderFooter">
                                            <p>Ordered On <span>{this.formatDate(order.orderDate)}</span></p>
                                            <p>Order Total <span>${this.getOrderTotal(order._id)}</span></p>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);