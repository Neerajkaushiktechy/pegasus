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
import {
    FetchSuccessPayload,
    FetchFailurePayload,
    postTherapySuccessPayload,
    postTherapyFailurePayload,
    FetchTherapyRequest,
    FetchTherapySuccess,
    FetchTherapyFailure,
    postTherapyRequest,
    postTherapySuccess,
    postTherapyFailure,
    deleteTherapyRequestType,
    deleteTherapySuccessType,
    deleteTherapyFailureType,
    updateTherapyRequestType,
    updateTherapySuccessType,
    updateTherapyFailureType
} from "./types";


export const fetchTherapyRequest = (payload: string): FetchTherapyRequest => ({
    type: FETCH_THERAPY_REQUEST,
    payload
});

export const fetchTherapySuccess = (payload: FetchSuccessPayload): FetchTherapySuccess => ({
    type: FETCH_THERAPY_SUCCESS,
    payload
});

export const fetchTherapyFailure = (payload: FetchFailurePayload): FetchTherapyFailure => ({
    type: FETCH_THERAPY_FALIURE,
    payload
})

// Post Other Information 
export const postTherapyRequestAction = (payload: TherapyFormData): postTherapyRequest => ({
    type: POST_THERAPY_REQUEST,
    payload
});

export const postTherapySuccessAction = (payload: postTherapySuccessPayload): postTherapySuccess => {

    return {
        type: POST_THERAPY_SUCCESS,
        payload
    }
};

export const postTherapyFailureAction = (payload: postTherapyFailurePayload): postTherapyFailure => ({
    type: POST_THERAPY_FALIURE,
    payload
})


// Delete Other Information 
export const deleteTherapyRequest = (payload: string): deleteTherapyRequestType => ({
    type: DELETE_THERAPY_REQUEST,
    payload
});

export const deleteTherapySuccess = (payload: any): deleteTherapySuccessType => ({
    type: DELETE_THERAPY_SUCCESS,
    payload
});

export const deleteTherapyFailure = (payload: string): deleteTherapyFailureType => ({
    type: DELETE_THERAPY_FALIURE,
    payload
})

// update Other Information 
export const updateTherapyRequest = (payload: object): updateTherapyRequestType => ({
    type: UPDATE_THERAPY_REQUEST,
    payload
});

export const updateTherapySuccess = (payload: any): updateTherapySuccessType => ({
    type: UPDATE_THERAPY_SUCCESS,
    payload
});

export const updateTherapyFailure = (payload: string): updateTherapyFailureType => ({
    type: UPDATE_THERAPY_FALIURE,
    payload
})