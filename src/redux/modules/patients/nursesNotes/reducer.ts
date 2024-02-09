import {
  FETCH_NURSESNOTES_REQUEST,
  FETCH_NURSESNOTES_SUCCESS,
  FETCH_NURSESNOTES_FALIURE,
  POST_NURSESNOTES_REQUEST,
  POST_NURSESNOTES_SUCCESS,
  POST_NURSESNOTES_FALIURE,
  DELETE_NURSESNOTES_REQUEST,
  DELETE_NURSESNOTES_SUCCESS,
  DELETE_NURSESNOTES_FALIURE,
  UPDATE_NURSESNOTES_REQUEST,
  UPDATE_NURSESNOTES_SUCCESS,
  UPDATE_NURSESNOTES_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getNursesNotesPlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_NURSESNOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NURSESNOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_NURSESNOTES_FALIURE:
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
export function postNursesNotesPlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_NURSESNOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_NURSESNOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_NURSESNOTES_FALIURE:
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


export function deleteNursesNotesPlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_NURSESNOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NURSESNOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_NURSESNOTES_FALIURE:
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


export function updateNursesNotesPlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_NURSESNOTES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_NURSESNOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_NURSESNOTES_FALIURE:
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