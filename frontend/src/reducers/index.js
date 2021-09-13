import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
// import userProfileReducer from './userProfileReducer';

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  // userProfile: userProfileReducer,
});
