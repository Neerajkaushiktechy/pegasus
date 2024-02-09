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
import {
    getDataRequestType,
    getDataSuccessType,
    getDataFailureType,
    postDataRequestType,
    postDataSuccessType,
    postDataFailureType,
    deleteRequestType,
    deleteSuccessType,
    deleteFailureType,
    updateRequestType,
    updateSuccessType,
    updateFailureType
} from "./types";

// GET
export const getDataRequest = (payload: any): getDataRequestType => ({
    type: GET_ASSIGNMENT_REQUEST,
    payload
});

export const getDataSuccess = (payload: any): getDataSuccessType => ({
    type: GET_ASSIGNMENT_SUCCESS,
    payload
});

export const getDataFailure = (payload: string): getDataFailureType => ({
    type: GET_ASSIGNMENT_FALIURE,
    payload
})

// POST
export const postDataRequest = (payload: any): postDataRequestType => ({
    type: POST_ASSIGNMENT_REQUEST,
    payload
});

export const postDataSuccess = (payload: any): postDataSuccessType => {
    return {
        type: POST_ASSIGNMENT_SUCCESS,
        payload
    }
};

export const postDataFailure = (payload: string): postDataFailureType => ({
    type: POST_ASSIGNMENT_FALIURE,
    payload
})

// Delete 
export const deleteRequest = (payload: string): deleteRequestType => ({
    type: DELETE_ASSIGNMENT_REQUEST,
    payload
});

export const deleteSuccess = (payload: any): deleteSuccessType => ({
    type: DELETE_ASSIGNMENT_SUCCESS,
    payload
});

export const deleteFailure = (payload: string): deleteFailureType => ({
    type: DELETE_ASSIGNMENT_FALIURE,
    payload
})

// update Allergy
export const updateRequest = (payload: any): updateRequestType => ({
    type: UPDATE_ASSIGNMENT_REQUEST,
    payload
});

export const updateSuccess = (payload: any): updateSuccessType => ({
    type: UPDATE_ASSIGNMENT_SUCCESS,
    payload
});

export const updateFailure = (payload: string): updateFailureType => ({
    type: UPDATE_ASSIGNMENT_FALIURE,
    payload
})