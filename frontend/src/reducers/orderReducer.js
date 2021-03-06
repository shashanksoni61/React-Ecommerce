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
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
} from '../actions/types';

const intialState = {
  loading: true,
  success: false,
  order: null,
  error: null,
  orderCreated: false,
};

export function orderReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
        order: null,
        error: null,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: payload,
        orderCreated: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: payload,
        orderCreated: false,
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
//  Admin ---------->
const orderListState = { orders: [] };

export function orderListReducer(state = orderListState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
