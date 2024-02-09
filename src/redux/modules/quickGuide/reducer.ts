
import {
  GET_QUICK_GUIDE_REQUEST,
  GET_QUICK_GUIDE_SUCCESS,
  GET_QUICK_GUIDE_FALIURE,
  POST_QUICK_GUIDE_REQUEST,
  POST_QUICK_GUIDE_SUCCESS,
  POST_QUICK_GUIDE_FALIURE,
  DELETE_QUICK_GUIDE_REQUEST,
  DELETE_QUICK_GUIDE_FALIURE,
  DELETE_QUICK_GUIDE_SUCCESS,
  UPDATE_QUICK_GUIDE_REQUEST,
  UPDATE_QUICK_GUIDE_SUCCESS,
  UPDATE_QUICK_GUIDE_FALIURE,
} from "./actionTypes";
import { AuthActions } from "./types";

const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  export function getquickguide(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case GET_QUICK_GUIDE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_QUICK_GUIDE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload.data,
          error: null,
        };
      case GET_QUICK_GUIDE_FALIURE:
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

  export function postquickguide(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case POST_QUICK_GUIDE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case POST_QUICK_GUIDE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case POST_QUICK_GUIDE_FALIURE:
        return {
          ...state,
          loading: false,
          data: {},
          error: action.payload,
        };
      default:
        return {
          ...state,
        };
    }
  };

  export function deletequickguide(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case DELETE_QUICK_GUIDE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_QUICK_GUIDE_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case DELETE_QUICK_GUIDE_FALIURE:
        return {
          ...state,
          loading: false,
          data: {},
          error: action.payload,
        };
      default:
        return {
          ...state,
        };
    }
  };

  
export function updatequickguide(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_QUICK_GUIDE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_QUICK_GUIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_QUICK_GUIDE_FALIURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

