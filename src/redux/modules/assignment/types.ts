
import {
    GET_ASSIGNMENT_REQUEST,
    GET_ASSIGNMENT_SUCCESS,
    GET_ASSIGNMENT_FALIURE,
    POST_ASSIGNMENT_REQUEST,
    POST_ASSIGNMENT_SUCCESS,
    POST_ASSIGNMENT_FALIURE,
    DELETE_ASSIGNMENT_REQUEST,
    DELETE_ASSIGNMENT_SUCCESS,
    DELETE_ASSIGNMENT_FALIURE,
    UPDATE_ASSIGNMENT_REQUEST,
    UPDATE_ASSIGNMENT_SUCCESS,
    UPDATE_ASSIGNMENT_FALIURE
} from "./actionTypes";


// GET 
export interface getDataRequestType {
    type: typeof GET_ASSIGNMENT_REQUEST;
    payload: any;
}
export interface getDataSuccessType {
    type: typeof GET_ASSIGNMENT_SUCCESS;
    payload: any;
}
export interface getDataFailureType {
    type: typeof GET_ASSIGNMENT_FALIURE;
    payload: string;
}

// POST   
export interface postDataRequestType {
    type: typeof POST_ASSIGNMENT_REQUEST;
    payload: any
}
export interface postDataSuccessType {
    type: typeof POST_ASSIGNMENT_SUCCESS;
    payload: any;
}
export interface postDataFailureType {
    type: typeof POST_ASSIGNMENT_FALIURE;
    payload: string;
}

// DELETE  History
export interface deleteRequestType {
    type: typeof DELETE_ASSIGNMENT_REQUEST,
    payload: string;
}
export interface deleteSuccessType {
    type: typeof DELETE_ASSIGNMENT_SUCCESS;
    payload: any;
}
export interface deleteFailureType {
    type: typeof DELETE_ASSIGNMENT_FALIURE;
    payload: string;
}

// UPDATE  History
export interface updateRequestType {
    type: typeof UPDATE_ASSIGNMENT_REQUEST,
    payload: any;
}
export interface updateSuccessType {
    type: typeof UPDATE_ASSIGNMENT_SUCCESS;
    payload: any;
}
export interface updateFailureType {
    type: typeof UPDATE_ASSIGNMENT_FALIURE;
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