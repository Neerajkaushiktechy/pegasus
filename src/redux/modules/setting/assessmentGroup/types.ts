
import {
    GET_ASSESSMENTGROUP_REQUEST,
    GET_ASSESSMENTGROUP_SUCCESS,
    GET_ASSESSMENTGROUP_FALIURE,
    POST_ASSESSMENTGROUP_REQUEST,
    POST_ASSESSMENTGROUP_SUCCESS,
    POST_ASSESSMENTGROUP_FALIURE,
    DELETE_ASSESSMENTGROUP_REQUEST,
    DELETE_ASSESSMENTGROUP_SUCCESS,
    DELETE_ASSESSMENTGROUP_FALIURE,
    UPDATE_ASSESSMENTGROUP_REQUEST,
    UPDATE_ASSESSMENTGROUP_SUCCESS,
    UPDATE_ASSESSMENTGROUP_FALIURE
} from "./actionTypes";


// GET Viatl History
export interface getDataRequestType {
    type: typeof GET_ASSESSMENTGROUP_REQUEST;
}
export interface getDataSuccessType {
    type: typeof GET_ASSESSMENTGROUP_SUCCESS;
    payload: any;
}
export interface getDataFailureType {
    type: typeof GET_ASSESSMENTGROUP_FALIURE;
    payload: string;
}

// POST  History 
export interface postDataRequestType {
    type: typeof POST_ASSESSMENTGROUP_REQUEST;
    payload: any
}
export interface postDataSuccessType {
    type: typeof POST_ASSESSMENTGROUP_SUCCESS;
    payload: any;
}
export interface postDataFailureType {
    type: typeof POST_ASSESSMENTGROUP_FALIURE;
    payload: string;
}

// DELETE  History
export interface deleteRequestType {
    type: typeof DELETE_ASSESSMENTGROUP_REQUEST,
    payload: string;
}
export interface deleteSuccessType {
    type: typeof DELETE_ASSESSMENTGROUP_SUCCESS;
    payload: any;
}
export interface deleteFailureType {
    type: typeof DELETE_ASSESSMENTGROUP_FALIURE;
    payload: string;
}

// UPDATE  History
export interface updateRequestType {
    type: typeof UPDATE_ASSESSMENTGROUP_REQUEST,
    payload: any;
}
export interface updateSuccessType {
    type: typeof UPDATE_ASSESSMENTGROUP_SUCCESS;
    payload: any;
}
export interface updateFailureType {
    type: typeof UPDATE_ASSESSMENTGROUP_FALIURE;
    payload: string;
}


export type AuthActions =
    | getDataRequestType
    | getDataSuccessType
    | getDataFailureType
    | postDataRequestType
    | postDataSuccessType
    | postDataFailureType
    | deleteRequestType
    | deleteSuccessType
    | deleteFailureType
    | updateRequestType
    | updateSuccessType
    | updateFailureType