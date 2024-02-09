import { SignupFormData } from "../../../pages/Auth/SignUp/components/SignUpForm";
import { LogInFormData } from "../../../pages/Auth/LogIn/components/LogInForm";
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
  LOGOUT_REQUEST,
} from "./actionTypes";
import {
  FetchSignUPRequest,
  FetchSignUPSuccess,
  FetchSignUPFailure,
  FetchSignUPSuccessPayload,
  FetchSignUPFailurePayload,
  FetchSignINRequest,
  FetchSignINSuccess,
  FetchSignINFailure,
  FetchSignINSuccessPayload,
  FetchSignINFailurePayload,
  FetchSchoolSignINRequest,
  FetchSchoolSignINSuccess,
  FetchSchoolSignINFailure,
  FetchStudentSignINRequest,
  FetchStudentSignINSuccess,
  FetchStudentSignINFailure,
  ForgotPasswordRequest,
  ForgotPasswordSucess,
  ForgotPasswordFailure,
  ChangePasswordRequest,
  ChangePasswordSucess,
  ChangePasswordFailure,
  CreatePasswordRequest,
  CreatePasswordSucess,
  CreatePasswordFailure
} from "./types";
import { encrypt } from "../../../utils/encryptDecrypt";

export const fetchSignUpRequest = (
  payload: SignupFormData
): FetchSignUPRequest => ({
  type: FETCH_SIGNUP_REQUEST,
  payload,
});


export const fetchSignUpSuccess = (
  payload: FetchSignUPSuccessPayload
): FetchSignUPSuccess => ({
  type: FETCH_SIGNUP_SUCCESS,
  payload,
});


export const fetchSignUpFailure = (
  payload: FetchSignUPFailurePayload
): FetchSignUPFailure => ({
  type: FETCH_SIGNUP_FALIURE,
  payload,
});

// Fetch Login Request
export const fetchSignINRequest = (
  payload: LogInFormData
): FetchSignINRequest => ({
  type: FETCH_SIGNIN_REQUEST,
  payload,
});


export const fetchSignInSuccess = (
  payload: FetchSignINSuccessPayload
): FetchSignINSuccess => {
  if (payload.signIn.success) {
    localStorage.setItem("item", encrypt(JSON.stringify(payload.signIn)))
  }
  return ({
    type: FETCH_SIGNIN_SUCCESS,
    payload,
  })
};


export const fetchSignINFailure = (
  payload: FetchSignINFailurePayload
): FetchSignINFailure => ({
  type: FETCH_SIGNIN_FALIURE,
  payload,
});



// Fetch School Login Request
export const fetchSchoolSignINRequest = (
  payload: LogInFormData
): FetchSchoolSignINRequest => ({
  type: FETCH__SCHOOL_SIGNIN_REQUEST,
  payload,
});


export const fetchSchoolSignInSuccess = (
  payload: FetchSignINSuccessPayload
): FetchSchoolSignINSuccess => {
  if (payload.signIn.success && payload?.loginfirstTime === 1) {
    localStorage.setItem("item", encrypt(JSON.stringify(payload.signIn)))
  }
  return ({
    type: FETCH__SCHOOL_SIGNIN_SUCCESS,
    payload,
  })
};


export const fetchSchoolSignINFailure = (
  payload: FetchSignINFailurePayload
): FetchSchoolSignINFailure => ({
  type: FETCH__SCHOOL_SIGNIN_FALIURE,
  payload,
});

// Fetch Student Login Request
export const fetcStudentSignINRequest = (
  payload: LogInFormData
): FetchStudentSignINRequest => ({
  type: FETCH__STUDENT_SIGNIN_REQUEST,
  payload,
});


export const fetcStudentSignInSuccess = (
  payload: FetchSignINSuccessPayload
): FetchStudentSignINSuccess => {
  if (payload.signIn.success && payload?.loginfirstTime === 1) {
    localStorage.setItem("item", encrypt(JSON.stringify(payload.signIn)))
  }
  return ({
    type: FETCH__STUDENT_SIGNIN_SUCCESS,
    payload,
  })
};


export const fetcStudentSignINFailure = (
  payload: FetchSignINFailurePayload
): FetchStudentSignINFailure => ({
  type: FETCH__STUDENT_SIGNIN_FALIURE,
  payload,
});

// forgot password 

export const forgotPasswordRequest = (
  payload: any
): ForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});

export const forgotPasswordSuccess = (
  payload: any
): ForgotPasswordSucess => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordFailure = (
  payload: any
): ForgotPasswordFailure => ({
  type: FORGOT_PASSWORD_FALIURE,
  payload,
});


// change password 

export const changePasswordRequest = (
  payload: any
): ChangePasswordRequest => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload,
});

export const changePasswordSuccess = (
  payload: any
): ChangePasswordSucess => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload,
});

export const changePasswordFailure = (
  payload: any
): ChangePasswordFailure => ({
  type: CHANGE_PASSWORD_FALIURE,
  payload,
});


// create password 

export const createPasswordRequest = (
  payload: any
): CreatePasswordRequest => ({
  type: CREATE_PASSWORD_REQUEST,
  payload,
});

export const createPasswordSuccess = (
  payload: any
): CreatePasswordSucess => ({
  type: CREATE_PASSWORD_SUCCESS,
  payload,
});

export const createPasswordFailure = (
  payload: any
): CreatePasswordFailure => ({
  type: CREATE_PASSWORD_FALIURE,
  payload,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST
});