
import { NursesNotesFormData } from "../../../../pages/Patient/Others/NursesNotes/components/NursesNotesForm";
import {
    FETCH_NURSESNOTES_REQUEST,
    FETCH_NURSESNOTES_SUCCESS,
    FETCH_NURSESNOTES_FALIURE,
    POST_NURSESNOTES_REQUEST,
    POST_NURSESNOTES_SUCCESS,
    POST_NURSESNOTES_FALIURE,
    DELETE_NURSESNOTES_REQUEST,
    DELETE_NURSESNOTES_SUCCESS,
    DELETE_NURSESNOTES_FALIURE,
    UPDATE_NURSESNOTES_REQUEST,
    UPDATE_NURSESNOTES_SUCCESS,
    UPDATE_NURSESNOTES_FALIURE
} from "./actionTypes";



export interface FetchSuccessPayload {
    data: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchNursesNotesRequest {
    type: typeof FETCH_NURSESNOTES_REQUEST;
    payload: string;

}
export interface FetchNursesNotesSuccess {
    type: typeof FETCH_NURSESNOTES_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchNursesNotesFailure {
    type: typeof FETCH_NURSESNOTES_FALIURE;
    payload: FetchFailurePayload;
}
// POST Other Information 

export interface postNursesNotesSuccessRequest {
    data: any;
}
export interface postNursesNotesSuccessPayload {
    data: any;
}
export interface postNursesNotesFailurePayload {
    error: string;
}

export interface postNursesNotesRequest {
    type: typeof POST_NURSESNOTES_REQUEST;
    payload: NursesNotesFormData
}
export interface postNursesNotesSuccess {
    type: typeof POST_NURSESNOTES_SUCCESS;
    payload: postNursesNotesSuccessPayload;
}
export interface postNursesNotesFailure {
    type: typeof POST_NURSESNOTES_FALIURE;
    payload: postNursesNotesFailurePayload;
}


// Delete Other Information 
export interface deleteNursesNotesRequestType {
    type: typeof DELETE_NURSESNOTES_REQUEST,
    payload: string;

}
export interface deleteNursesNotesSuccessType {
    type: typeof DELETE_NURSESNOTES_SUCCESS;
    payload: any;
}
export interface deleteNursesNotesFailureType {
    type: typeof DELETE_NURSESNOTES_FALIURE;
    payload: string;
}

// Update Other Information 

export interface updateNursesNotesRequestType {
    type: typeof UPDATE_NURSESNOTES_REQUEST,
    payload: object;

}
export interface updateNursesNotesSuccessType {
    type: typeof UPDATE_NURSESNOTES_SUCCESS;
    payload: any;
}
export interface updateNursesNotesFailureType {
    type: typeof UPDATE_NURSESNOTES_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchNursesNotesRequest
    | FetchNursesNotesSuccess
    | FetchNursesNotesFailure
    | postNursesNotesRequest
    | postNursesNotesSuccess
    | postNursesNotesFailure
    | deleteNursesNotesRequestType
    | deleteNursesNotesSuccessType
    | deleteNursesNotesFailureType
    | updateNursesNotesRequestType
    | updateNursesNotesSuccessType
    | updateNursesNotesFailureType