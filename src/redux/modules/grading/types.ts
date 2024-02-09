
import {
    GET_GRADING_REQUEST,
    GET_GRADING_SUCCESS,
    GET_GRADING_FALIURE,
    POST_GRADING_REQUEST,
    POST_GRADING_SUCCESS,
    POST_GRADING_FALIURE,
    DELETE_GRADING_REQUEST,
    DELETE_GRADING_SUCCESS,
    DELETE_GRADING_FALIURE,
    UPDATE_GRADING_REQUEST,
    UPDATE_GRADING_SUCCESS,
    UPDATE_GRADING_FALIURE,
    GET_FORM_DATA_REQUEST,
    GET_FORM_DATA_SUCCESS,
    GET_FORM_DATA_FALIURE
} from "./actionTypes";



export interface getFormDataRequestType {
    type: typeof GET_FORM_DATA_REQUEST;
    payload: any;
}
export interface getFormDataSuccessType {
    type: typeof GET_FORM_DATA_SUCCESS;
    payload: any;
}
export interface getFormDataFailureType {
    type: typeof GET_FORM_DATA_FALIURE;
    payload: any;
}

// GET 
export interface getDataRequestType {
    type: typeof GET_GRADING_REQUEST;
    payload: any;

}
export interface getDataSuccessType {
    type: typeof GET_GRADING_SUCCESS;
    payload: any;
}
export interface getDataFailureType {
    type: typeof GET_GRADING_FALIURE;
    payload: string;
}

// POST  History 
export interface postDataRequestType {
    type: typeof POST_GRADING_REQUEST;
    payload: any
}
export interface postDataSuccessType {
    type: typeof POST_GRADING_SUCCESS;
    payload: any;
}
export interface postDataFailureType {
    type: typeof POST_GRADING_FALIURE;
    payload: any;
}

// DELETE  History
export interface deleteRequestType {
    type: typeof DELETE_GRADING_REQUEST,
    payload: any;
}
export interface deleteSuccessType {
    type: typeof DELETE_GRADING_SUCCESS;
    payload: any;
}
export interface deleteFailureType {
    type: typeof DELETE_GRADING_FALIURE;
    payload: any;
}

// UPDATE  History
export interface updateRequestType {
    type: typeof UPDATE_GRADING_REQUEST,
    payload: any;
}
export interface updateSuccessType {
    type: typeof UPDATE_GRADING_SUCCESS;
    payload: any;
}
export interface updateFailureType {
    type: typeof UPDATE_GRADING_FALIURE;
    payload: any;
}


export type AuthActions =
    | getFormDataRequestType
    | getFormDataSuccessType
    | getFormDataFailureType
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