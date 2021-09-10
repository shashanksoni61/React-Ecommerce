import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ALL_STATE,
} from '../actions/types';

const initialState = {
  loading: true,
  products: [],
  error: null,
  product: {},
};

export default function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CLEAR_ALL_STATE:
      return {
        ...state,
        loading: true,
        products: [],
        error: null,
        product: {},
      };
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        products: [],
        product: {},
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
