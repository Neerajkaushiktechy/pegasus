import {
  CREATE_CUSTOM_FORM_REQUEST,
  CREATE_CUSTOM_FORM_SUCCESS,
  CREATE_CUSTOM_FORM_FAILURE,
  SUBMIT_CUSTOM_FORM_REQUEST,
  SUBMIT_CUSTOM_FORM_SUCCESS,
  SUBMIT_CUSTOM_FORM_FAILURE,
  SHOW_FIRST_CUSTOM_FORM
} from "./actionTypes";
import { AuthActions } from "./types";

const initialState = {
  loading: false,
  data: [],
  error: null,
  showselectedFirst : false
};

export function postCustomForm(state =  { initialState } , action: AuthActions) {
  switch (action.type) {
    case CREATE_CUSTOM_FORM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CUSTOM_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
        showselectedFirst : true
      };
    case CREATE_CUSTOM_FORM_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
      case SHOW_FIRST_CUSTOM_FORM:
        return {
          ...state,
          loading: false,
          showselectedFirst : false
        };
    default:
      return {
        ...state,
      };
  }
};

export function submitCustomForm(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case SUBMIT_CUSTOM_FORM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_CUSTOM_FORM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SUBMIT_CUSTOM_FORM_FAILURE:
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