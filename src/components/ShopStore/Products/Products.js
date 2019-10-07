import React, { Component } from 'react';
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
    }

    getProducts = (categorySlug = '') => {
       
        this.props.getProducts(categorySlug)
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

    render() {

        console.log(this.props);

        const slug = Object.keys(this.props.match.params).length > 0 ? this.props.match.params.slug : this.state.slug;
        
        return (

            <div className="Content">
                    <div className="ContentTitle">
                        <h2 className="CategoryTitle">{slug}</h2>
                    </div>
                    <div>
                        Shop / Women / Dresses
                    </div>
                    <div className="ContentBody">
                        <div className="SideMenu">
                            
                        </div>
                        
                        <div className="MainContent">

                        <div className="ProductArea">
                            {
                                this.props.products.map(product => <Product
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
        getProducts: (categorySlug) => dispatch(productActions.getProducts(categorySlug))
    }
}

const mapStateToProps = state => {
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);