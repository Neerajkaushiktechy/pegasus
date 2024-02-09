
import { Prosthetics_AidsFormData } from "../../../../pages/Patient/Others/Prosthetics_Aids/components/Prosthetics_AidsForm";
import {
    FETCH_PROSTHETICSAIDS_REQUEST,
    FETCH_PROSTHETICSAIDS_SUCCESS,
    FETCH_PROSTHETICSAIDS_FALIURE,
    POST_PROSTHETICSAIDS_REQUEST,
    POST_PROSTHETICSAIDS_SUCCESS,
    POST_PROSTHETICSAIDS_FALIURE,
    DELETE_PROSTHETICSAIDS_REQUEST,
    DELETE_PROSTHETICSAIDS_SUCCESS,
    DELETE_PROSTHETICSAIDS_FALIURE,
    UPDATE_PROSTHETICSAIDS_REQUEST,
    UPDATE_PROSTHETICSAIDS_SUCCESS,
    UPDATE_PROSTHETICSAIDS_FALIURE
} from "./actionTypes";



export interface FetchSuccessPayload {
    data: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchProsthetics_AidsRequest {
    type: typeof FETCH_PROSTHETICSAIDS_REQUEST;
    payload: string;

}
export interface FetchProsthetics_AidsSuccess {
    type: typeof FETCH_PROSTHETICSAIDS_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchProsthetics_AidsFailure {
    type: typeof FETCH_PROSTHETICSAIDS_FALIURE;
    payload: FetchFailurePayload;
}
// POST Other Information 

export interface postProsthetics_AidsSuccessRequest {
    data: any;
}
export interface postProsthetics_AidsSuccessPayload {
    data: any;
}
export interface postProsthetics_AidsFailurePayload {
    error: string;
}

export interface postProsthetics_AidsRequest {
    type: typeof POST_PROSTHETICSAIDS_REQUEST;
    payload: Prosthetics_AidsFormData
}
export interface postProsthetics_AidsSuccess {
    type: typeof POST_PROSTHETICSAIDS_SUCCESS;
    payload: postProsthetics_AidsSuccessPayload;
}
export interface postProsthetics_AidsFailure {
    type: typeof POST_PROSTHETICSAIDS_FALIURE;
    payload: postProsthetics_AidsFailurePayload;
}


// Delete Other Information 
export interface deleteProsthetics_AidsRequestType {
    type: typeof DELETE_PROSTHETICSAIDS_REQUEST,
    payload: string;

}
export interface deleteProsthetics_AidsSuccessType {
    type: typeof DELETE_PROSTHETICSAIDS_SUCCESS;
    payload: any;
}
export interface deleteProsthetics_AidsFailureType {
    type: typeof DELETE_PROSTHETICSAIDS_FALIURE;
    payload: string;
}

// Update Other Information 

export interface updateProsthetics_AidsRequestType {
    type: typeof UPDATE_PROSTHETICSAIDS_REQUEST,
    payload: object;

}
export interface updateProsthetics_AidsSuccessType {
    type: typeof UPDATE_PROSTHETICSAIDS_SUCCESS;
    payload: any;
}
export interface updateProsthetics_AidsFailureType {
    type: typeof UPDATE_PROSTHETICSAIDS_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchProsthetics_AidsRequest
    | FetchProsthetics_AidsSuccess
    | FetchProsthetics_AidsFailure
    | postProsthetics_AidsRequest
    | postProsthetics_AidsSuccess
    | postProsthetics_AidsFailure
    | deleteProsthetics_AidsRequestType
    | deleteProsthetics_AidsSuccessType
    | deleteProsthetics_AidsFailureType
    | updateProsthetics_AidsRequestType
    | updateProsthetics_AidsSuccessType
    | updateProsthetics_AidsFailureType