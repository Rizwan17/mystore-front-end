export const GET_PRODUCTS = 'GET_PRODUCTS';

export const getProducts = (categorySlug = '') => {
    return async dispatch => {

        try{

            categorySlug = (categorySlug == 'all') ? '' : categorySlug;

            const response = await fetch(`http://localhost:2019/products/${categorySlug}`);
            const jsonResponse = await response.json();
            if(response.status == 200){
                dispatch({
                    type: GET_PRODUCTS,
                    products: jsonResponse.message
                });
            }

            return jsonResponse;

        }catch(error){
            console.log(error);
        }

    }
}

export const getSingleProduct = (productSlug) => {
    return async dispatch => {
        try{

            const response = await fetch(`http://localhost/products/category/${productSlug}`);
            const jsonResponse = await response.json();
            if(response.status === 200){

               

            }


        }catch(error){
            console.log(error);
        }
    }
}

