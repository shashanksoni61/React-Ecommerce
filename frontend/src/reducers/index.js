import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
});
