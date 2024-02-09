import {
  FETCH_THERAPY_REQUEST,
  FETCH_THERAPY_SUCCESS,
  FETCH_THERAPY_FALIURE,
  POST_THERAPY_REQUEST,
  POST_THERAPY_SUCCESS,
  POST_THERAPY_FALIURE,
  DELETE_THERAPY_REQUEST,
  DELETE_THERAPY_SUCCESS,
  DELETE_THERAPY_FALIURE,
  UPDATE_THERAPY_REQUEST,
  UPDATE_THERAPY_SUCCESS,
  UPDATE_THERAPY_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getTherapy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_THERAPY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_THERAPY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_THERAPY_FALIURE:
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
export function postTherapy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_THERAPY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_THERAPY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_THERAPY_FALIURE:
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


export function deleteTherapy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_THERAPY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_THERAPY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_THERAPY_FALIURE:
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


export function updateTherapy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_THERAPY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_THERAPY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_THERAPY_FALIURE:
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