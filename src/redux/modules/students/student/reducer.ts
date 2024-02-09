
import {
  GET_STUDENT_REQUEST,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_FALIURE,
  POST_STUDENT_REQUEST,
  POST_STUDENT_SUCCESS,
  POST_STUDENT_FALIURE,
  DELETE_STUDENT_REQUEST,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FALIURE,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_FALIURE,
  CHECK_STUDENT_EMAIL_REQUEST,
  CHECK_STUDENT_EMAIL_SUCCESS,
  CHECK_STUDENT_EMAIL_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";

const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  export function getStudent(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case GET_STUDENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_STUDENT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_STUDENT_FALIURE:
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

  export function poststudent(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case POST_STUDENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case POST_STUDENT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case POST_STUDENT_FALIURE:
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

  export function deleteStudent(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case DELETE_STUDENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_STUDENT_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case DELETE_STUDENT_FALIURE:
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

  
export function updateStudent(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_STUDENT_FALIURE:
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

export function checkEmail(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case CHECK_STUDENT_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_STUDENT_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHECK_STUDENT_EMAIL_FALIURE:
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