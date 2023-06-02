import { axiosInstance as axios } from '../utils/apiClient';
import {
  CLEAR_CART_STATE,
  CLEAR_FETCHED_ORDER_STATE,
  CLEAR_USER_ORDERS_STATE,
  CLEAR_USER_STATE,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from './types';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // add header
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { email, password };

    const { data } = await axios.post('/api/users/login', body, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('auth', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const register = (name, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    // add header
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = { name, email, password };

    const { data } = await axios.post('/api/users/register', body, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem('auth', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const logout = () => dispatch => {
  console.log('logout action working');
  console.log('Clearing All States before logout');
  dispatch({ type: CLEAR_CART_STATE });
  dispatch({ type: CLEAR_FETCHED_ORDER_STATE });
  dispatch({ type: CLEAR_USER_ORDERS_STATE });
  dispatch({ type: CLEAR_USER_STATE });
  dispatch({ type: USER_LOGOUT });
};

export const updateUserProfile =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_PROFILE_REQUEST });

      const { user } = getState().auth;

      const updatedUserData = { name, email, password };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${user.token}`,
        },
      };

      const { data } = await axios.put(
        '/api/users/profile',
        updatedUserData,
        config
      );

      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };
