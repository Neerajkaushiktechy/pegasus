
import {
    GET_MEDICATION_REQUEST,
    GET_MEDICATION_SUCCESS,
    GET_MEDICATION_FALIURE,
    POST_MEDICATION_REQUEST,
    POST_MEDICATION_SUCCESS,
    POST_MEDICATION_FALIURE,
    DELETE_MEDICATION_REQUEST,
    DELETE_MEDICATION_SUCCESS,
    DELETE_MEDICATION_FALIURE,
    UPDATE_MEDICATION_REQUEST,
    UPDATE_MEDICATION_SUCCESS,
    UPDATE_MEDICATION_FALIURE,
    GET_MEDECATION_FORM_DATA_REQUEST,
    GET_MEDECATION_FORM_DATA_SUCCESS,
    GET_MEDECATION_FORM_DATA_FALIURE,
    POST_CUSTOMMEDICATIONROUTE_REQUEST,
    POST_CUSTOMMEDICATIONROUTE_SUCCESS,
    POST_CUSTOMMEDICATIONROUTE_FALIURE,
    APPEND_CUSTOM_META_DATA,
    GET_MEDICATIONMEDICINE_REQUEST,
    GET_MEDICATIONMEDICINE_SUCCESS,
    GET_MEDICATIONMEDICINE_FALIURE
} from "./actionTypes";



export interface getFormDataRequestType {
    type: typeof GET_MEDECATION_FORM_DATA_REQUEST;
}
export interface getFormDataSuccessType {
    type: typeof GET_MEDECATION_FORM_DATA_SUCCESS;
    payload: any;
}
export interface getFormDataFailureType {
    type: typeof GET_MEDECATION_FORM_DATA_FALIURE;
    payload: any;
}

// GET 
export interface getDataRequestType {
    type: typeof GET_MEDICATION_REQUEST;
    payload: any;

}
export interface getDataSuccessType {
    type: typeof GET_MEDICATION_SUCCESS;
    payload: any;
}
export interface getDataFailureType {
    type: typeof GET_MEDICATION_FALIURE;
    payload: string;
}

// POST  History 
export interface postDataRequestType {
    type: typeof POST_MEDICATION_REQUEST;
    payload: any
}
export interface postDataSuccessType {
    type: typeof POST_MEDICATION_SUCCESS;
    payload: any;
}

export interface AppendCustomMetaData {
    type : typeof APPEND_CUSTOM_META_DATA;
    payload :any
}
export interface postDataFailureType {
    type: typeof POST_MEDICATION_FALIURE;
    payload: any;
}

// DELETE  History
export interface deleteRequestType {
    type: typeof DELETE_MEDICATION_REQUEST,
    payload: any;
}
export interface deleteSuccessType {
    type: typeof DELETE_MEDICATION_SUCCESS;
    payload: any;
}
export interface deleteFailureType {
    type: typeof DELETE_MEDICATION_FALIURE;
    payload: any;
}

// UPDATE  History
export interface updateRequestType {
    type: typeof UPDATE_MEDICATION_REQUEST,
    payload: any;
}
export interface updateSuccessType {
    type: typeof UPDATE_MEDICATION_SUCCESS;
    payload: any;
}
export interface updateFailureType {
    type: typeof UPDATE_MEDICATION_FALIURE;
    payload: any;
}

// POST Custom Medication Route
export interface postCustomMedicationRouteRequestType {
    type: typeof POST_CUSTOMMEDICATIONROUTE_REQUEST;
    payload: any
}
export interface postCustomMedicationRouteSuccessType {
    type: typeof POST_CUSTOMMEDICATIONROUTE_SUCCESS;
    payload: any;
}
export interface postCustomMedicationRouteFailureType {
    type: typeof POST_CUSTOMMEDICATIONROUTE_FALIURE;
    payload: any;
}

export interface getMedicationMedicineRequestType {
    type: typeof GET_MEDICATIONMEDICINE_REQUEST;
    payload: any;
}
export interface getMedicationMedicineSuccessType {
    type: typeof GET_MEDICATIONMEDICINE_SUCCESS;
    payload: any;
}
export interface getMedicationMedicineFailureType {
    type: typeof GET_MEDICATIONMEDICINE_FALIURE;
    payload: any;
}


export type AuthActions =
    | getFormDataRequestType
    | getFormDataSuccessType
    | getFormDataFailureType
    | getDataRequestType
    | getDataSuccessType
    | getDataFailureType
    | postDataRequestType
    | postDataSuccessType
    | postDataFailureType
    | deleteRequestType
    | deleteSuccessType
    | deleteFailureType
    | updateRequestType
    | updateSuccessType
    | updateFailureType
    | postCustomMedicationRouteRequestType
    | postCustomMedicationRouteSuccessType
    | postCustomMedicationRouteFailureType
    | AppendCustomMetaData
    | getMedicationMedicineRequestType
    | getMedicationMedicineSuccessType
    | getMedicationMedicineFailureType