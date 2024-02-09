import {
  GET_MEDICATION_REQUEST,
  GET_MEDICATION_SUCCESS,
  GET_MEDICATION_FALIURE,
  POST_MEDICATION_REQUEST,
  POST_MEDICATION_SUCCESS,
  POST_MEDICATION_FALIURE,
  DELETE_MEDICATION_REQUEST,
  DELETE_MEDICATION_SUCCESS,
  DELETE_MEDICATION_FALIURE,
  UPDATE_MEDICATION_REQUEST,
  UPDATE_MEDICATION_SUCCESS,
  UPDATE_MEDICATION_FALIURE,
  GET_MEDECATION_FORM_DATA_REQUEST,
  GET_MEDECATION_FORM_DATA_SUCCESS,
  GET_MEDECATION_FORM_DATA_FALIURE,
  POST_CUSTOMMEDICATIONROUTE_REQUEST,
  POST_CUSTOMMEDICATIONROUTE_SUCCESS,
  POST_CUSTOMMEDICATIONROUTE_FALIURE,
  GET_MEDICATIONMEDICINE_REQUEST,
  GET_MEDICATIONMEDICINE_SUCCESS,
  GET_MEDICATIONMEDICINE_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};




export function getMedicationFormData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MEDECATION_FORM_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MEDECATION_FORM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MEDECATION_FORM_DATA_FALIURE:
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

export function getMedication(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MEDICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MEDICATION_FALIURE:
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

export function postMedication(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_MEDICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_MEDICATION_FALIURE:
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



export function deleteMedication(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_MEDICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_MEDICATION_FALIURE:
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

export function updateMedication(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_MEDICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_MEDICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_MEDICATION_FALIURE:
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

export function postCustomMedicationRoute(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_CUSTOMMEDICATIONROUTE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_CUSTOMMEDICATIONROUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_CUSTOMMEDICATIONROUTE_FALIURE:
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

export function getMedicationMedicine(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MEDICATIONMEDICINE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MEDICATIONMEDICINE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MEDICATIONMEDICINE_FALIURE:
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
