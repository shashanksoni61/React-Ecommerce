import {
  CLEAR_USER_ORDERS_STATE,
  USER_ORDERS_FAIL,
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: true,
  orders: null,
  error: null,
};

export default function userOrdersReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: payload,
      };
    case USER_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_USER_ORDERS_STATE:
      return {
        ...state,
        loading: false,
        error: null,
        orders: null,
      };
    default:
      return state;
  }
}
