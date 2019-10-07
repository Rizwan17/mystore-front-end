import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import Shop from './Shop';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import ControlPanel from './ControlPanel';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducers from '../store/reducers/authReducers';
import productReducers from '../store/reducers/productReducers';
import ProductDetails from './ProductDetails';
import Home from './Home';
import Cart from './Cart';
import cartReducers from '../store/reducers/cartReducers';

const rootReducers = combineReducers({
  auth: authReducers,
  products: productReducers,
  cart: cartReducers
});

const store = createStore(rootReducers, applyMiddleware(thunk));

window.store = store;

function App() {
  return (

    <Provider store={store}>
      <Router>
        <div className="App">
            <Switch>
              
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forget-password" component={ForgetPassword} />
              <Route path="/cpanel" component={ControlPanel} />
              <Route path="/products/:category/:slug" component={ProductDetails} />
              <Route path="/products"  component={Shop} />
              <PrivateRoute path="/cart" component={Cart} />
              <Route path="/"  component={Shop} />
              
            </Switch>
            
          
        </div>
      </Router>
    </Provider>
      
    
    
  );
}

export default App;
