import {
  FETCH_ALLERGY_REQUEST,
  FETCH_ALLERGY_SUCCESS,
  FETCH_ALLERGY_FALIURE,
  POST_ALLERGY_REQUEST,
  POST_ALLERGY_SUCCESS,
  POST_ALLERGY_FALIURE,
  GET_ALLERGY_REACTION_REQUEST,
  GET_ALLERGY_REACTION_SUCCESS,
  GET_ALLERGY_REACTION_FALIURE,
  GET_ALLERGY_SEVERTIES_REQUEST,
  GET_ALLERGY_SEVERTIES_SUCCESS,
  GET_ALLERGY_SEVERTIES_FALIURE,
  DELETE_ALLERGY_REQUEST,
  DELETE_ALLERGY_SUCCESS,
  DELETE_ALLERGY_FALIURE,
  UPDATE_ALLERGY_REQUEST,
UPDATE_ALLERGY_SUCCESS,
UPDATE_ALLERGY_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};

export function getAllergy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_ALLERGY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALLERGY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_ALLERGY_FALIURE:
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
export function postAllergy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_ALLERGY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ALLERGY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_ALLERGY_FALIURE:
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


export function getAllergyReaction(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_ALLERGY_REACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALLERGY_REACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case GET_ALLERGY_REACTION_FALIURE:
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


export function getAllergySeverties(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_ALLERGY_SEVERTIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALLERGY_SEVERTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case GET_ALLERGY_SEVERTIES_FALIURE:
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




export function deleteAllergy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_ALLERGY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ALLERGY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_ALLERGY_FALIURE:
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




export function updateAllergy(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_ALLERGY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ALLERGY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_ALLERGY_FALIURE:
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