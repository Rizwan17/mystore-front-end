import { GET_PRODUCTS, GET_PRODUCT_CATEGORIES } from "../actions/productActions";

const initState = {
    products: [],
    categories: []
}

const productReducers = (state = initState, actions) => {
    switch(actions.type){
        case GET_PRODUCTS:
            state = {
                ...state,
                products: actions.products
            }
            break;
        case GET_PRODUCT_CATEGORIES:
            state = {
                ...state,
                categories: actions.categories
            }
            break;
        default:
            break;
    }

    return state;

}

export default productReducers;