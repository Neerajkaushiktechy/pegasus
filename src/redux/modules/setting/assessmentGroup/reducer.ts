import {
  GET_ASSESSMENTGROUP_REQUEST,
  GET_ASSESSMENTGROUP_SUCCESS,
  GET_ASSESSMENTGROUP_FALIURE,
  POST_ASSESSMENTGROUP_REQUEST,
  POST_ASSESSMENTGROUP_SUCCESS,
  POST_ASSESSMENTGROUP_FALIURE,
  DELETE_ASSESSMENTGROUP_REQUEST,
  DELETE_ASSESSMENTGROUP_SUCCESS,
  DELETE_ASSESSMENTGROUP_FALIURE,
  UPDATE_ASSESSMENTGROUP_REQUEST,
  UPDATE_ASSESSMENTGROUP_SUCCESS,
  UPDATE_ASSESSMENTGROUP_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getAssessmentGroup(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_ASSESSMENTGROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ASSESSMENTGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ASSESSMENTGROUP_FALIURE:
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

export function postAssessmentGroup(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_ASSESSMENTGROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ASSESSMENTGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_ASSESSMENTGROUP_FALIURE:
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



export function deleteAssessmentGroup(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_ASSESSMENTGROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ASSESSMENTGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_ASSESSMENTGROUP_FALIURE:
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

export function updateAssessmentGroup(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_ASSESSMENTGROUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ASSESSMENTGROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_ASSESSMENTGROUP_FALIURE:
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