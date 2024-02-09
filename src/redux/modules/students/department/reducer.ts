
import { GET_DEPARTMENT_FALIURE, GET_DEPARTMENT_REQUEST, GET_DEPARTMENT_SUCCESS } from "./actionTypes";
import { AuthActions } from "./types";

const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  export function getDepartments(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case GET_DEPARTMENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_DEPARTMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_DEPARTMENT_FALIURE:
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