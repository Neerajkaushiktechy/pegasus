import {
  GET_FAMILY_REQUEST,
  GET_FAMILY_SUCCESS,
  GET_FAMILY_FALIURE,
  POST_FAMILY_REQUEST,
  POST_FAMILY_SUCCESS,
  POST_FAMILY_FALIURE,
  DELETE_FAMILY_REQUEST,
  DELETE_FAMILY_SUCCESS,
  DELETE_FAMILY_FALIURE,
  UPDATE_FAMILY_REQUEST,
  UPDATE_FAMILY_SUCCESS,
  UPDATE_FAMILY_FALIURE,
  GET_FAMILY_HISTORY_TYPE_REQUEST,
  GET_FAMILY_HISTORY_TYPE_SUCCESS,
  GET_FAMILY_HISTORY_TYPE_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getFamilyData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_FAMILY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FAMILY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_FAMILY_FALIURE:
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

export function postFamilyHistory(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_FAMILY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_FAMILY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_FAMILY_FALIURE:
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



export function deleteFamilyHistory(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_FAMILY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FAMILY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_FAMILY_FALIURE:
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

export function updateFamilyHistory(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_FAMILY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_FAMILY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_FAMILY_FALIURE:
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


export function getFamilyHistoryType(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_FAMILY_HISTORY_TYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FAMILY_HISTORY_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_FAMILY_HISTORY_TYPE_FALIURE:
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