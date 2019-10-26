import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { base_url } from '../../../constants';

class BottomHeader extends Component{

    state = {
        categories: [],
        categoriesAr : []
    }

    componentDidMount() {
        fetch(`${base_url}/category`, {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            this.setState({
                  categories: jsonResponse.message
            })
        });
    }


    categoryTree(categories){

        //console.log(categories);

        var categoriesAr = [];
        for(var value of categories){

            categoriesAr.push(
                    <li key={value.slug} className="Column">
                        <NavLink to={`/products/${value.slug}`}>{value.name}</NavLink>
                        {value.children.length > 0 ? (<ul>{this.categoryTree(value.children)}</ul>) : null}
                    </li>
            );
        }

        return categoriesAr;
    }

    render() {

        const cat = this.categoryTree(this.state.categories);

        return (
            <div className="BottomHeader">
                <ul className="Menu">
                    <li className="MenuItem"><Link to="/"><i className="fas fa-home"></i></Link></li>
                    <li className="MenuItem">
                        <Link to="/products/all" className="MenuItemElement">Shop&nbsp;<i className="fas fa-caret-down"></i></Link>
                        
                        <ul className="Dropdown">
                        {cat}
                           {/* <li className="Column">
                              <span className="ColumnTitle">
                                  <Link to="">Accessories</Link>
                              </span>
                              <ul className="ColumnSubMenu">
                                  <li><Link to="">Handbags</Link></li>
                                  <li><Link to="">Shoes</Link></li>
                                  <li><Link to="">Watches</Link></li>
                              </ul> 
                           </li>
                           <li className="Column">
                                <span className="ColumnTitle">
                                    <Link to="">Shirts & Tops</Link>
                                </span>
                                <ul className="ColumnSubMenu">
                                    <li><Link to="">Dresses</Link></li>
                                    <li><Link to="">Polos</Link></li>
                                    <li><Link to="">Tshirts</Link></li>
                                    <li><Link to="">Women Dresses</Link></li>
                                </ul> 
                            </li>
                            <li className="Column">
                                <span className="ColumnTitle">
                                    <Link to="">Swimsuits</Link>
                                </span>
                                <ul className="ColumnSubMenu">
                                    <li><Link to="">Shorts</Link></li>
                                </ul> 
                            </li> */}
                        </ul>
                    </li>
                    <li className="MenuItem"><Link to="/categories">Categories</Link></li>
                    <li className="MenuItem"><Link to="/information">Information</Link></li>
                    <li className="MenuItem"><Link to="/blog">Blog</Link></li>
                </ul>
    
            </div>
        );
    }
}



export default BottomHeader;