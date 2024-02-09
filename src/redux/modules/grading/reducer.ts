import {
  GET_GRADING_REQUEST,
  GET_GRADING_SUCCESS,
  GET_GRADING_FALIURE,
  POST_GRADING_REQUEST,
  POST_GRADING_SUCCESS,
  POST_GRADING_FALIURE,
  DELETE_GRADING_REQUEST,
  DELETE_GRADING_SUCCESS,
  DELETE_GRADING_FALIURE,
  UPDATE_GRADING_REQUEST,
  UPDATE_GRADING_SUCCESS,
  UPDATE_GRADING_FALIURE,
  GET_FORM_DATA_REQUEST,
  GET_FORM_DATA_SUCCESS,
  GET_FORM_DATA_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};




export function getFormData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_FORM_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FORM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_FORM_DATA_FALIURE:
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

export function getGrading(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_GRADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_GRADING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_GRADING_FALIURE:
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

export function postGrading(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_GRADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_GRADING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_GRADING_FALIURE:
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



export function deleteGrading(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_GRADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_GRADING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_GRADING_FALIURE:
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

export function updateGrading(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_GRADING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_GRADING_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_GRADING_FALIURE:
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