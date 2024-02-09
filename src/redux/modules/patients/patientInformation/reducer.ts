import {
  GET_PATIENTINFORMATION_REQUEST,
  GET_PATIENTINFORMATION_SUCCESS,
  GET_PATIENTINFORMATION_FALIURE,
  GET_PATIENTVITAL_REQUEST,
  GET_PATIENTVITAL_SUCCESS,
  GET_PATIENTVITAL_FALIURE
  } from "./actionTypes";
  import { AuthActions } from "./types";
  
  
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };
  
  
  export function getPatientInformationData(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case GET_PATIENTINFORMATION_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_PATIENTINFORMATION_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_PATIENTINFORMATION_FALIURE:
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
  
  export function getPatientVitalsData(state = { initialState }, action: AuthActions) {
    switch (action.type) {
      case GET_PATIENTVITAL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_PATIENTVITAL_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null,
        };
      case GET_PATIENTVITAL_FALIURE:
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
  