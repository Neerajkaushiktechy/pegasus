import { AllergiesFormData } from "../../../../pages/Patient/Allergies/components/AllergiesForm";

import {
    FETCH_ALLERGY_REQUEST,
    FETCH_ALLERGY_SUCCESS,
    FETCH_ALLERGY_FALIURE,
    POST_ALLERGY_REQUEST,
    POST_ALLERGY_SUCCESS,
    POST_ALLERGY_FALIURE,
    GET_ALLERGY_REACTION_REQUEST,
    GET_ALLERGY_REACTION_SUCCESS,
    GET_ALLERGY_REACTION_FALIURE,
    GET_ALLERGY_SEVERTIES_REQUEST,
    GET_ALLERGY_SEVERTIES_SUCCESS,
    GET_ALLERGY_SEVERTIES_FALIURE,
    DELETE_ALLERGY_REQUEST,
    DELETE_ALLERGY_SUCCESS,
    DELETE_ALLERGY_FALIURE,
    UPDATE_ALLERGY_REQUEST,
    UPDATE_ALLERGY_SUCCESS,
    UPDATE_ALLERGY_FALIURE
} from "./actionTypes";
import {
    FetchSuccessPayload,
    FetchFailurePayload,
    FetchAllergyDataRequest,
    FetchAllergyDataSuccess,
    FetchAllergyDataFailure,
    postAllergySuccessPayload,
    postAllergyFailurePayload,
    postAllergyDataRequest,
    postAllergyDataSuccess,
    postAllergyDataFailure,
    getAllergyReactionSuccessPayload,
    getAllergyReactionFailurePayload,
    getAllergyReactionRequestType,
    getAllergyReactionSuccessType,
    getAllergyReactionFailureType,
    getAllergySevertiesSuccessPayload,
    getAllergySevertiesFailurePayload,
    getAllergySevertiesRequestType,
    getAllergySevertiesSuccessType,
    getAllergySevertiesFailureType,
    deleteAllergyRequestType,
    deleteAllergySuccessType,
    deleteAllergyFailureType,
    updateAllergyRequestType,
    updateAllergySuccessType,
    updateAllergyFailureType
} from "./types";


export const fetchAllergyDataRequest = (payload: string): FetchAllergyDataRequest => ({
    type: FETCH_ALLERGY_REQUEST,
    payload
});

export const fetchAllergyDataSuccess = (payload: FetchSuccessPayload): FetchAllergyDataSuccess => ({
    type: FETCH_ALLERGY_SUCCESS,
    payload
});

export const fetchAllergyDataFailure = (payload: FetchFailurePayload): FetchAllergyDataFailure => ({
    type: FETCH_ALLERGY_FALIURE,
    payload
})

// AllergyData
export const postAllergyDataRequestAction = (payload: AllergiesFormData): postAllergyDataRequest => ({
    type: POST_ALLERGY_REQUEST,
    payload
});

export const postAllergyDataSuccessAction = (payload: postAllergySuccessPayload): postAllergyDataSuccess => {

    return {
        type: POST_ALLERGY_SUCCESS,
        payload
    }
};

export const postAllergyDataFailureAction = (payload: postAllergyFailurePayload): postAllergyDataFailure => ({
    type: POST_ALLERGY_FALIURE,
    payload
})

// Get Allergy Reaction



export const getAllergyReactionRequest = (): getAllergyReactionRequestType => ({
    type: GET_ALLERGY_REACTION_REQUEST
});

export const getAllergyReactionSuccess = (payload: getAllergyReactionSuccessPayload): getAllergyReactionSuccessType => ({
    type: GET_ALLERGY_REACTION_SUCCESS,
    payload
});

export const getAllergyReactionFailure = (payload: getAllergyReactionFailurePayload): getAllergyReactionFailureType => ({
    type: GET_ALLERGY_REACTION_FALIURE,
    payload
})
// Get Allergy Severities

export const getAllergyServertiesRequest = (): getAllergySevertiesRequestType => ({
    type: GET_ALLERGY_SEVERTIES_REQUEST,
});

export const getAllergyServertiesSuccess = (payload: getAllergySevertiesSuccessPayload): getAllergySevertiesSuccessType => ({
    type: GET_ALLERGY_SEVERTIES_SUCCESS,
    payload
});

export const getAllergyServertiesFailure = (payload: getAllergySevertiesFailurePayload): getAllergySevertiesFailureType => ({
    type: GET_ALLERGY_SEVERTIES_FALIURE,
    payload
})



// Delete Allergy
export const deleteAllergyRequest = (payload: string): deleteAllergyRequestType => ({
    type: DELETE_ALLERGY_REQUEST,
    payload
});

export const deleteAllergySuccess = (payload: any): deleteAllergySuccessType => ({
    type: DELETE_ALLERGY_SUCCESS,
    payload
});

export const deleteAllergyFailure = (payload: string): deleteAllergyFailureType => ({
    type: DELETE_ALLERGY_FALIURE,
    payload
})
// update Allergy
export const updateAllergyRequest = (payload: object): updateAllergyRequestType => ({
    type: UPDATE_ALLERGY_REQUEST,
    payload
});

export const updateAllergySuccess = (payload: any): updateAllergySuccessType => ({
    type: UPDATE_ALLERGY_SUCCESS,
    payload
});

export const updateAllergyFailure = (payload: string): updateAllergyFailureType => ({
    type: UPDATE_ALLERGY_FALIURE,
    payload
})