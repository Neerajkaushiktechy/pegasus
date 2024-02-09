import {
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FALIURE,
} from "./actionTypes";
import { AuthActions } from "./types";

const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  export function getCourses(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case GET_COURSE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_COURSE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_COURSE_FALIURE:
        return {
          ...state,
          loading: false,
          data: [],
          error: action.payload,
        };
      default:
        return {
          ...state,
        };
    }
  };