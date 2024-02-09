import {
    GET_SOCIAL_REQUEST,
    GET_SOCIAL_SUCCESS,
    GET_SOCIAL_FALIURE,
    POST_SOCIAL_REQUEST,
    POST_SOCIAL_SUCCESS,
    POST_SOCIAL_FALIURE,
    DELETE_SOCIAL_REQUEST,
    DELETE_SOCIAL_SUCCESS,
    DELETE_SOCIAL_FALIURE,
    UPDATE_SOCIAL_REQUEST,
    UPDATE_SOCIAL_SUCCESS,
    UPDATE_SOCIAL_FALIURE
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
export const getDataRequest = (payload: string): getDataRequestType => ({
    type: GET_SOCIAL_REQUEST,
    payload
});

export const getDataSuccess = (payload: any): getDataSuccessType => ({
    type: GET_SOCIAL_SUCCESS,
    payload
});

export const getDataFailure = (payload: string): getDataFailureType => ({
    type: GET_SOCIAL_FALIURE,
    payload
})

// POST
export const postDataRequest = (payload: any): postDataRequestType => ({
    type: POST_SOCIAL_REQUEST,
    payload
});

export const postDataSuccess = (payload: any): postDataSuccessType => {
    return {
        type: POST_SOCIAL_SUCCESS,
        payload
    }
};

export const postDataFailure = (payload: string): postDataFailureType => ({
    type: POST_SOCIAL_FALIURE,
    payload
})

// Delete 
export const deleteRequest = (payload: string): deleteRequestType => ({
    type: DELETE_SOCIAL_REQUEST,
    payload
});

export const deleteSuccess = (payload: any): deleteSuccessType => ({
    type: DELETE_SOCIAL_SUCCESS,
    payload
});

export const deleteFailure = (payload: string): deleteFailureType => ({
    type: DELETE_SOCIAL_FALIURE,
    payload
})

// update Allergy
export const updateRequest = (payload: any): updateRequestType => ({
    type: UPDATE_SOCIAL_REQUEST,
    payload
});

export const updateSuccess = (payload: any): updateSuccessType => ({
    type: UPDATE_SOCIAL_SUCCESS,
    payload
});

export const updateFailure = (payload: string): updateFailureType => ({
    type: UPDATE_SOCIAL_FALIURE,
    payload
})