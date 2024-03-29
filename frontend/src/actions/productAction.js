import { axiosInstance as axios } from '../utils/apiClient';

import {
  CLEAR_ALL_STATE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from './types';

export const listProducts =
  (searchTerm = '') =>
  async dispatch => {
    try {
      dispatch({ type: CLEAR_ALL_STATE });
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(`/api/products?search=${searchTerm}`);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const productDetails = id => async dispatch => {
  try {
    dispatch({ type: CLEAR_ALL_STATE });
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message || error.message,
      // payload:
      //   error.response && error.response.data.message
      //     ? error.response.data.message
      //     : error.message,
    });
  }
};

export const createProductReview =
  (prodId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const { user } = getState().auth;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${user.token}`,
        },
      };

      await axios.post(`/api/products/${prodId}/reviews`, review, config);

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

// for admin ----->
export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const { user } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${user.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { user } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${user.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const { user } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${user.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
