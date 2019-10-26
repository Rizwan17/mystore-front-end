import { base_url } from "../../constants";

export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART_DETAILS = 'GET_CART_DETAILS';
export const UPDATE_CART = 'UPDATE_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (token, cartItem) => {
    return async dispatch => {
        try{
            const response = await fetch(`${base_url}/cart/add`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(cartItem),
                method: 'POST'
            });
            const jsonResposne = await response.json();
            if(response.status === 201){
                dispatch({
                    type: ADD_TO_CART,
                    cartItem: cartItem
                });
            }

            return jsonResposne;
        }catch(error){
            console.log(error);
        }
    }
}

export const getCartItems = (token, userId) => {
    return async dispatch => {

        try{

            const response = await fetch(`${base_url}/cart/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'POST'
            });

            const jsonResposne = await response.json();
            if(response.status === 200){
                dispatch({
                    type: GET_CART_DETAILS,
                    cartItems: jsonResposne.message[0]
                });
            }

            return jsonResposne.message[0];

        }catch(error){
            console.log(error);
        }
        
    }
}

export const updateCart = (token, userId, product) => {
    return async dispatch => {
        try{

            const response = await fetch(`${base_url}/cart/update/quantity`,{
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                method: 'PUT',
                body: JSON.stringify({
                    userId: userId,
                    productId: product.productId,
                    quantity: product.quantity,
                    total: product.total
                })
            });
            const jsonResposne = await response.json();

            if(response.status === 201){
                dispatch({
                    type: UPDATE_CART,
                    item: product
                });
            }

            return jsonResposne.message;


        }catch(error){
            console.log(error);
        }
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_CART,
            payload: null
        });
    }
}