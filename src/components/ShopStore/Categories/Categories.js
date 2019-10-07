import React from 'react';
import './style.css';

const Categories = prosp => {
    return (
        <React.Fragment>
            <span>Categories</span>
            <ul class="CategoryList">
                <li>
                    <span>
                        <a href="#">Accessories</a>
                    </span>
                    <ul>
                        <li><a href="#">Handbags</a></li>
                        <li><a href="#">Shoes</a></li>
                        <li><a href="#">Watches</a></li>
                    </ul>
                </li>
                <li>
                    <span>
                        <a href="#">Shirt & Tops</a>
                    </span>
                </li>
                <li>
                    <span>
                        <a href="#">Swimsuits</a>
                    </span>
                </li>
            </ul>
        </React.Fragment>
    );
}

export default Categories;

