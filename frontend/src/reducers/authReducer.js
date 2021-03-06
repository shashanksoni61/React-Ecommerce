import {
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
} from '../actions/types';

const intialState = {
  isAuthenticated: localStorage.getItem('auth') ? true : false,
  loading: localStorage.getItem('auth') ? false : true,
  user: JSON.parse(localStorage.getItem('auth')) || {},
  error: null,
};

export default function authReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };

    case USER_LOGOUT:
      localStorage.removeItem('auth');
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
    case USER_PROFILE_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: {},
        error: payload,
      };
    case CLEAR_USER_STATE:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
}
