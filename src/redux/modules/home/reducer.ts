import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FALIURE,
} from "./actionTypes";

import { AuthActions, userState } from "./types";

const initialState: userState = {
  loading: false,
  user: {},
  error: null,
};

export function UserReducer(state = {initialState}, action: AuthActions)  {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        error: null,
      };
    case FETCH_USER_FALIURE:
      return {
        ...state,
        loading: false,
        user: {},
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};