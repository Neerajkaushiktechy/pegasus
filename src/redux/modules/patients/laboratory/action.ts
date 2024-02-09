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
import {
    FetchSuccessPayload,
    FetchFailurePayload,
    postLaboratorySuccessPayload,
    postLaboratoryFailurePayload,
    FetchLaboratoryRequest,
    FetchLaboratorySuccess,
    FetchLaboratoryFailure,
    postLaboratoryRequest,
    postLaboratorySuccess,
    postLaboratoryFailure,
    deleteLaboratoryRequestType,
    deleteLaboratorySuccessType,
    deleteLaboratoryFailureType,
    updateLaboratoryRequestType,
    updateLaboratorySuccessType,
    updateLaboratoryFailureType
} from "./types";


export const fetchLaboratoryRequest = (payload: string): FetchLaboratoryRequest => ({
    type: FETCH_LABORATORY_REQUEST,
    payload
});

export const fetchLaboratorySuccess = (payload: FetchSuccessPayload): FetchLaboratorySuccess => ({
    type: FETCH_LABORATORY_SUCCESS,
    payload
});

export const fetchLaboratoryFailure = (payload: FetchFailurePayload): FetchLaboratoryFailure => ({
    type: FETCH_LABORATORY_FALIURE,
    payload
})

// Post Other Information 
export const postLaboratoryRequestAction = (payload: LaboratoryFormData): postLaboratoryRequest => ({
    type: POST_LABORATORY_REQUEST,
    payload
});

export const postLaboratorySuccessAction = (payload: postLaboratorySuccessPayload): postLaboratorySuccess => {

    return {
        type: POST_LABORATORY_SUCCESS,
        payload
    }
};

export const postLaboratoryFailureAction = (payload: postLaboratoryFailurePayload): postLaboratoryFailure => ({
    type: POST_LABORATORY_FALIURE,
    payload
})


// Delete Other Information 
export const deleteLaboratoryRequest = (payload: string): deleteLaboratoryRequestType => ({
    type: DELETE_LABORATORY_REQUEST,
    payload
});

export const deleteLaboratorySuccess = (payload: any): deleteLaboratorySuccessType => ({
    type: DELETE_LABORATORY_SUCCESS,
    payload
});

export const deleteLaboratoryFailure = (payload: string): deleteLaboratoryFailureType => ({
    type: DELETE_LABORATORY_FALIURE,
    payload
})

// update Other Information 
export const updateLaboratoryRequest = (payload: object): updateLaboratoryRequestType => ({
    type: UPDATE_LABORATORY_REQUEST,
    payload
});

export const updateLaboratorySuccess = (payload: any): updateLaboratorySuccessType => ({
    type: UPDATE_LABORATORY_SUCCESS,
    payload
});

export const updateLaboratoryFailure = (payload: string): updateLaboratoryFailureType => ({
    type: UPDATE_LABORATORY_FALIURE,
    payload
})