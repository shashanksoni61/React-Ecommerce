import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../actions/types';

const initialState = {
  loading: true,
  error: null,
  user: {},
};

export default function userDetailsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS_REQUEST:
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        user: {},
      };
    case USER_DETAILS_SUCCESS:
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: payload,
      };
    case USER_DETAILS_FAIL:
    case USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
}
