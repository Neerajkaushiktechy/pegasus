import { DoctorsOrdersFormData } from "../../../../pages/Patient/Others/DoctorsOrders/components/DoctorsOrdersForm";

import {
    FETCH_DOCTORORDER_REQUEST,
    FETCH_DOCTORORDER_SUCCESS,
    FETCH_DOCTORORDER_FALIURE,
    POST_DOCTORORDER_REQUEST,
    POST_DOCTORORDER_SUCCESS,
    POST_DOCTORORDER_FALIURE,
    DELETE_DOCTORORDER_REQUEST,
    DELETE_DOCTORORDER_SUCCESS,
    DELETE_DOCTORORDER_FALIURE,
    UPDATE_DOCTORORDER_REQUEST,
    UPDATE_DOCTORORDER_SUCCESS,
    UPDATE_DOCTORORDER_FALIURE
} from "./actionTypes";
import {
    FetchSuccessPayload,
    FetchFailurePayload,
    postDoctorsOrdersSuccessPayload,
    postDoctorsOrdersFailurePayload,
    FetchDoctorsOrdersRequest,
    FetchDoctorsOrdersSuccess,
    FetchDoctorsOrdersFailure,
    postDoctorsOrdersRequest,
    postDoctorsOrdersSuccess,
    postDoctorsOrdersFailure,
    deleteDoctorsOrdersRequestType,
    deleteDoctorsOrdersSuccessType,
    deleteDoctorsOrdersFailureType,
    updateDoctorsOrdersRequestType,
    updateDoctorsOrdersSuccessType,
    updateDoctorsOrdersFailureType
} from "./types";


export const fetchDoctorsOrdersRequest = (payload: string): FetchDoctorsOrdersRequest => ({
    type: FETCH_DOCTORORDER_REQUEST,
    payload
});

export const fetchDoctorsOrdersSuccess = (payload: FetchSuccessPayload): FetchDoctorsOrdersSuccess => ({
    type: FETCH_DOCTORORDER_SUCCESS,
    payload
});

export const fetchDoctorsOrdersFailure = (payload: FetchFailurePayload): FetchDoctorsOrdersFailure => ({
    type: FETCH_DOCTORORDER_FALIURE,
    payload
})

// Post Other Information 
export const postDoctorsOrdersRequestAction = (payload: DoctorsOrdersFormData): postDoctorsOrdersRequest => ({
    type: POST_DOCTORORDER_REQUEST,
    payload
});

export const postDoctorsOrdersSuccessAction = (payload: postDoctorsOrdersSuccessPayload): postDoctorsOrdersSuccess => {

    return {
        type: POST_DOCTORORDER_SUCCESS,
        payload
    }
};

export const postDoctorsOrdersFailureAction = (payload: postDoctorsOrdersFailurePayload): postDoctorsOrdersFailure => ({
    type: POST_DOCTORORDER_FALIURE,
    payload
})


// Delete Other Information 
export const deleteDoctorsOrdersRequest = (payload: string): deleteDoctorsOrdersRequestType => ({
    type: DELETE_DOCTORORDER_REQUEST,
    payload
});

export const deleteDoctorsOrdersSuccess = (payload: any): deleteDoctorsOrdersSuccessType => ({
    type: DELETE_DOCTORORDER_SUCCESS,
    payload
});

export const deleteDoctorsOrdersFailure = (payload: string): deleteDoctorsOrdersFailureType => ({
    type: DELETE_DOCTORORDER_FALIURE,
    payload
})

// update Other Information 
export const updateDoctorsOrdersRequest = (payload: object): updateDoctorsOrdersRequestType => ({
    type: UPDATE_DOCTORORDER_REQUEST,
    payload
});

export const updateDoctorsOrdersSuccess = (payload: any): updateDoctorsOrdersSuccessType => ({
    type: UPDATE_DOCTORORDER_SUCCESS,
    payload
});

export const updateDoctorsOrdersFailure = (payload: string): updateDoctorsOrdersFailureType => ({
    type: UPDATE_DOCTORORDER_FALIURE,
    payload
})