
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



export interface FetchSuccessPayload {
    data: any;
}
export interface FetchFailurePayload {
    error: string;
}
export interface FetchDoctorsOrdersRequest {
    type: typeof FETCH_DOCTORORDER_REQUEST;
    payload: string;

}
export interface FetchDoctorsOrdersSuccess {
    type: typeof FETCH_DOCTORORDER_SUCCESS;
    payload: FetchSuccessPayload;
}
export interface FetchDoctorsOrdersFailure {
    type: typeof FETCH_DOCTORORDER_FALIURE;
    payload: FetchFailurePayload;
}
// POST Other Information 

export interface postDoctorsOrdersSuccessRequest {
    data: any;
}
export interface postDoctorsOrdersSuccessPayload {
    data: any;
}
export interface postDoctorsOrdersFailurePayload {
    error: string;
}

export interface postDoctorsOrdersRequest {
    type: typeof POST_DOCTORORDER_REQUEST;
    payload: DoctorsOrdersFormData
}
export interface postDoctorsOrdersSuccess {
    type: typeof POST_DOCTORORDER_SUCCESS;
    payload: postDoctorsOrdersSuccessPayload;
}
export interface postDoctorsOrdersFailure {
    type: typeof POST_DOCTORORDER_FALIURE;
    payload: postDoctorsOrdersFailurePayload;
}


// Delete Other Information 
export interface deleteDoctorsOrdersRequestType {
    type: typeof DELETE_DOCTORORDER_REQUEST,
    payload: string;

}
export interface deleteDoctorsOrdersSuccessType {
    type: typeof DELETE_DOCTORORDER_SUCCESS;
    payload: any;
}
export interface deleteDoctorsOrdersFailureType {
    type: typeof DELETE_DOCTORORDER_FALIURE;
    payload: string;
}

// Update Other Information 

export interface updateDoctorsOrdersRequestType {
    type: typeof UPDATE_DOCTORORDER_REQUEST,
    payload: object;

}
export interface updateDoctorsOrdersSuccessType {
    type: typeof UPDATE_DOCTORORDER_SUCCESS;
    payload: any;
}
export interface updateDoctorsOrdersFailureType {
    type: typeof UPDATE_DOCTORORDER_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchDoctorsOrdersRequest
    | FetchDoctorsOrdersSuccess
    | FetchDoctorsOrdersFailure
    | postDoctorsOrdersRequest
    | postDoctorsOrdersSuccess
    | postDoctorsOrdersFailure
    | deleteDoctorsOrdersRequestType
    | deleteDoctorsOrdersSuccessType
    | deleteDoctorsOrdersFailureType
    | updateDoctorsOrdersRequestType
    | updateDoctorsOrdersSuccessType
    | updateDoctorsOrdersFailureType