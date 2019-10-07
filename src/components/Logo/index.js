import React from 'react';
import './style.css';

import { Link } from 'react-router-dom';

const Logo = props => {
    return (
        <Link to="/">
            <div className="Logo" {...props}>
                {/* <img src="./logo/logo.png" /> */}
                <span>Khan Store</span>
            </div>
        </Link>
        
    );
}

export default Logo;