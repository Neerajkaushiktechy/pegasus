import {
  FETCH_PROSTHETICSAIDS_REQUEST,
  FETCH_PROSTHETICSAIDS_SUCCESS,
  FETCH_PROSTHETICSAIDS_FALIURE,
  POST_PROSTHETICSAIDS_REQUEST,
  POST_PROSTHETICSAIDS_SUCCESS,
  POST_PROSTHETICSAIDS_FALIURE,
  DELETE_PROSTHETICSAIDS_REQUEST,
  DELETE_PROSTHETICSAIDS_SUCCESS,
  DELETE_PROSTHETICSAIDS_FALIURE,
  UPDATE_PROSTHETICSAIDS_REQUEST,
  UPDATE_PROSTHETICSAIDS_SUCCESS,
  UPDATE_PROSTHETICSAIDS_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getProsthetics_Aids(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_PROSTHETICSAIDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROSTHETICSAIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_PROSTHETICSAIDS_FALIURE:
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
export function postProsthetics_Aids(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_PROSTHETICSAIDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_PROSTHETICSAIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_PROSTHETICSAIDS_FALIURE:
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


export function deleteProsthetics_Aids(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_PROSTHETICSAIDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PROSTHETICSAIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_PROSTHETICSAIDS_FALIURE:
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


export function updateProsthetics_Aids(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_PROSTHETICSAIDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROSTHETICSAIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_PROSTHETICSAIDS_FALIURE:
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