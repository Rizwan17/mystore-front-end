import { ADD_TO_CART, GET_CART_DETAILS, UPDATE_CART, CLEAR_CART } from "../actions/cartActions"

const initState = {
    cartItem: [],
    totalAmount: 0,
    cartCount: 0
}

const cartReducers = (state = initState, actions) => {
    switch(actions.type){
        case ADD_TO_CART:
            const cartItem = state.cartItem;
            let updatedCartItem = [];
            let totalAmount;

            const itemCount = state.cartItem.filter(item => item.product === actions.cartItem.product);

            if(itemCount.length === 0){
                updatedCartItem = [
                    ...cartItem,
                    {
                        product: actions.cartItem.product,
                        name: actions.cartItem.name,
                        image: actions.cartItem.image,
                        price: actions.cartItem.price,
                        quantity: actions.cartItem.quantity,
                        total: actions.cartItem.quantity * actions.cartItem.price
                    }
                ];
            }else{
                updatedCartItem = cartItem.map(item => 
                    item.product === actions.cartItem.product ?
                    {
                        ...item,
                        quantity: item.quantity + actions.cartItem.quantity,
                        total: item.total + actions.cartItem.price
                    } : item
                    )
            }
            totalAmount = state.totalAmount + actions.cartItem.price
            state = {
                cartItem: updatedCartItem,
                totalAmount: totalAmount,
                cartCount: state.cartCount + 1
            }
            break;
        case GET_CART_DETAILS:
            const cItem = actions.cartItems.cart;
            let totalAmt = 0;
            let quantityCount = 0;
            const updateCartItem = cItem.map(item => {
                totalAmt += item.total;
                quantityCount += item.quantity;
                return {
                    product: item.product._id,
                    name: item.product.name,
                    image: item.product.productPic[0].img,
                    price: item.price,
                    quantity: item.quantity,
                    total: item.total
                }
            })
            state = {
                cartItem: updateCartItem,
                totalAmount: totalAmt,
                cartCount: quantityCount
            }
            break;
        case UPDATE_CART:
            const updateItem = actions.item;
            const cartItems = state.cartItem.map(item => {
                return item.product === updateItem.productId ? 
                {
                    ...item,
                    quantity: updateItem.quantity,
                    total: updateItem.total
                } : item
            });
            state = {
                cartItem: cartItems,
                totalAmount: parseFloat(state.totalAmount) + parseFloat(updateItem.price * updateItem.newQuantity),
                cartCount: parseInt(state.cartCount) + parseInt(updateItem.newQuantity)
            }
            break;
        case CLEAR_CART:
            state = {
                cartItem: [],
                totalAmount: 0,
                cartCount: 0
            }
        default:
            break;
    }

    return state;
}

export default cartReducers;