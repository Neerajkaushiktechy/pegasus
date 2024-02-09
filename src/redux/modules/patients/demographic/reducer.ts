import { FETCH_REFFERNAMES_REQUEST,FETCH_REFFERNAMES_SUCCESS,FETCH_REFFERNAMES_FALIURE,POST_DEMOGRAPHIC_REQUEST,
  POST_DEMOGRAPHIC_SUCCESS,
  POST_DEMOGRAPHIC_FALIURE, 
  GET_DEMOGRAPHIC_REQUEST,
  GET_DEMOGRAPHIC_SUCCESS,
  GET_DEMOGRAPHIC_FALIURE,
  UPDATE_DEMOGRAPHIC_REQUEST,
  UPDATE_DEMOGRAPHIC_SUCCESS,
  UPDATE_DEMOGRAPHIC_FALIURE,
  DELETE_DEMOGRAPHIC_REQUEST,
  DELETE_DEMOGRAPHIC_SUCCESS,
  DELETE_DEMOGRAPHIC_FALIURE,
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_FALIURE,
  CHECK_EMAIL_SUCCESS
} from "./actionTypes";
import { AuthActions, userState } from "./types";

const initialState: userState = {
  loading: false,
  refferNames: [],
  error: null,
};
const initialStateDemographic  = {
  loading: false,
  data: {},
  error: null,
};

export function RefferNames(state = {initialState}, action: AuthActions)  {
  switch (action.type) {
    case FETCH_REFFERNAMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REFFERNAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        refferNames: action.payload.refferNames,
        error: null,
      };
    case FETCH_REFFERNAMES_FALIURE:
      return {
        ...state,
        loading: false,
        refferNames: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
export function postDemographic(state = {initialStateDemographic}, action: AuthActions)  {
  switch (action.type) {
    case POST_DEMOGRAPHIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_DEMOGRAPHIC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case POST_DEMOGRAPHIC_FALIURE:
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
export function getDemographic(state = {initialStateDemographic}, action: AuthActions)  {
  switch (action.type) {
    case GET_DEMOGRAPHIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DEMOGRAPHIC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_DEMOGRAPHIC_FALIURE:
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
export function updateDemographic(state = {initialStateDemographic}, action: AuthActions)  {
  switch (action.type) {
    case UPDATE_DEMOGRAPHIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DEMOGRAPHIC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_DEMOGRAPHIC_FALIURE:
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
export function deleteDemographic(state = {initialStateDemographic}, action: AuthActions)  {
  switch (action.type) {
    case DELETE_DEMOGRAPHIC_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DEMOGRAPHIC_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_DEMOGRAPHIC_FALIURE:
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


export function checkEmailForDemoGraphic(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case CHECK_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHECK_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case CHECK_EMAIL_FALIURE:
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