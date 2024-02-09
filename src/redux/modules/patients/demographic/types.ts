import {
    FETCH_REFFERNAMES_REQUEST, FETCH_REFFERNAMES_SUCCESS, FETCH_REFFERNAMES_FALIURE, POST_DEMOGRAPHIC_REQUEST,
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

export interface userState {
    loading: boolean;
    refferNames: any;
    error: string | null;
}
export interface FetchSuccessPayload {
    refferNames: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchRefferNameRequest {
    type: typeof FETCH_REFFERNAMES_REQUEST;
}
export interface FetchRefferNameSuccess {
    type: typeof FETCH_REFFERNAMES_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchRefferNameFailure {
    type: typeof FETCH_REFFERNAMES_FALIURE;
    payload: FetchFailurePayload;
}
// POST DEMOGRAPHIC 

export interface postDemographicSuccessPayload {
    data : any;
}
export interface postDemographicFailurePayload {
    error: string;
}


export interface postDemographiRequest {
    type: typeof POST_DEMOGRAPHIC_REQUEST;
    payload : any
}
export interface postDemographiSuccess {
    type: typeof POST_DEMOGRAPHIC_SUCCESS;
    payload: postDemographicSuccessPayload;
}
export interface postDemographiFailure {
    type: typeof POST_DEMOGRAPHIC_FALIURE;
    payload: postDemographicFailurePayload;
}



// Get 
export interface getDemographiRequest {
    type: typeof GET_DEMOGRAPHIC_REQUEST;
    payload : any
}
export interface getDemographiSuccess {
    type: typeof GET_DEMOGRAPHIC_SUCCESS;
    payload: any;
}
export interface getDemographiFailure {
    type: typeof GET_DEMOGRAPHIC_FALIURE;
    payload: string;
}
// Update
export interface updateDemographiRequest {
    type: typeof UPDATE_DEMOGRAPHIC_REQUEST;
    payload : any
}

export interface updateDemographiSuccess {
    type: typeof UPDATE_DEMOGRAPHIC_SUCCESS;
    payload: any;
}
export interface updateDemographiFailure {
    type: typeof UPDATE_DEMOGRAPHIC_FALIURE;
    payload: string;
}



export interface deleteDemographiRequest {
    type: typeof DELETE_DEMOGRAPHIC_REQUEST;
    payload : any
}
export interface deleteDemographiSuccess {
    type: typeof DELETE_DEMOGRAPHIC_SUCCESS;
    payload: any;
}
export interface deleteDemographiFailure {
    type: typeof DELETE_DEMOGRAPHIC_FALIURE;
    payload: string;
}

export interface CheckEmailRequestType {
    type: typeof CHECK_EMAIL_REQUEST,
    payload:object;

}
export interface CheckEmailSuccessType {
    type: typeof CHECK_EMAIL_SUCCESS;
    payload: string;
}
export interface CheckEmailFailureType {
    type: typeof CHECK_EMAIL_FALIURE;
    payload: string;
}



export type AuthActions =
  | FetchRefferNameRequest
  | FetchRefferNameSuccess
  | FetchRefferNameFailure
  | postDemographiRequest
  | postDemographiSuccess
  | postDemographiFailure
  | getDemographiRequest
  | getDemographiSuccess
  | getDemographiFailure
  | updateDemographiRequest
  | updateDemographiSuccess
  | updateDemographiFailure
  | deleteDemographiRequest
  | deleteDemographiSuccess
  | deleteDemographiFailure
  | CheckEmailRequestType
  | CheckEmailSuccessType
  | CheckEmailFailureType