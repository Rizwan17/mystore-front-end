import React from 'react';
import './style.css';

const MobileTypeInput = props => {
    return (
        <div className="InputGroup">
            <input 
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.textHandler}
                name={props.name}
            />
        </div>
    );
}

export default MobileTypeInput;