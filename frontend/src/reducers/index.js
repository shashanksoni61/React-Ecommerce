import { combineReducers } from 'redux';
import productReducer, {
  productCreateReducer,
  productDeleteReducer,
  productReviewReducer,
  productUpdateReducer,
} from './productReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import {
  orderReducer,
  orderPaidReducer,
  orderListReducer,
  orderDeliverReducer,
} from './orderReducer';
import userOrdersReducer from './userOrdersReducer';
import userListReducer, { userDeleteReducer } from './userListReducer';
import userDetailsReducer from './userDetailsReducer';

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  orderPaid: orderPaidReducer,
  userOrders: userOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productReview: productReviewReducer,
  orderList: orderListReducer,
  orderDelivered: orderDeliverReducer,
});

// after userOrders state, all states are for admin
