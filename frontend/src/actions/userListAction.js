import axios from 'axios';
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
} from './types';

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const { user } = getState().auth;
    const config = {
      headers: {
        'x-auth-token': user.token,
      },
    };

    const { data } = await axios.get('/api/users', config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const { user } = getState().auth;
    const config = {
      headers: {
        'x-auth-token': user.token,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
