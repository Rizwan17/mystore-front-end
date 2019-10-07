import { AUTHENTICATE_USER, LOGOUT_USER } from "../actions/authActions";

const initState = {
    isAuthenticated: false,
    user: {},
    token: ''
}

const authReducers = (state = initState, action) => {
    switch(action.type){
        case AUTHENTICATE_USER: 
            state = {
                ...state,
                isAuthenticated: true,
                user: action.auth.user,
                token: action.auth.token
            }
            break;
        case LOGOUT_USER:
            state = {
                isAuthenticated: false,
                user: {},
                token: ''
            }
            break;
        default:
            return state;
    }
    return state;
}

export default authReducers;