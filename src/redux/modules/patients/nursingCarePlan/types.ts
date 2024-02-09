
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



export interface FetchSuccessPayload {
    data: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchNursingCarePlanRequest {
    type: typeof FETCH_NURSINGCAREPLAN_REQUEST;
    payload: string;

}
export interface FetchNursingCarePlanSuccess {
    type: typeof FETCH_NURSINGCAREPLAN_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchNursingCarePlanFailure {
    type: typeof FETCH_NURSINGCAREPLAN_FALIURE;
    payload: FetchFailurePayload;
}
// POST Other Information 

export interface postNursingCarePlanSuccessRequest {
    data: any;
}
export interface postNursingCarePlanSuccessPayload {
    data: any;
}
export interface postNursingCarePlanFailurePayload {
    error: string;
}

export interface postNursingCarePlanRequest {
    type: typeof POST_NURSINGCAREPLAN_REQUEST;
    payload: NursingCarePlanFormData
}
export interface postNursingCarePlanSuccess {
    type: typeof POST_NURSINGCAREPLAN_SUCCESS;
    payload: postNursingCarePlanSuccessPayload;
}
export interface postNursingCarePlanFailure {
    type: typeof POST_NURSINGCAREPLAN_FALIURE;
    payload: postNursingCarePlanFailurePayload;
}


// Delete Other Information 
export interface deleteNursingCarePlanRequestType {
    type: typeof DELETE_NURSINGCAREPLAN_REQUEST,
    payload: string;

}
export interface deleteNursingCarePlanSuccessType {
    type: typeof DELETE_NURSINGCAREPLAN_SUCCESS;
    payload: any;
}
export interface deleteNursingCarePlanFailureType {
    type: typeof DELETE_NURSINGCAREPLAN_FALIURE;
    payload: string;
}

// Update Other Information 

export interface updateNursingCarePlanRequestType {
    type: typeof UPDATE_NURSINGCAREPLAN_REQUEST,
    payload: object;

}
export interface updateNursingCarePlanSuccessType {
    type: typeof UPDATE_NURSINGCAREPLAN_SUCCESS;
    payload: any;
}
export interface updateNursingCarePlanFailureType {
    type: typeof UPDATE_NURSINGCAREPLAN_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchNursingCarePlanRequest
    | FetchNursingCarePlanSuccess
    | FetchNursingCarePlanFailure
    | postNursingCarePlanRequest
    | postNursingCarePlanSuccess
    | postNursingCarePlanFailure
    | deleteNursingCarePlanRequestType
    | deleteNursingCarePlanSuccessType
    | deleteNursingCarePlanFailureType
    | updateNursingCarePlanRequestType
    | updateNursingCarePlanSuccessType
    | updateNursingCarePlanFailureType