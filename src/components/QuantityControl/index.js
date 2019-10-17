import React from 'react';
import './style.css';

const QuantityControl = props => {
    return (
        <div className="QunantityControl">
            <button onClick={(e) => props.decreaseQuantity(e, props.productId)}>-</button>
                <input 
                    type="text" 
                    onChange={(e) => props.changeQuantity(e, props.productId)} 
                    name={props.name} 
                    value={props.quantity}
                />
            <button onClick={(e) => props.increaseQuantity(e, props.productId)}>+</button>
        </div>
    );
}

export default QuantityControl;