import React from 'react';
import './style.css';

const SubmitGradientButton = props => {
    return (
            <button 
                className="SubmitGradientButton"
                onClick={props.clicked}
                {...props}
            >
                {props.label}
            </button>
        );
}

export default SubmitGradientButton;