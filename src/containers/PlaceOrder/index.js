import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import './style.css';
import NormalInput from '../../components/UI/NormalInput';
import * as authActions from '../../store/actions/authActions';
import { connect } from 'react-redux';
import AddressForm from './AddressForm';
import CartPrice from '../../components/CartPrice';
import DeliveryAddress from './DeliveryAddress';
import RadioButton from '../../components/UI/RadioButton';
import * as cartActions from '../../store/actions/cartActions';
import { base_url } from '../../constants';

class PlaceOrder extends Component{

    state = {
        addresses: [],
        address: {
            fullName: "",
            mobileNumber: "",
            pinCode: "",
            locality: "",
            address: "",
            cityDistrictTown: "",
            state: "",
            landmark: "",
            alternatePhoneNumber: ""
        },
        order: [],
        selectedAddress: '',
        existingAddress: false,
        newAddress: false,
        isAddressConfirm: false,
        isOrderConfirm: false,
        selectedPaymentType: 'cod',
        paymentTypes: [
            {id: 1, value: 'card', label: 'Credit Card / Debit Card / ATM Card', isActive: false},
            {id: 2, value: 'netBanking', label: 'Net Banking', isActive: false},
            {id: 3, value: 'paypal', label: 'Paypal', isActive: false},
            {id: 4, value: 'cod', label: 'Cash on Delivery', isActive: true},
        ]
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {
                if(result){

                    this.getAddresses();

                }else{
                    this.props.history.push('/login');
                }
            })
            .catch(error => {
                console.log(error);
            })
        }else{
            this.getAddresses();
        }
    }

    getAddresses = () => {
        const userId = this.props.auth.user.userId;
        fetch(`${base_url}/user/get-addresses/`+userId, {
            headers: {
                'auth-token': this.props.auth.token
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else{
                throw new Error('Something went wrong');
            }
        })
        .then(jsonResponse => {
            console.log(jsonResponse)
            this.setState({
                addresses: jsonResponse.message.address
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    inputHandler = (e) => {
        const address = this.state.address;
        const updatedAddress = {
            ...address,
            [e.target.name] :  e.target.value
        };
        this.setState({
            address: updatedAddress
        })
    }

    addressSelector = (e) => {

        this.setState({
            selectedAddress: e.target.value,
            existingAddress: true,
            newAddress: false
        });

    }

    newAddressSelection = (e) => {
        this.setState({
            selectedAddress: 'newAddressId',
            existingAddress: false,
            newAddress: true
        });
    }

    addressSubmitHandler = (e) => {
        e.preventDefault();
        console.log(this.state.address)

        const address = {
            userId: this.props.auth.user.userId,
            address: this.state.address
        }

       fetch(`${base_url}/user/new-address`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': this.props.auth.token
            },
            method: 'POST',
            body: JSON.stringify(address)
       })
       .then(response => response.json())
       .then(jsonResponse => {
           console.log('new address');
           console.log(jsonResponse);
           console.log('new address');
          
           //this.getAddresses();
           //console.log(jsonResponse.message);
           const updatedAddressList = jsonResponse.message.address;
           this.setState({
                isAddressConfirm: true,
                address: {
                    ...this.state.address,
                    ...address.address
                },
                addresses: updatedAddressList,
                selectedAddress: updatedAddressList[updatedAddressList.length - 1]._id
            });
           
       })
       .catch(error => {
           console.log(error);
       })
    }

    confirmDeliveryAddress = () => {
        this.setState({
            isAddressConfirm: true
        });

    }

    confirmOrder = () => {
        this.setState({
            isOrderConfirm: true
        })
    }

    selectPaymentOption = (e) => {
        this.setState({
            selectedPaymentType: e.target.value
        })
    }

    submitOrder = async () => {

        if(!this.state.isOrderConfirm){
            return;
        }

        if(this.state.selectedPaymentType !== 'cod'){
            return;
        }
        
        const order = this.props.cart.cartItem.map(item => {
            return {
                product: item.product,
                price: item.price,
                quantity: item.quantity
            }
        });

        try{

            const response = await fetch(`${base_url}/order/create`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': this.props.auth.token
                },
                body: JSON.stringify({
                    user: this.props.auth.user.userId,
                    address: this.state.selectedAddress,
                    order: order,
                    paymentType: 'COD',
                    paymentStatus: 'pending'
                }),
                method: 'POST'
            });

            const jsonResponse = await response.json();
            if(response.status === 201){
                this.props.clearCart();
                this.props.history.push({
                    pathname: '/thank-you',
                    search: '?orderid='+jsonResponse.message._id,
                    state: jsonResponse.message
                });
            }

        }catch(error){
            console.log(error);
        }
        
    }

    render() {

        let address;
        if(this.state.isAddressConfirm && !this.state.newAddress){
            address = this.state.addresses.find(address => address._id === this.state.selectedAddress);
        }else{
            address = this.state.address;
        }

        return (
            <React.Fragment>
                <Header />
                <div className="Content">
                    <div className="PlaceOrderWrapper">

                        
                        <div className="DeliveryAddress">

                            <div className="Card">
                                <p className="CardText">Login {this.props.auth.isAuthenticated ? <i className="fas fa-check"></i> : null}</p>
                                <p className="CardText">Email: {this.props.auth.user.email}</p>
                            </div>

                            {
                                this.state.isAddressConfirm ? 
                                 <div className="Card">
                                     <p className="CardText">Delivery Address {this.state.isAddressConfirm ? <i className="fas fa-check"></i> : null}</p>
                                     <p>
                                        <span>{`${address.fullName} - ${address.mobileNumber} - `}</span>
                                        <span>{ `${address.address}, ${address.cityDistrictTown}, ${address.state} - ${address.pinCode}`}</span>
                                        </p>
                                 </div> :
                                 <React.Fragment>
                                <div className="Card">
                                    <h4>Delivery Address</h4>
                                    {
                                        this.state.addresses.length && this.state.addresses.map(address => 
                                            <DeliveryAddress 
                                                key={address._id} 
                                                onAddressSelection={this.addressSelector} 
                                                value={this.state.selectedAddress}
                                                address={address} />
                                        )
                                    }
                                    {
                                        this.state.existingAddress ?
                                        <div className="DeliveryButtonContainer" >
                                            <button onClick={this.confirmDeliveryAddress} className="DeliveryAddressButton">Deliver Here</button>
                                        </div> : null
                                    }
                                    
                                </div>
                                <div className="Card">
                                    <div>
                                        <RadioButton 
                                            name="address"
                                            label="Add new Address"
                                            value={this.state.selectedAddress}
                                            onChange={this.newAddressSelection}
                                        />
                                    </div>
                                    {
                                        this.state.newAddress ? 
                                            <AddressForm
                                                address={this.state.address}
                                                inputHandler={this.inputHandler}
                                                addressSubmitHandler={this.addressSubmitHandler}
                                            /> : null
                                    }
                                    
                                    
                                </div>
                                </React.Fragment>
                            }
                            
                               

                                {
                                    this.state.isOrderConfirm ? 
                                    <div className="Card">
                                        <p className="CardText">Order Summary <i className="fas fa-check"></i> </p>
                                    </div> : 
                                    this.state.isAddressConfirm ? 
                                    <div className="Card">
                                        <h4 className="CardText">Order Summary </h4>
                                        {
                                            this.props.cart.cartItem.map(item => (
                                                <div key={item.product} style={{display: 'flex', margin: '5px 0', alignItems: 'center'}}>
                                                    <div style={{width: '60px', height: '60px', overflow: 'hidden', position: 'relative'}}>
                                                        <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={item.image} alt="" />
                                                    </div>
                                                    <div>
                                                        <h5>{item.name}</h5>
                                                        <h6>Quantity : {item.quantity}</h6>
                                                        <h6>${item.total}</h6>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <button onClick={this.confirmOrder} className="ContinueButton">Continue</button>
                                    </div>
                                 : null
                                }
                                
                                {
                                    this.state.isOrderConfirm ? 
                                    <div className="Card">
                                    <h4 className="CardText">Payment Option</h4>
                                    <ul>
                                        {
                                            this.state.paymentTypes.map(payment => 
                                            <li className="paymentType" key={payment.id}>
                                                <RadioButton
                                                    key={payment.id} 
                                                    name="paymentType"
                                                    label={payment.label}
                                                    value={payment.value}
                                                    onChange={this.selectPaymentOption}
                                                />
                                            </li>)
                                        }
                                    </ul>
                                    {
                                        this.state.selectedPaymentType !== 'cod' ? 
                                        <p className="ErrorMessage">Sorry, Only Cash on Delivery is available</p> : null
                                    }
                                    <button className="PaymentConfirm" onClick={this.submitOrder}>Confirm Order</button>

                                </div> : null
                                }
                              
                                

                            

                            



                            </div>

                                <CartPrice />

                            
                    </div>

                    
                   
                </div>
                
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken()),
        clearCart: () => dispatch(cartActions.clearCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);