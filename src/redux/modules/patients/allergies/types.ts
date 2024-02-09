
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



export interface FetchSuccessPayload {
    data: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchAllergyDataRequest {
    type: typeof FETCH_ALLERGY_REQUEST;
    payload: string;

}
export interface FetchAllergyDataSuccess {
    type: typeof FETCH_ALLERGY_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchAllergyDataFailure {
    type: typeof FETCH_ALLERGY_FALIURE;
    payload: FetchFailurePayload;
}
// POST ALLERGY 

export interface postAllergySuccessRequest {
    data: any;
}
export interface postAllergySuccessPayload {
    data: any;
}
export interface postAllergyFailurePayload {
    error: string;
}

export interface postAllergyDataRequest {
    type: typeof POST_ALLERGY_REQUEST;
    payload: AllergiesFormData
}
export interface postAllergyDataSuccess {
    type: typeof POST_ALLERGY_SUCCESS;
    payload: postAllergySuccessPayload;
}
export interface postAllergyDataFailure {
    type: typeof POST_ALLERGY_FALIURE;
    payload: postAllergyFailurePayload;
}

// GET ALLERGY Reaction

export interface getAllergyReactionSuccessPayload {
    data: any;
}
export interface getAllergyReactionFailurePayload {
    error: string;
}

export interface getAllergyReactionRequestType {
    type: typeof GET_ALLERGY_REACTION_REQUEST
}
export interface getAllergyReactionSuccessType {
    type: typeof GET_ALLERGY_REACTION_SUCCESS;
    payload: getAllergyReactionSuccessPayload;
}
export interface getAllergyReactionFailureType {
    type: typeof GET_ALLERGY_REACTION_FALIURE;
    payload: getAllergyReactionFailurePayload;
}


// GET ALLERGY SEVERTIES


export interface getAllergySevertiesSuccessPayload {
    data: any;
}
export interface getAllergySevertiesFailurePayload {
    error: string;
}

export interface getAllergySevertiesRequestType {
    type: typeof GET_ALLERGY_SEVERTIES_REQUEST
}
export interface getAllergySevertiesSuccessType {
    type: typeof GET_ALLERGY_SEVERTIES_SUCCESS;
    payload: getAllergySevertiesSuccessPayload;
}
export interface getAllergySevertiesFailureType {
    type: typeof GET_ALLERGY_SEVERTIES_FALIURE;
    payload: getAllergySevertiesFailurePayload;
}
// Delete ALLERGY 
export interface deleteAllergyRequestType {
    type: typeof DELETE_ALLERGY_REQUEST,
    payload: string;

}
export interface deleteAllergySuccessType {
    type: typeof DELETE_ALLERGY_SUCCESS;
    payload: any;
}
export interface deleteAllergyFailureType {
    type: typeof DELETE_ALLERGY_FALIURE;
    payload: string;
}
// Update ALLERGY 


export interface updateAllergyRequestType {
    type: typeof UPDATE_ALLERGY_REQUEST,
    payload: object;

}
export interface updateAllergySuccessType {
    type: typeof UPDATE_ALLERGY_SUCCESS;
    payload: any;
}
export interface updateAllergyFailureType {
    type: typeof UPDATE_ALLERGY_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchAllergyDataRequest
    | FetchAllergyDataSuccess
    | FetchAllergyDataFailure
    | postAllergyDataRequest
    | postAllergyDataSuccess
    | postAllergyDataFailure
    | getAllergyReactionRequestType
    | getAllergyReactionSuccessType
    | getAllergyReactionFailureType
    | getAllergySevertiesRequestType
    | getAllergySevertiesSuccessType
    | getAllergySevertiesFailureType
    | deleteAllergyRequestType
    | deleteAllergySuccessType
    | deleteAllergyFailureType
    | updateAllergyRequestType
    | updateAllergySuccessType
    | updateAllergyFailureType