import {
  GET_SOCIAL_REQUEST,
  GET_SOCIAL_SUCCESS,
  GET_SOCIAL_FALIURE,
  POST_SOCIAL_REQUEST,
  POST_SOCIAL_SUCCESS,
  POST_SOCIAL_FALIURE,
  DELETE_SOCIAL_REQUEST,
  DELETE_SOCIAL_SUCCESS,
  DELETE_SOCIAL_FALIURE,
  UPDATE_SOCIAL_REQUEST,
  UPDATE_SOCIAL_SUCCESS,
  UPDATE_SOCIAL_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getSocial(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_SOCIAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SOCIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_SOCIAL_FALIURE:
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

export function postSocial(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_SOCIAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_SOCIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_SOCIAL_FALIURE:
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



export function deleteSocial(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_SOCIAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SOCIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_SOCIAL_FALIURE:
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

export function updateSocial(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_SOCIAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SOCIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_SOCIAL_FALIURE:
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