import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../actions/types';

const intialState = {
  loading: true,
  success: false,
  order: {},
  error: null,
};

export default function orderReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQUEST:
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
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
    default:
      return state;
  }
}
