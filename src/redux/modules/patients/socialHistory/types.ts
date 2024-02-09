
import {
    GET_SOCIAL_REQUEST,
    GET_SOCIAL_SUCCESS,
    GET_SOCIAL_FALIURE,
    POST_SOCIAL_REQUEST,
    POST_SOCIAL_SUCCESS,
    POST_SOCIAL_FALIURE,
    DELETE_SOCIAL_REQUEST,
    DELETE_SOCIAL_SUCCESS,
    DELETE_SOCIAL_FALIURE,
    UPDATE_SOCIAL_REQUEST,
    UPDATE_SOCIAL_SUCCESS,
    UPDATE_SOCIAL_FALIURE
} from "./actionTypes";


// GET Viatl History
export interface getDataRequestType {
    type: typeof GET_SOCIAL_REQUEST;
    payload: string;
}
export interface getDataSuccessType {
    type: typeof GET_SOCIAL_SUCCESS;
    payload: any;
}
export interface getDataFailureType {
    type: typeof GET_SOCIAL_FALIURE;
    payload: string;
}

// POST  History 
export interface postDataRequestType {
    type: typeof POST_SOCIAL_REQUEST;
    payload: any
}
export interface postDataSuccessType {
    type: typeof POST_SOCIAL_SUCCESS;
    payload: any;
}
export interface postDataFailureType {
    type: typeof POST_SOCIAL_FALIURE;
    payload: string;
}

// DELETE  History
export interface deleteRequestType {
    type: typeof DELETE_SOCIAL_REQUEST,
    payload: string;
}
export interface deleteSuccessType {
    type: typeof DELETE_SOCIAL_SUCCESS;
    payload: any;
}
export interface deleteFailureType {
    type: typeof DELETE_SOCIAL_FALIURE;
    payload: string;
}

// UPDATE  History
export interface updateRequestType {
    type: typeof UPDATE_SOCIAL_REQUEST,
    payload: any;
}
export interface updateSuccessType {
    type: typeof UPDATE_SOCIAL_SUCCESS;
    payload: any;
}
export interface updateFailureType {
    type: typeof UPDATE_SOCIAL_FALIURE;
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