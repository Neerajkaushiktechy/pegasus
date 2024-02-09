
import {
    GET_PATIENTINFORMATION_REQUEST,
    GET_PATIENTINFORMATION_SUCCESS,
    GET_PATIENTINFORMATION_FALIURE,
    GET_PATIENTVITAL_REQUEST,
    GET_PATIENTVITAL_SUCCESS,
    GET_PATIENTVITAL_FALIURE

} from "./actionTypes"



// GET Document 
export interface FetchPatientInformationRequest {
    type: typeof GET_PATIENTINFORMATION_REQUEST;
    payload: string;
}
export interface FetchPatientInformationSuccess {
    type: typeof GET_PATIENTINFORMATION_SUCCESS;
    payload: any;
}
export interface FetchPatientInformationFailure {
    type: typeof GET_PATIENTINFORMATION_FALIURE;
    payload: string;
}

// GET Vitals 
export interface FetchPatientVitalsRequest {
    type: typeof GET_PATIENTVITAL_REQUEST;
    payload: string;
}
export interface FetchPatientVitalsSuccess {
    type: typeof GET_PATIENTVITAL_SUCCESS;
    payload: any;
}
export interface FetchPatientVitalsFailure {
    type: typeof GET_PATIENTVITAL_FALIURE;
    payload: string;
}


export type AuthActions =

    | FetchPatientInformationRequest
    | FetchPatientInformationSuccess
    | FetchPatientInformationFailure
    | FetchPatientVitalsRequest
    | FetchPatientVitalsSuccess
    | FetchPatientVitalsFailure