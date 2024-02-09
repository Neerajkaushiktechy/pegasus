import {
  GET_ASSESSMENTTOOL_REQUEST,
  GET_ASSESSMENTTOOL_SUCCESS,
  GET_ASSESSMENTTOOL_FALIURE,
  POST_ASSESSMENTTOOL_REQUEST,
  POST_ASSESSMENTTOOL_SUCCESS,
  POST_ASSESSMENTTOOL_FALIURE,
  DELETE_ASSESSMENTTOOL_REQUEST,
  DELETE_ASSESSMENTTOOL_SUCCESS,
  DELETE_ASSESSMENTTOOL_FALIURE,
  UPDATE_ASSESSMENTTOOL_REQUEST,
  UPDATE_ASSESSMENTTOOL_SUCCESS,
  UPDATE_ASSESSMENTTOOL_FALIURE,
  GET_ASSESSMENTTYPE_REQUEST,
  GET_ASSESSMENTTYPE_SUCCESS,
  GET_ASSESSMENTTYPE_FALIURE,
  POST_ASSESSMENTTYPE_REQUEST,
  POST_ASSESSMENTTYPE_SUCCESS,
  POST_ASSESSMENTTYPE_FALIURE,
  SHOW_ASSESSMENT_FORM,
  EDIT_CUSTOM_FORM_ASSESSMENT_FORM
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
  assementFormData: {
    formData: null,
    showForm: false,
  },
  customFormName : null
};

export function getAssessment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_ASSESSMENTTOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ASSESSMENTTOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ASSESSMENTTOOL_FALIURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
      case SHOW_ASSESSMENT_FORM:
        return {
          ...state,
          assementFormData: {
            formData: action.payload,
            showForm: action.formType
          }
        }

    default:
      return {
        ...state,
      };
  }
};

export function postAssessment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_ASSESSMENTTOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ASSESSMENTTOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case EDIT_CUSTOM_FORM_ASSESSMENT_FORM : 
      return {
        ...state,
        customFormName: action.payload,
      }
    case POST_ASSESSMENTTOOL_FALIURE:
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



export function deleteAssessment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_ASSESSMENTTOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ASSESSMENTTOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_ASSESSMENTTOOL_FALIURE:
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

export function updateAssessment(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_ASSESSMENTTOOL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ASSESSMENTTOOL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_ASSESSMENTTOOL_FALIURE:
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


export function getAssessmentType(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_ASSESSMENTTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ASSESSMENTTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_ASSESSMENTTYPE_FALIURE:
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


export function postAssessmentType(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_ASSESSMENTTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ASSESSMENTTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_ASSESSMENTTYPE_FALIURE:
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