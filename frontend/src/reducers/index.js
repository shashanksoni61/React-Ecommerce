import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
// import userProfileReducer from './userProfileReducer';

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  // userProfile: userProfileReducer,
});
