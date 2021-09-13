import {
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from '../actions/types';

const initialState = {
  loading: true,
  error: null,
  user: {},
};

export default function userProfileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        user: {},
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: payload,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
