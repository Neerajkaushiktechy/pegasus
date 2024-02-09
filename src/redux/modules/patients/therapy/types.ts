
import { TherapyFormData } from "../../../../pages/Patient/Others/Therapy/components/TherapyForm";
import {
    FETCH_THERAPY_REQUEST,
    FETCH_THERAPY_SUCCESS,
    FETCH_THERAPY_FALIURE,
    POST_THERAPY_REQUEST,
    POST_THERAPY_SUCCESS,
    POST_THERAPY_FALIURE,
    DELETE_THERAPY_REQUEST,
    DELETE_THERAPY_SUCCESS,
    DELETE_THERAPY_FALIURE,
    UPDATE_THERAPY_REQUEST,
    UPDATE_THERAPY_SUCCESS,
    UPDATE_THERAPY_FALIURE
} from "./actionTypes";



export interface FetchSuccessPayload {
    data: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchTherapyRequest {
    type: typeof FETCH_THERAPY_REQUEST;
    payload: string;

}
export interface FetchTherapySuccess {
    type: typeof FETCH_THERAPY_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchTherapyFailure {
    type: typeof FETCH_THERAPY_FALIURE;
    payload: FetchFailurePayload;
}
// POST Other Information 

export interface postTherapySuccessRequest {
    data: any;
}
export interface postTherapySuccessPayload {
    data: any;
}
export interface postTherapyFailurePayload {
    error: string;
}

export interface postTherapyRequest {
    type: typeof POST_THERAPY_REQUEST;
    payload: TherapyFormData
}
export interface postTherapySuccess {
    type: typeof POST_THERAPY_SUCCESS;
    payload: postTherapySuccessPayload;
}
export interface postTherapyFailure {
    type: typeof POST_THERAPY_FALIURE;
    payload: postTherapyFailurePayload;
}


// Delete Other Information 
export interface deleteTherapyRequestType {
    type: typeof DELETE_THERAPY_REQUEST,
    payload: string;

}
export interface deleteTherapySuccessType {
    type: typeof DELETE_THERAPY_SUCCESS;
    payload: any;
}
export interface deleteTherapyFailureType {
    type: typeof DELETE_THERAPY_FALIURE;
    payload: string;
}

// Update Other Information 

export interface updateTherapyRequestType {
    type: typeof UPDATE_THERAPY_REQUEST,
    payload: object;

}
export interface updateTherapySuccessType {
    type: typeof UPDATE_THERAPY_SUCCESS;
    payload: any;
}
export interface updateTherapyFailureType {
    type: typeof UPDATE_THERAPY_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchTherapyRequest
    | FetchTherapySuccess
    | FetchTherapyFailure
    | postTherapyRequest
    | postTherapySuccess
    | postTherapyFailure
    | deleteTherapyRequestType
    | deleteTherapySuccessType
    | deleteTherapyFailureType
    | updateTherapyRequestType
    | updateTherapySuccessType
    | updateTherapyFailureType