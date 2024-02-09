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
  LOGOUT_REQUEST
} from "./actionTypes";

export interface SignUp {
  name: string;
  email: string;
  password: string;
}
export interface SignUPState {
  loading: boolean;
  signUp: SignUp[];
  error: string | null;
}
export interface SignIN {
  email: string;
  password: string;
  loginfirstTime ? : number
  id?:number
}
export interface SignINState {
  loading: boolean;
  signIn: Object;
  error: string | null;
}

export interface FetchSignUPSuccessPayload {
  signUp: SignUp[];
}

export interface FetchSignUPFailurePayload {
  error: string;
}

export interface FetchSignINSuccessPayload {
  loginfirstTime: number;
  signIn: any;
  id ? :any;
}

export interface FetchSignINFailurePayload {
  error: string;
}

export interface FetchSignUPRequest {
  type: typeof FETCH_SIGNUP_REQUEST;
  payload: SignupFormData;
}

export type FetchSignUPSuccess = {
  type: typeof FETCH_SIGNUP_SUCCESS;
  payload: FetchSignUPSuccessPayload;
};

export type FetchSignUPFailure = {
  type: typeof FETCH_SIGNUP_FALIURE;
  payload: FetchSignUPFailurePayload;
};
export interface FetchSignINRequest {
  type: typeof FETCH_SIGNIN_REQUEST;
  payload: LogInFormData;
}

export type FetchSignINSuccess = {
  type: typeof FETCH_SIGNIN_SUCCESS;
  payload: FetchSignINSuccessPayload;
};

export type FetchSignINFailure = {
  type: typeof FETCH_SIGNIN_FALIURE;
  payload: FetchSignINFailurePayload;
};

export interface FetchSchoolSignINRequest {
  type: typeof FETCH__SCHOOL_SIGNIN_REQUEST;
  payload: LogInFormData;
}

export type FetchSchoolSignINSuccess = {
  type: typeof FETCH__SCHOOL_SIGNIN_SUCCESS;
  payload: FetchSignINSuccessPayload;
};

export type FetchSchoolSignINFailure = {
  type: typeof FETCH__SCHOOL_SIGNIN_FALIURE;
  payload: FetchSignINFailurePayload;
};

export interface FetchStudentSignINRequest {
  type: typeof FETCH__STUDENT_SIGNIN_REQUEST;
  payload: LogInFormData;
}

export type FetchStudentSignINSuccess = {
  type: typeof FETCH__STUDENT_SIGNIN_SUCCESS;
  payload: FetchSignINSuccessPayload;
};

export type FetchStudentSignINFailure = {
  type: typeof FETCH__STUDENT_SIGNIN_FALIURE;
  payload: FetchSignINFailurePayload;
};


// forgot password 

export interface ForgotPasswordRequest {
  type: typeof FORGOT_PASSWORD_REQUEST;
  payload: any;
}

export interface ForgotPasswordSucess {
  type: typeof FORGOT_PASSWORD_SUCCESS;
  payload: any;
}
export interface ForgotPasswordFailure {
  type: typeof FORGOT_PASSWORD_FALIURE;
  payload: any;
}


//change password 


export interface ChangePasswordRequest {
  type: typeof CHANGE_PASSWORD_REQUEST;
  payload: any;
}

export interface ChangePasswordSucess {
  type: typeof CHANGE_PASSWORD_SUCCESS;
  payload: any;
}
export interface ChangePasswordFailure {
  type: typeof CHANGE_PASSWORD_FALIURE;
  payload: any;
}


//create password 

export interface CreatePasswordRequest {
  type: typeof CREATE_PASSWORD_REQUEST;
  payload: any;
}

export interface CreatePasswordSucess {
  type: typeof CREATE_PASSWORD_SUCCESS;
  payload: any;
}
export interface CreatePasswordFailure {
  type: typeof CREATE_PASSWORD_FALIURE;
  payload: any;
}

export type LogoutRequest = {
  type: typeof LOGOUT_REQUEST;
};


export type AuthActions =
  | FetchSignUPRequest
  | FetchSignUPSuccess
  | FetchSignUPFailure
  | FetchSignINRequest
  | FetchSignINSuccess
  | FetchSignINFailure
  | FetchSchoolSignINRequest
  | FetchSchoolSignINSuccess
  | FetchSchoolSignINFailure
  | FetchStudentSignINRequest
  | FetchStudentSignINSuccess
  | FetchStudentSignINFailure
  | ForgotPasswordRequest
  | ForgotPasswordSucess
  | ForgotPasswordFailure
  | ChangePasswordRequest
  | ChangePasswordSucess
  | ChangePasswordFailure
  | CreatePasswordRequest
  | CreatePasswordSucess
  | CreatePasswordFailure
  | LogoutRequest;
