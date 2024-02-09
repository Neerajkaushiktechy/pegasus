
import {
    GET_VITALS_REQUEST,
    GET_VITALS_SUCCESS,
    GET_VITALS_FALIURE,
    POST_VITALS_REQUEST,
    POST_VITALS_SUCCESS,
    POST_VITALS_FALIURE,
    DELETE_VITALS_REQUEST,
    DELETE_VITALS_SUCCESS,
    DELETE_VITALS_FALIURE,
    UPDATE_VITALS_REQUEST,
    UPDATE_VITALS_SUCCESS,
    UPDATE_VITALS_FALIURE,
    GET_OXYGEN_SUPPLY_REQUEST,
    GET_OXYGEN_SUPPLY_SUCCESS,
    GET_OXYGEN_SUPPLY_FALIURE
} from "./actionTypes";


// GET Viatl History
export interface FetchVitalsDataRequest {
    type: typeof GET_VITALS_REQUEST;
    payload: string;
}
export interface FetchVitalsDataSuccess {
    type: typeof GET_VITALS_SUCCESS;
    payload: any;
}
export interface FetchVitalsDataFailure {
    type: typeof GET_VITALS_FALIURE;
    payload: string;
}

// POST Vitals History 
export interface postVitalsDataRequest {
    type: typeof POST_VITALS_REQUEST;
    payload: any
}
export interface postVitalsDataSuccess {
    type: typeof POST_VITALS_SUCCESS;
    payload: any;
}
export interface postVitalsDataFailure {
    type: typeof POST_VITALS_FALIURE;
    payload: string;
}

// DELETE Vitals History
export interface deleteVitalsRequestType {
    type: typeof DELETE_VITALS_REQUEST,
    payload: string;
}
export interface deleteVitalsSuccessType {
    type: typeof DELETE_VITALS_SUCCESS;
    payload: any;
}
export interface deleteVitalsFailureType {
    type: typeof DELETE_VITALS_FALIURE;
    payload: string;
}

// UPDATE Vitals History
export interface updateVitalsRequestType {
    type: typeof UPDATE_VITALS_REQUEST,
    payload: any;
}
export interface updateVitalsSuccessType {
    type: typeof UPDATE_VITALS_SUCCESS;
    payload: any;
}
export interface updateVitalsFailureType {
    type: typeof UPDATE_VITALS_FALIURE;
    payload: string;
}


// GET Oxygen supply Data
export interface FetchOxygenSupplyDataRequest {
    type: typeof GET_OXYGEN_SUPPLY_REQUEST;
}
export interface FetchOxygenSupplyDataSuccess {
    type: typeof GET_OXYGEN_SUPPLY_SUCCESS;
    payload: any;
}
export interface FetchOxygenSupplyDataFailure {
    type: typeof GET_OXYGEN_SUPPLY_FALIURE;
    payload: any;
}
export type AuthActions =
    | FetchVitalsDataRequest
    | FetchVitalsDataSuccess
    | FetchVitalsDataFailure
    | postVitalsDataRequest
    | postVitalsDataSuccess
    | postVitalsDataFailure
    | deleteVitalsRequestType
    | deleteVitalsSuccessType
    | deleteVitalsFailureType
    | updateVitalsRequestType
    | updateVitalsSuccessType
    | updateVitalsFailureType
    | FetchOxygenSupplyDataRequest
    | FetchOxygenSupplyDataSuccess
    | FetchOxygenSupplyDataFailure