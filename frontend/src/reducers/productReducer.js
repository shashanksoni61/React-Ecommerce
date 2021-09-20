import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ALL_STATE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
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

//For Admin ------>
export function productDeleteReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
}

export function productCreateReducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        product: payload,
        success: true,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
