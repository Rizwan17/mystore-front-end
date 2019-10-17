export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT_CATEGORIES = 'GET_PRODUCT_CATEGORIES';

export const getProducts = (categorySlug = '', filter) => {
    return async dispatch => {

        try{

            categorySlug = (categorySlug == 'all') ? '' : categorySlug;

            let query = '';
            if(filter){
                query = '?filter=1&'
                for(let prop in filter){
                    query += `${prop}=${filter[prop]}&`
                }
                query = query.substring(0, query.length-1);
            }

            const response = await fetch(`http://localhost:2019/products/${categorySlug}${query}`);
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

export const getCategories = () => {
    return dispatch => {
        fetch('http://localhost:2019/category', {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            dispatch({
                type: GET_PRODUCT_CATEGORIES,
                categories: jsonResponse.message
            });
        })
        .catch(error => {
            console.log(error);
        });
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

