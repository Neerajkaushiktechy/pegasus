import {
  FETCH_PROVIDERNAMES_REQUEST,
  FETCH_PROVIDERNAMES_SUCCESS,
  FETCH_PROVIDERNAMES_FALIURE,
  FETCH_DOCUMENTTYPE_REQUEST,
  FETCH_DOCUMENTTYPE_SUCCESS,
  FETCH_DOCUMENTTYPE_FALIURE,
  GET_DOCUMENT_REQUEST,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FALIURE,
  POST_DOCUMENT_REQUEST,
  POST_DOCUMENT_SUCCESS,
  POST_DOCUMENT_FALIURE,
  DELETE_DOCUMENT_REQUEST,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FALIURE,
  UPDATE_DOCUMENT_REQUEST,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FALIURE,
  DOWNLOAD_DOCUMENT_REQUEST,
  DOWNLOAD_DOCUMENT_SUCCESS,
  DOWNLOAD_DOCUMENT_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};



export function getProviderName(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_PROVIDERNAMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROVIDERNAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_PROVIDERNAMES_FALIURE:
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


export function getDocumentType(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_DOCUMENTTYPE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DOCUMENTTYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_DOCUMENTTYPE_FALIURE:
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

export function getDocumentData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_DOCUMENT_FALIURE:
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

export function postDocumentData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_DOCUMENT_FALIURE:
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



export function deleteDocument(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DELETE_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DELETE_DOCUMENT_FALIURE:
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

export function updateDocument(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_DOCUMENT_FALIURE:
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

export function downloadDocument(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case DOWNLOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DOWNLOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case DOWNLOAD_DOCUMENT_FALIURE:
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