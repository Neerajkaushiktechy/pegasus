import {
    GET_GRADING_REQUEST,
    GET_GRADING_SUCCESS,
    GET_GRADING_FALIURE,
    POST_GRADING_REQUEST,
    POST_GRADING_SUCCESS,
    POST_GRADING_FALIURE,
    DELETE_GRADING_REQUEST,
    DELETE_GRADING_SUCCESS,
    DELETE_GRADING_FALIURE,
    UPDATE_GRADING_REQUEST,
    UPDATE_GRADING_SUCCESS,
    UPDATE_GRADING_FALIURE,
    GET_FORM_DATA_REQUEST,
    GET_FORM_DATA_SUCCESS,
    GET_FORM_DATA_FALIURE
} from "./actionTypes";
import {
    getFormDataRequestType,
    getFormDataSuccessType,
    getFormDataFailureType,
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
export const getFormDataRequest = (payload:any): getFormDataRequestType => ({
    type: GET_FORM_DATA_REQUEST,
    payload
});

export const getFormDataSuccess = (payload: any): getFormDataSuccessType => ({
    type: GET_FORM_DATA_SUCCESS,
    payload
});

export const getFormDataFailure = (payload: string): getFormDataFailureType => ({
    type: GET_FORM_DATA_FALIURE,
    payload
})

// GET
export const getDataRequest = (payload:any): getDataRequestType => ({
    type: GET_GRADING_REQUEST,
    payload
});

export const getDataSuccess = (payload: any): getDataSuccessType => ({
    type: GET_GRADING_SUCCESS,
    payload
});

export const getDataFailure = (payload: string): getDataFailureType => ({
    type: GET_GRADING_FALIURE,
    payload
})

// POST
export const postDataRequest = (payload: any): postDataRequestType => ({
    type: POST_GRADING_REQUEST,
    payload
});

export const postDataSuccess = (payload: any): postDataSuccessType => {
    return {
        type: POST_GRADING_SUCCESS,
        payload
    }
};

export const postDataFailure = (payload: string): postDataFailureType => ({
    type: POST_GRADING_FALIURE,
    payload
})

// Delete 
export const deleteRequest = (payload: string): deleteRequestType => ({
    type: DELETE_GRADING_REQUEST,
    payload
});

export const deleteSuccess = (payload: any): deleteSuccessType => ({
    type: DELETE_GRADING_SUCCESS,
    payload
});

export const deleteFailure = (payload: string): deleteFailureType => ({
    type: DELETE_GRADING_FALIURE,
    payload
})

// update Allergy
export const updateRequest = (payload: any): updateRequestType => ({
    type: UPDATE_GRADING_REQUEST,
    payload
});

export const updateSuccess = (payload: any): updateSuccessType => ({
    type: UPDATE_GRADING_SUCCESS,
    payload
});

export const updateFailure = (payload: string): updateFailureType => ({
    type: UPDATE_GRADING_FALIURE,
    payload
})