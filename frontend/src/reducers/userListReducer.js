import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from '../actions/types';

const intialState = {
  loading: true,
  error: null,
  users: [],
};

export default function userListReducer(state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [], error: null };
    case USER_LIST_SUCCESS:
      return { ...state, loading: false, users: payload };
    case USER_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
