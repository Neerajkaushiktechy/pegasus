import { NursingCarePlanFormData } from "../../../../pages/Patient/Others/NursingCarePlan/components/NursingCareForm";

import {
    FETCH_NURSINGCAREPLAN_REQUEST,
    FETCH_NURSINGCAREPLAN_SUCCESS,
    FETCH_NURSINGCAREPLAN_FALIURE,
    POST_NURSINGCAREPLAN_REQUEST,
    POST_NURSINGCAREPLAN_SUCCESS,
    POST_NURSINGCAREPLAN_FALIURE,
    DELETE_NURSINGCAREPLAN_REQUEST,
    DELETE_NURSINGCAREPLAN_SUCCESS,
    DELETE_NURSINGCAREPLAN_FALIURE,
    UPDATE_NURSINGCAREPLAN_REQUEST,
    UPDATE_NURSINGCAREPLAN_SUCCESS,
    UPDATE_NURSINGCAREPLAN_FALIURE
} from "./actionTypes";
import {
    FetchSuccessPayload,
    FetchFailurePayload,
    postNursingCarePlanSuccessPayload,
    postNursingCarePlanFailurePayload,
    FetchNursingCarePlanRequest,
    FetchNursingCarePlanSuccess,
    FetchNursingCarePlanFailure,
    postNursingCarePlanRequest,
    postNursingCarePlanSuccess,
    postNursingCarePlanFailure,
    deleteNursingCarePlanRequestType,
    deleteNursingCarePlanSuccessType,
    deleteNursingCarePlanFailureType,
    updateNursingCarePlanRequestType,
    updateNursingCarePlanSuccessType,
    updateNursingCarePlanFailureType
} from "./types";


export const fetchNursingCarePlanRequest = (payload: string): FetchNursingCarePlanRequest => ({
    type: FETCH_NURSINGCAREPLAN_REQUEST,
    payload
});

export const fetchNursingCarePlanSuccess = (payload: FetchSuccessPayload): FetchNursingCarePlanSuccess => ({
    type: FETCH_NURSINGCAREPLAN_SUCCESS,
    payload
});

export const fetchNursingCarePlanFailure = (payload: FetchFailurePayload): FetchNursingCarePlanFailure => ({
    type: FETCH_NURSINGCAREPLAN_FALIURE,
    payload
})

// Post Other Information 
export const postNursingCarePlanRequestAction = (payload: NursingCarePlanFormData): postNursingCarePlanRequest => ({
    type: POST_NURSINGCAREPLAN_REQUEST,
    payload
});

export const postNursingCarePlanSuccessAction = (payload: postNursingCarePlanSuccessPayload): postNursingCarePlanSuccess => {

    return {
        type: POST_NURSINGCAREPLAN_SUCCESS,
        payload
    }
};

export const postNursingCarePlanFailureAction = (payload: postNursingCarePlanFailurePayload): postNursingCarePlanFailure => ({
    type: POST_NURSINGCAREPLAN_FALIURE,
    payload
})


// Delete Other Information 
export const deleteNursingCarePlanRequest = (payload: string): deleteNursingCarePlanRequestType => ({
    type: DELETE_NURSINGCAREPLAN_REQUEST,
    payload
});

export const deleteNursingCarePlanSuccess = (payload: any): deleteNursingCarePlanSuccessType => ({
    type: DELETE_NURSINGCAREPLAN_SUCCESS,
    payload
});

export const deleteNursingCarePlanFailure = (payload: string): deleteNursingCarePlanFailureType => ({
    type: DELETE_NURSINGCAREPLAN_FALIURE,
    payload
})

// update Other Information 
export const updateNursingCarePlanRequest = (payload: object): updateNursingCarePlanRequestType => ({
    type: UPDATE_NURSINGCAREPLAN_REQUEST,
    payload
});

export const updateNursingCarePlanSuccess = (payload: any): updateNursingCarePlanSuccessType => ({
    type: UPDATE_NURSINGCAREPLAN_SUCCESS,
    payload
});

export const updateNursingCarePlanFailure = (payload: string): updateNursingCarePlanFailureType => ({
    type: UPDATE_NURSINGCAREPLAN_FALIURE,
    payload
})