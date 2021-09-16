import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  CLEAR_FETCHED_ORDER_STATE,
} from '../actions/types';

const intialState = {
  loading: true,
  success: false,
  order: null,
  error: null,
};

export function orderReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: payload,
      };
    case ORDER_DETAILS_FAIL:
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: payload,
      };
    case CLEAR_FETCHED_ORDER_STATE:
      return intialState;
    default:
      return state;
  }
}

export function orderPaidReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
}
