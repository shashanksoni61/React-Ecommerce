import axios from 'axios';
import {
  USER_ORDERS_REQUEST,
  USER_ORDERS_SUCCESS,
  USER_ORDERS_FAIL,
} from './types';

export const getUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDERS_REQUEST });

    const { user } = getState().auth;
    const config = {
      headers: {
        'x-auth-token': user.token,
      },
    };

    const { data } = await axios.get('/api/orders/myorders', config);

    dispatch({ type: USER_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_ORDERS_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
