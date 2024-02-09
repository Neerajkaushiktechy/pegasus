import {
  GET_ASSIGNMENT_REQUEST,
  GET_ASSIGNMENT_SUCCESS,
  GET_ASSIGNMENT_FALIURE,
  POST_ASSIGNMENT_REQUEST,
  POST_ASSIGNMENT_SUCCESS,
  POST_ASSIGNMENT_FALIURE,
  DELETE_ASSIGNMENT_REQUEST,
  DELETE_ASSIGNMENT_SUCCESS,
  DELETE_ASSIGNMENT_FALIURE,
  UPDATE_ASSIGNMENT_REQUEST,
  UPDATE_ASSIGNMENT_SUCCESS,
  UPDATE_ASSIGNMENT_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getAssignment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ASSIGNMENT_FALIURE:
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

export function postAssignment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_ASSIGNMENT_FALIURE:
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



export function deleteAssignment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_ASSIGNMENT_FALIURE:
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

export function updateAssignment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_ASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_ASSIGNMENT_FALIURE:
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