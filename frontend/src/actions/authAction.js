import axios from 'axios';
import {
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
  dispatch({ type: USER_LOGOUT });
};

export const updateUserProfile =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_PROFILE_REQUEST });

      const { user } = getState().auth;

      const updatedUserData = { name, email, password };
      console.log(user.token);
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

      console.log('profile updated with following data');
      console.log(data);
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
