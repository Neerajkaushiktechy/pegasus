import {
    GET_ASSESSMENTGROUP_REQUEST,
    GET_ASSESSMENTGROUP_SUCCESS,
    GET_ASSESSMENTGROUP_FALIURE,
    POST_ASSESSMENTGROUP_REQUEST,
    POST_ASSESSMENTGROUP_SUCCESS,
    POST_ASSESSMENTGROUP_FALIURE,
    DELETE_ASSESSMENTGROUP_REQUEST,
    DELETE_ASSESSMENTGROUP_SUCCESS,
    DELETE_ASSESSMENTGROUP_FALIURE,
    UPDATE_ASSESSMENTGROUP_REQUEST,
    UPDATE_ASSESSMENTGROUP_SUCCESS,
    UPDATE_ASSESSMENTGROUP_FALIURE
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
export const getDataRequest = (): getDataRequestType => ({
    type: GET_ASSESSMENTGROUP_REQUEST,
});

export const getDataSuccess = (payload: any): getDataSuccessType => ({
    type: GET_ASSESSMENTGROUP_SUCCESS,
    payload
});

export const getDataFailure = (payload: string): getDataFailureType => ({
    type: GET_ASSESSMENTGROUP_FALIURE,
    payload
})

// POST
export const postDataRequest = (payload: any): postDataRequestType => ({
    type: POST_ASSESSMENTGROUP_REQUEST,
    payload
});

export const postDataSuccess = (payload: any): postDataSuccessType => {
    return {
        type: POST_ASSESSMENTGROUP_SUCCESS,
        payload
    }
};

export const postDataFailure = (payload: string): postDataFailureType => ({
    type: POST_ASSESSMENTGROUP_FALIURE,
    payload
})

// Delete 
export const deleteRequest = (payload: string): deleteRequestType => ({
    type: DELETE_ASSESSMENTGROUP_REQUEST,
    payload
});

export const deleteSuccess = (payload: any): deleteSuccessType => ({
    type: DELETE_ASSESSMENTGROUP_SUCCESS,
    payload
});

export const deleteFailure = (payload: string): deleteFailureType => ({
    type: DELETE_ASSESSMENTGROUP_FALIURE,
    payload
})

// update Allergy
export const updateRequest = (payload: any): updateRequestType => ({
    type: UPDATE_ASSESSMENTGROUP_REQUEST,
    payload
});

export const updateSuccess = (payload: any): updateSuccessType => ({
    type: UPDATE_ASSESSMENTGROUP_SUCCESS,
    payload
});

export const updateFailure = (payload: string): updateFailureType => ({
    type: UPDATE_ASSESSMENTGROUP_FALIURE,
    payload
})