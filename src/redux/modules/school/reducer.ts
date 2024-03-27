
import {
  GET_SCHOOL_REQUEST,
  GET_SCHOOL_SUCCESS,
  GET_SCHOOL_FALIURE,
  POST_SCHOOL_REQUEST,
  POST_SCHOOL_SUCCESS,
  POST_SCHOOL_FALIURE,
  DELETE_SCHOOL_REQUEST,
  DELETE_SCHOOL_FALIURE,
  DELETE_SCHOOL_SUCCESS,
  UPDATE_SCHOOL_REQUEST,
  UPDATE_SCHOOL_SUCCESS,
  CHECK__SCHOOL_EMAIL_REQUEST,
  CHECK__SCHOOL_EMAIL_FALIURE,
  CHECK_SCHOOL_EMAIL_SUCCESS,
  CHECK__USERID_REQUEST,
  CHECK_USERID_SUCCESS,
  CHECK__USERID_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";

const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  export function getSchool(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case GET_SCHOOL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_SCHOOL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload.data,
          error: null,
        };
      case GET_SCHOOL_FALIURE:
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

  export function postschool(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case POST_SCHOOL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case POST_SCHOOL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case POST_SCHOOL_FALIURE:
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

  export function deleteSchool(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case DELETE_SCHOOL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_SCHOOL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case DELETE_SCHOOL_FALIURE:
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

  
export function updateSchool(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_SCHOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SCHOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_SCHOOL_SUCCESS:
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

export function checkSchoolEmail(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case CHECK__SCHOOL_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_SCHOOL_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHECK__SCHOOL_EMAIL_FALIURE:
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

export function checkSchoolUserId(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case CHECK__USERID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_USERID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHECK__USERID_FALIURE:
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