import { familyFormData } from "../../../../pages/Patient/FamilyHistory/components/FamilyHistoryForm";


import {
    GET_FAMILY_REQUEST,
    GET_FAMILY_SUCCESS,
    GET_FAMILY_FALIURE,
    POST_FAMILY_REQUEST,
    POST_FAMILY_SUCCESS,
    POST_FAMILY_FALIURE,
    DELETE_FAMILY_REQUEST,
    DELETE_FAMILY_SUCCESS,
    DELETE_FAMILY_FALIURE,
    UPDATE_FAMILY_REQUEST,
    UPDATE_FAMILY_SUCCESS,
    UPDATE_FAMILY_FALIURE,
    GET_FAMILY_HISTORY_TYPE_REQUEST,
    GET_FAMILY_HISTORY_TYPE_SUCCESS,
    GET_FAMILY_HISTORY_TYPE_FALIURE
} from "./actionTypes";
import {

    FetchFamilyDataRequest,
    FetchFamilyDataSuccess,
    FetchFamilyDataFailure,
    postFamilyDataRequest,
    postFamilyDataSuccess,
    postFamilyDataFailure,
    deleteFamilyRequestType,
    deleteFamilySuccessType,
    deleteFamilyFailureType,
    updateFamilyRequestType,
    updateFamilySuccessType,
    updateFamilyFailureType,
    FetchFamilyHistoryTypeDataRequest,
    FetchFamilyHistoryTypDataSuccess,
    FetchFamilyHistoryTypDataFailure
} from "./types";

// GET
export const fetchFamilyDataRequest = (payload: string): FetchFamilyDataRequest => ({
    type: GET_FAMILY_REQUEST,
    payload
});

export const fetchFamilyDataSuccess = (payload: any): FetchFamilyDataSuccess => ({
    type: GET_FAMILY_SUCCESS,
    payload
});

export const fetchFamilyDataFailure = (payload: string): FetchFamilyDataFailure => ({
    type: GET_FAMILY_FALIURE,
    payload
})

// POST
export const postFamilyDataRequestAction = (payload: familyFormData): postFamilyDataRequest => ({
    type: POST_FAMILY_REQUEST,
    payload
});

export const postFamilyDataSuccessAction = (payload: any): postFamilyDataSuccess => {
    return {
        type: POST_FAMILY_SUCCESS,
        payload
    }
};

export const postFamilyDataFailureAction = (payload: string): postFamilyDataFailure => ({
    type: POST_FAMILY_FALIURE,
    payload
})

// Delete 
export const deleteFamilyRequest = (payload: string): deleteFamilyRequestType => ({
    type: DELETE_FAMILY_REQUEST,
    payload
});

export const deleteFamilySuccess = (payload: any): deleteFamilySuccessType => ({
    type: DELETE_FAMILY_SUCCESS,
    payload
});

export const deleteFamilyFailure = (payload: string): deleteFamilyFailureType => ({
    type: DELETE_FAMILY_FALIURE,
    payload
})

// update Allergy
export const updateFamilyRequest = (payload: familyFormData): updateFamilyRequestType => ({
    type: UPDATE_FAMILY_REQUEST,
    payload
});

export const updateFamilySuccess = (payload: any): updateFamilySuccessType => ({
    type: UPDATE_FAMILY_SUCCESS,
    payload
});

export const updateFamilyFailure = (payload: string): updateFamilyFailureType => ({
    type: UPDATE_FAMILY_FALIURE,
    payload
})

// Get family history Type 
export const fetchfamilyHistoryTypeDataRequest = () : FetchFamilyHistoryTypeDataRequest => ({
    type: GET_FAMILY_HISTORY_TYPE_REQUEST,
});
export const fetchfamilyHistoryTypeDataSuccess = (payload: any ) : FetchFamilyHistoryTypDataSuccess => ({
    type: GET_FAMILY_HISTORY_TYPE_SUCCESS,
    payload
});
export const fetchfamilyHistoryTypeDataFailure = (payload: any) : FetchFamilyHistoryTypDataFailure  => ({
    type: GET_FAMILY_HISTORY_TYPE_FALIURE,
    payload
    
})