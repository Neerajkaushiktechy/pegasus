
import { LaboratoryFormData } from "../../../../pages/Patient/Others/Laboratory/components/LaboratoryForm";
import {
    FETCH_LABORATORY_REQUEST,
    FETCH_LABORATORY_SUCCESS,
    FETCH_LABORATORY_FALIURE,
    POST_LABORATORY_REQUEST,
    POST_LABORATORY_SUCCESS,
    POST_LABORATORY_FALIURE,
    DELETE_LABORATORY_REQUEST,
    DELETE_LABORATORY_SUCCESS,
    DELETE_LABORATORY_FALIURE,
    UPDATE_LABORATORY_REQUEST,
    UPDATE_LABORATORY_SUCCESS,
    UPDATE_LABORATORY_FALIURE
} from "./actionTypes";



export interface FetchSuccessPayload {
    data: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchLaboratoryRequest {
    type: typeof FETCH_LABORATORY_REQUEST;
    payload: string;

}
export interface FetchLaboratorySuccess {
    type: typeof FETCH_LABORATORY_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchLaboratoryFailure {
    type: typeof FETCH_LABORATORY_FALIURE;
    payload: FetchFailurePayload;
}
// POST Other Information 

export interface postLaboratorySuccessRequest {
    data: any;
}
export interface postLaboratorySuccessPayload {
    data: any;
}
export interface postLaboratoryFailurePayload {
    error: string;
}

export interface postLaboratoryRequest {
    type: typeof POST_LABORATORY_REQUEST;
    payload: LaboratoryFormData
}
export interface postLaboratorySuccess {
    type: typeof POST_LABORATORY_SUCCESS;
    payload: postLaboratorySuccessPayload;
}
export interface postLaboratoryFailure {
    type: typeof POST_LABORATORY_FALIURE;
    payload: postLaboratoryFailurePayload;
}


// Delete Other Information 
export interface deleteLaboratoryRequestType {
    type: typeof DELETE_LABORATORY_REQUEST,
    payload: string;

}
export interface deleteLaboratorySuccessType {
    type: typeof DELETE_LABORATORY_SUCCESS;
    payload: any;
}
export interface deleteLaboratoryFailureType {
    type: typeof DELETE_LABORATORY_FALIURE;
    payload: string;
}

// Update Other Information 

export interface updateLaboratoryRequestType {
    type: typeof UPDATE_LABORATORY_REQUEST,
    payload: object;

}
export interface updateLaboratorySuccessType {
    type: typeof UPDATE_LABORATORY_SUCCESS;
    payload: any;
}
export interface updateLaboratoryFailureType {
    type: typeof UPDATE_LABORATORY_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchLaboratoryRequest
    | FetchLaboratorySuccess
    | FetchLaboratoryFailure
    | postLaboratoryRequest
    | postLaboratorySuccess
    | postLaboratoryFailure
    | deleteLaboratoryRequestType
    | deleteLaboratorySuccessType
    | deleteLaboratoryFailureType
    | updateLaboratoryRequestType
    | updateLaboratorySuccessType
    | updateLaboratoryFailureType