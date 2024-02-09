import {
  FETCH_NURSINGCAREPLAN_REQUEST,
  FETCH_NURSINGCAREPLAN_SUCCESS,
  FETCH_NURSINGCAREPLAN_FALIURE,
  POST_NURSINGCAREPLAN_REQUEST,
  POST_NURSINGCAREPLAN_SUCCESS,
  POST_NURSINGCAREPLAN_FALIURE,
  DELETE_NURSINGCAREPLAN_REQUEST,
  DELETE_NURSINGCAREPLAN_SUCCESS,
  DELETE_NURSINGCAREPLAN_FALIURE,
  UPDATE_NURSINGCAREPLAN_REQUEST,
  UPDATE_NURSINGCAREPLAN_SUCCESS,
  UPDATE_NURSINGCAREPLAN_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getNursingCarePlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_NURSINGCAREPLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NURSINGCAREPLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_NURSINGCAREPLAN_FALIURE:
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
export function postNursingCarePlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_NURSINGCAREPLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_NURSINGCAREPLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_NURSINGCAREPLAN_FALIURE:
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


export function deleteNursingCarePlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_NURSINGCAREPLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_NURSINGCAREPLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_NURSINGCAREPLAN_FALIURE:
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


export function updateNursingCarePlan(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_NURSINGCAREPLAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_NURSINGCAREPLAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_NURSINGCAREPLAN_FALIURE:
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