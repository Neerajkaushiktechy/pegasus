import {
  FETCH_DOCTORORDER_REQUEST,
  FETCH_DOCTORORDER_SUCCESS,
  FETCH_DOCTORORDER_FALIURE,
  POST_DOCTORORDER_REQUEST,
  POST_DOCTORORDER_SUCCESS,
  POST_DOCTORORDER_FALIURE,
  DELETE_DOCTORORDER_REQUEST,
  DELETE_DOCTORORDER_SUCCESS,
  DELETE_DOCTORORDER_FALIURE,
  UPDATE_DOCTORORDER_REQUEST,
  UPDATE_DOCTORORDER_SUCCESS,
  UPDATE_DOCTORORDER_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getDoctorsOrders(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_DOCTORORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DOCTORORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_DOCTORORDER_FALIURE:
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
export function postDoctorsOrders(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_DOCTORORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_DOCTORORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_DOCTORORDER_FALIURE:
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


export function deleteDoctorsOrders(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_DOCTORORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DOCTORORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_DOCTORORDER_FALIURE:
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


export function updateDoctorsOrders(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_DOCTORORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DOCTORORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_DOCTORORDER_FALIURE:
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