
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


// GET Family History
export interface FetchFamilyDataRequest {
    type: typeof GET_FAMILY_REQUEST;
    payload: string;
}
export interface FetchFamilyDataSuccess {
    type: typeof GET_FAMILY_SUCCESS;
    payload: any;
}
export interface FetchFamilyDataFailure {
    type: typeof GET_FAMILY_FALIURE;
    payload: string;
}

// POST Family History 
export interface postFamilyDataRequest {
    type: typeof POST_FAMILY_REQUEST;
    payload: familyFormData
}
export interface postFamilyDataSuccess {
    type: typeof POST_FAMILY_SUCCESS;
    payload: any;
}
export interface postFamilyDataFailure {
    type: typeof POST_FAMILY_FALIURE;
    payload: string;
}

// DELETE Family History
export interface deleteFamilyRequestType {
    type: typeof DELETE_FAMILY_REQUEST,
    payload: string;
}
export interface deleteFamilySuccessType {
    type: typeof DELETE_FAMILY_SUCCESS;
    payload: any;
}
export interface deleteFamilyFailureType {
    type: typeof DELETE_FAMILY_FALIURE;
    payload: string;
}

// UPDATE Family History
export interface updateFamilyRequestType {
    type: typeof UPDATE_FAMILY_REQUEST,
    payload: familyFormData;
}
export interface updateFamilySuccessType {
    type: typeof UPDATE_FAMILY_SUCCESS;
    payload: any;
}
export interface updateFamilyFailureType {
    type: typeof UPDATE_FAMILY_FALIURE;
    payload: string;
}

// GET FamilyHistoryType Data
export interface FetchFamilyHistoryTypeDataRequest {
    type: typeof GET_FAMILY_HISTORY_TYPE_REQUEST;
}
export interface FetchFamilyHistoryTypDataSuccess {
    type: typeof GET_FAMILY_HISTORY_TYPE_SUCCESS;
    payload: any;
}
export interface FetchFamilyHistoryTypDataFailure {
    type: typeof GET_FAMILY_HISTORY_TYPE_FALIURE;
    payload: any;
}


export type AuthActions =
    | FetchFamilyDataRequest
    | FetchFamilyDataSuccess
    | FetchFamilyDataFailure
    | postFamilyDataRequest
    | postFamilyDataSuccess
    | postFamilyDataFailure
    | deleteFamilyRequestType
    | deleteFamilySuccessType
    | deleteFamilyFailureType
    | updateFamilyRequestType
    | updateFamilySuccessType
    | updateFamilyFailureType
    | FetchFamilyHistoryTypeDataRequest
    | FetchFamilyHistoryTypDataSuccess
    | FetchFamilyHistoryTypDataFailure