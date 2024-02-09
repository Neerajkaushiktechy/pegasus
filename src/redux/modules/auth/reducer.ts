import {
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FALIURE,
  FETCH_SIGNIN_REQUEST,
  FETCH_SIGNIN_SUCCESS,
  FETCH_SIGNIN_FALIURE,
  FETCH__SCHOOL_SIGNIN_REQUEST,
  FETCH__SCHOOL_SIGNIN_SUCCESS,
  FETCH__SCHOOL_SIGNIN_FALIURE,
  FETCH__STUDENT_SIGNIN_REQUEST,
  FETCH__STUDENT_SIGNIN_SUCCESS,
  FETCH__STUDENT_SIGNIN_FALIURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FALIURE,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FALIURE,
  CREATE_PASSWORD_REQUEST,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PASSWORD_FALIURE,
  LOGOUT_REQUEST
} from "./actionTypes";

import { AuthActions, SignUPState, SignINState } from "./types";

const initialSignUpState: SignUPState = {
  loading: false,
  signUp: [],
  error: null,
};

const initialSignINState: SignINState = {
  loading: false,
  signIn: {},
  error: null,
};

export function SignReducer(state = { initialSignUpState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        signUp: action.payload.signUp,
        error: null,
      };
    case FETCH_SIGNUP_FALIURE:
      return {
        ...state,
        loading: false,
        signUp: [],
        error: action.payload.error,
      };

    default:
      return {
        ...state,
      };
  }
};

export function LoginReducer(state = { initialSignINState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        signIn: action.payload.signIn,
        error: null,
      };
    case FETCH_SIGNIN_FALIURE:
      return {
        ...state,
        loading: false,
        signIn: {},
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        signIn: {},
      };

    default:
      return {
        ...state,
      };
  }
}

export function schoolLoginReducer(state = { initialSignINState }, action: AuthActions) {
  switch (action.type) {
    case FETCH__SCHOOL_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH__SCHOOL_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        signIn: action.payload.signIn,
        error: null,
      };
    case FETCH__SCHOOL_SIGNIN_FALIURE:
      return {
        ...state,
        loading: false,
        signIn: {},
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        signIn: {},
      };

    default:
      return {
        ...state,
      };
  }
}


export function studentLoginReducer(state = { initialSignINState }, action: AuthActions) {
  switch (action.type) {
    case FETCH__STUDENT_SIGNIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH__STUDENT_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        signIn: action.payload.signIn,
        error: null,
      };
    case FETCH__STUDENT_SIGNIN_FALIURE:
      return {
        ...state,
        loading: false,
        signIn: {},
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        signIn: {},
      };

    default:
      return {
        ...state,
      };
  }
}


export function forgotPasswordReducer(state = { initialSignINState }, action: AuthActions) {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        signIn: action.payload.signIn,
        error: null,
      };
    case FORGOT_PASSWORD_FALIURE:
      return {
        ...state,
        loading: false,
        signIn: {},
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        signIn: {},
      };

    default:
      return {
        ...state,
      };
  }
}


export function changePasswordReducer(state = { initialSignINState }, action: AuthActions) {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        signIn: action.payload.signIn,
        error: null,
      };
    case CHANGE_PASSWORD_FALIURE:
      return {
        ...state,
        loading: false,
        signIn: {},
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        signIn: {},
      };

    default:
      return {
        ...state,
      };
  }
}


export function createPasswordReducer(state = { initialSignINState }, action: AuthActions) {
  switch (action.type) {
    case CREATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        signIn: action.payload.signIn,
        error: null,
      };
    case CREATE_PASSWORD_FALIURE:
      return {
        ...state,
        loading: false,
        signIn: {},
        error: action.payload.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: false,
        signIn: {},
      };

    default:
      return {
        ...state,
      };
  }
}