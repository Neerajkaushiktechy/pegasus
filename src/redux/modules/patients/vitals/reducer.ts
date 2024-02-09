import {
  GET_VITALS_REQUEST,
  GET_VITALS_SUCCESS,
  GET_VITALS_FALIURE,
  POST_VITALS_REQUEST,
  POST_VITALS_SUCCESS,
  POST_VITALS_FALIURE,
  DELETE_VITALS_REQUEST,
  DELETE_VITALS_SUCCESS,
  DELETE_VITALS_FALIURE,
  UPDATE_VITALS_REQUEST,
  UPDATE_VITALS_SUCCESS,
  UPDATE_VITALS_FALIURE,
  GET_OXYGEN_SUPPLY_REQUEST,
  GET_OXYGEN_SUPPLY_SUCCESS,
  GET_OXYGEN_SUPPLY_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getVitals(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_VITALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_VITALS_FALIURE:
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

export function postVitals(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_VITALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_VITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_VITALS_FALIURE:
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



export function deleteVitals(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_VITALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_VITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_VITALS_FALIURE:
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

export function updateVitals(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_VITALS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_VITALS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_VITALS_FALIURE:
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


  
export function getOxygensupplyMasterData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_OXYGEN_SUPPLY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_OXYGEN_SUPPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_OXYGEN_SUPPLY_FALIURE:
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