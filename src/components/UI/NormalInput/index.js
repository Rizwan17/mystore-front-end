import React from 'react';
import './style.css';

const NormalInput = props => {

    let input;
    switch(props.type){
        case 'text':
                input = <input 
                                    type={props.type}
                                    name={props.name} 
                                    className="NormalInput" 
                                    placeholder={props.placeholder}
                                    value={props.value}
                                    onChange={props.inputHandler} />
                break;
        case 'textarea':
                input = <textarea 
                                type={props.type}
                                name={props.name} 
                                className="NormalInput" 
                                placeholder={props.placeholder}
                                value={props.value}
                                onChange={props.inputHandler} />
                    break;
        case 'select':
                input = <select>
                    <option>---Select---</option>
                </select>
                break;
        default:
            break;
    }

    return input;
}

export default NormalInput;