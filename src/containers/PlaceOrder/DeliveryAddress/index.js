import React from 'react';
import './style.css';
import RadioButton from '../../../components/UI/RadioButton';

const DeliveryAddress = props => {

    const {address} = props;

    return (
                <div style={{margin: '10px 0'}}>
                    <div className="AddressSelection" key={address._id}>
                        <RadioButton 
                            name="address"
                            label=""
                            value={address._id}
                            onChange={props.onAddressSelection}
                        />
                        <div>
                            <p className="AddressAuthor">{address.fullName} {address.mobileNumber}</p>
                            <p className="AuthorAddress">{address.address}, {address.cityDistrictTown}, {address.state} - {address.pinCode}</p>
                        </div>
                    </div>
                </div>
        );
 }

export default DeliveryAddress;