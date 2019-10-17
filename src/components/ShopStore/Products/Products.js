import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as productActions from '../../../store/actions/productActions';
import { connect } from 'react-redux';
import './style.css';
import Product from './Product';

class Products extends Component{

    state = {
        slug: 'Products'
    }

    componentDidMount() {
        const slug = this.props.match.params.slug == 'all' ? '' : this.props.match.params.slug
        this.getProducts(slug);
        this.props.getCategories();
    }

    getProducts = (categorySlug = '', filter = null) => {
       
        this.props.getProducts(categorySlug, filter)
        .then(response => {

            console.log(response);

            // this.setState({
            //     products: response.message
            // })
        });
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.slug != prevProps.match.params.slug){
            this.getProducts(this.props.match.params.slug);
        }

        
    }

    applyFilter = (filter) => {
        const slug = this.props.match.params.slug == 'all' ? '' : this.props.match.params.slug
        this.getProducts(slug, filter);
    }

    categoryTree(categories){
        var categoriesAr = [];
        for(var value of categories){

            categoriesAr.push(
                    <li key={value.slug}>
                        <Link to={`/products/${value.slug}`}>{value.name}</Link>
                        {value.children.length > 0 ? (<ul>{this.categoryTree(value.children)}</ul>) : null}
                    </li>
            );
        }

        return categoriesAr;
    }

    render() {

        const slug = Object.keys(this.props.match.params).length > 0 ? this.props.match.params.slug : this.state.slug;

        
        
        return (

            <div className="Content">
                    <div className="ContentTitle">
                        <h2 className="CategoryTitle">{slug}</h2>
                    </div>
                    <div className="ContentBody">
                        <div className="SideMenu">
                            <h3 className="SideMenuTitle">Filters</h3>
                            <div className="Filter">
                                <p className="FilterTitle">Categories</p>
                                <ul>
                                    {
                                        this.props.products.categories.length > 0 ? 
                                        this.categoryTree(this.props.products.categories) : null
                                    }
                                </ul>
                            </div>
                            
                           <div className="Filter">
                               <p className="FilterTitle">Price</p>
                               <div>
                                    <button onClick={() => this.applyFilter({price:1} )} className="FilterButton">Low to High</button>
                               </div>
                               <div>
                                    <button onClick={() => this.applyFilter({price: -1})} className="FilterButton">High to Low</button>
                               </div>
                               
                           </div>
                       
                        </div>
                        
                        <div className="MainContent">

                        <div className="ProductArea">
                            {
                                this.props.products.products.map(product => <Product
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    productPic={product.productPic}
                                    slug={product.slug}
                                />)
                            }
                            
                        </div>

                            
                        </div>

                    </div>
                </div>
            
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: (categorySlug, filter) => dispatch(productActions.getProducts(categorySlug, filter)),
        getCategories: () => dispatch(productActions.getCategories())
    }
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);