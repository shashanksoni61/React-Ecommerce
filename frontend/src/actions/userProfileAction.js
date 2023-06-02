import { axiosInstance as axios } from '../utils/apiClient';

import {
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from './types';

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const { user } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${user.token}`,
      },
    };

    const { data } = await axios.get('/api/users/profile', config);
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
