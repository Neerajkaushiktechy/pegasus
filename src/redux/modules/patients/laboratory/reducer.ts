import {
  FETCH_LABORATORY_REQUEST,
  FETCH_LABORATORY_SUCCESS,
  FETCH_LABORATORY_FALIURE,
  POST_LABORATORY_REQUEST,
  POST_LABORATORY_SUCCESS,
  POST_LABORATORY_FALIURE,
  DELETE_LABORATORY_REQUEST,
  DELETE_LABORATORY_SUCCESS,
  DELETE_LABORATORY_FALIURE,
  UPDATE_LABORATORY_REQUEST,
  UPDATE_LABORATORY_SUCCESS,
  UPDATE_LABORATORY_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getLaboratory(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_LABORATORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LABORATORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_LABORATORY_FALIURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
export function postLaboratory(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_LABORATORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_LABORATORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_LABORATORY_FALIURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};


export function deleteLaboratory(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_LABORATORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_LABORATORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_LABORATORY_FALIURE:
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


export function updateLaboratory(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_LABORATORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_LABORATORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_LABORATORY_FALIURE:
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