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
import {
    FetchSuccessPayload,
    FetchFailurePayload,
    postNursesNotesSuccessPayload,
    postNursesNotesFailurePayload,
    FetchNursesNotesRequest,
    FetchNursesNotesSuccess,
    FetchNursesNotesFailure,
    postNursesNotesRequest,
    postNursesNotesSuccess,
    postNursesNotesFailure,
    deleteNursesNotesRequestType,
    deleteNursesNotesSuccessType,
    deleteNursesNotesFailureType,
    updateNursesNotesRequestType,
    updateNursesNotesSuccessType,
    updateNursesNotesFailureType
} from "./types";


export const fetchNursesNotesRequest = (payload: string): FetchNursesNotesRequest => ({
    type: FETCH_NURSESNOTES_REQUEST,
    payload
});

export const fetchNursesNotesSuccess = (payload: FetchSuccessPayload): FetchNursesNotesSuccess => ({
    type: FETCH_NURSESNOTES_SUCCESS,
    payload
});

export const fetchNursesNotesFailure = (payload: FetchFailurePayload): FetchNursesNotesFailure => ({
    type: FETCH_NURSESNOTES_FALIURE,
    payload
})

// Post Other Information 
export const postNursesNotesRequestAction = (payload: NursesNotesFormData): postNursesNotesRequest => ({
    type: POST_NURSESNOTES_REQUEST,
    payload
});

export const postNursesNotesSuccessAction = (payload: postNursesNotesSuccessPayload): postNursesNotesSuccess => {

    return {
        type: POST_NURSESNOTES_SUCCESS,
        payload
    }
};

export const postNursesNotesFailureAction = (payload: postNursesNotesFailurePayload): postNursesNotesFailure => ({
    type: POST_NURSESNOTES_FALIURE,
    payload
})


// Delete Other Information 
export const deleteNursesNotesRequest = (payload: string): deleteNursesNotesRequestType => ({
    type: DELETE_NURSESNOTES_REQUEST,
    payload
});

export const deleteNursesNotesSuccess = (payload: any): deleteNursesNotesSuccessType => ({
    type: DELETE_NURSESNOTES_SUCCESS,
    payload
});

export const deleteNursesNotesFailure = (payload: string): deleteNursesNotesFailureType => ({
    type: DELETE_NURSESNOTES_FALIURE,
    payload
})

// update Other Information 
export const updateNursesNotesRequest = (payload: object): updateNursesNotesRequestType => ({
    type: UPDATE_NURSESNOTES_REQUEST,
    payload
});

export const updateNursesNotesSuccess = (payload: any): updateNursesNotesSuccessType => ({
    type: UPDATE_NURSESNOTES_SUCCESS,
    payload
});

export const updateNursesNotesFailure = (payload: string): updateNursesNotesFailureType => ({
    type: UPDATE_NURSESNOTES_FALIURE,
    payload
})