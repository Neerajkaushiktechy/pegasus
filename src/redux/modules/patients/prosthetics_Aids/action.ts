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
import {
    FetchSuccessPayload,
    FetchFailurePayload,
    postProsthetics_AidsSuccessPayload,
    postProsthetics_AidsFailurePayload,
    FetchProsthetics_AidsRequest,
    FetchProsthetics_AidsSuccess,
    FetchProsthetics_AidsFailure,
    postProsthetics_AidsRequest,
    postProsthetics_AidsSuccess,
    postProsthetics_AidsFailure,
    deleteProsthetics_AidsRequestType,
    deleteProsthetics_AidsSuccessType,
    deleteProsthetics_AidsFailureType,
    updateProsthetics_AidsRequestType,
    updateProsthetics_AidsSuccessType,
    updateProsthetics_AidsFailureType
} from "./types";


export const fetchProsthetics_AidsRequest = (payload: string): FetchProsthetics_AidsRequest => ({
    type: FETCH_PROSTHETICSAIDS_REQUEST,
    payload
});

export const fetchProsthetics_AidsSuccess = (payload: FetchSuccessPayload): FetchProsthetics_AidsSuccess => ({
    type: FETCH_PROSTHETICSAIDS_SUCCESS,
    payload
});

export const fetchProsthetics_AidsFailure = (payload: FetchFailurePayload): FetchProsthetics_AidsFailure => ({
    type: FETCH_PROSTHETICSAIDS_FALIURE,
    payload
})

// Post Other Information 
export const postProsthetics_AidsRequestAction = (payload: Prosthetics_AidsFormData): postProsthetics_AidsRequest => ({
    type: POST_PROSTHETICSAIDS_REQUEST,
    payload
});

export const postProsthetics_AidsSuccessAction = (payload: postProsthetics_AidsSuccessPayload): postProsthetics_AidsSuccess => {

    return {
        type: POST_PROSTHETICSAIDS_SUCCESS,
        payload
    }
};

export const postProsthetics_AidsFailureAction = (payload: postProsthetics_AidsFailurePayload): postProsthetics_AidsFailure => ({
    type: POST_PROSTHETICSAIDS_FALIURE,
    payload
})


// Delete Other Information 
export const deleteProsthetics_AidsRequest = (payload: string): deleteProsthetics_AidsRequestType => ({
    type: DELETE_PROSTHETICSAIDS_REQUEST,
    payload
});

export const deleteProsthetics_AidsSuccess = (payload: any): deleteProsthetics_AidsSuccessType => ({
    type: DELETE_PROSTHETICSAIDS_SUCCESS,
    payload
});

export const deleteProsthetics_AidsFailure = (payload: string): deleteProsthetics_AidsFailureType => ({
    type: DELETE_PROSTHETICSAIDS_FALIURE,
    payload
})

// update Other Information 
export const updateProsthetics_AidsRequest = (payload: object): updateProsthetics_AidsRequestType => ({
    type: UPDATE_PROSTHETICSAIDS_REQUEST,
    payload
});

export const updateProsthetics_AidsSuccess = (payload: any): updateProsthetics_AidsSuccessType => ({
    type: UPDATE_PROSTHETICSAIDS_SUCCESS,
    payload
});

export const updateProsthetics_AidsFailure = (payload: string): updateProsthetics_AidsFailureType => ({
    type: UPDATE_PROSTHETICSAIDS_FALIURE,
    payload
})