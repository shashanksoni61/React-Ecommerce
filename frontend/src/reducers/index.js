import { combineReducers } from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import { orderReducer, orderPaidReducer } from './orderReducer';
import userOrdersReducer from './userOrdersReducer';
import userListReducer from './userListReducer';
// import userProfileReducer from './userProfileReducer';

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  orderPaid: orderPaidReducer,
  userOrders: userOrdersReducer,
  userList: userListReducer,
  // userProfile: userProfileReducer,
});
