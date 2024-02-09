
import {
    GET_PATIENTINFORMATION_REQUEST,
    GET_PATIENTINFORMATION_SUCCESS,
    GET_PATIENTINFORMATION_FALIURE,
    GET_PATIENTVITAL_REQUEST,
    GET_PATIENTVITAL_FALIURE,
    GET_PATIENTVITAL_SUCCESS
} from "./actionTypes";
import {
    FetchPatientInformationRequest,
    FetchPatientInformationSuccess,
    FetchPatientInformationFailure,
    FetchPatientVitalsRequest,
    FetchPatientVitalsSuccess,
    FetchPatientVitalsFailure
} from "./types";



// GET Document
export const fetchPatientInformationRequest = (payload: string): FetchPatientInformationRequest => ({
    type: GET_PATIENTINFORMATION_REQUEST,
    payload
});

export const fetchPatientInformationSuccess = (payload: any): FetchPatientInformationSuccess => ({
    type: GET_PATIENTINFORMATION_SUCCESS,
    payload
});

export const fetchPatientInformationFailure = (payload: string): FetchPatientInformationFailure => ({
    type: GET_PATIENTINFORMATION_FALIURE,
    payload
})

// GET Patient Vital
export const fetchPatientVitalRequest = (payload: string): FetchPatientVitalsRequest => ({
    type: GET_PATIENTVITAL_REQUEST,
    payload
});

export const fetchPatientVitalSuccess = (payload: any): FetchPatientVitalsSuccess => ({
    type: GET_PATIENTVITAL_SUCCESS,
    payload
});

export const fetchPatientVitalFailure = (payload: string): FetchPatientVitalsFailure => ({
    type: GET_PATIENTVITAL_FALIURE,
    payload
})

