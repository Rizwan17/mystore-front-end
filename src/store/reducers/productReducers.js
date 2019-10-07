import { GET_PRODUCTS } from "../actions/productActions";

const initState = {
    products: []
}

const productReducers = (state = initState, actions) => {
    switch(actions.type){
        case GET_PRODUCTS:
            state = {
                ...state,
                products: actions.products
            }
            break;
        default:
            break;
    }

    return state;

}

export default productReducers;