import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
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
