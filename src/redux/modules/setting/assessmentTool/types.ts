
import {
    GET_ASSESSMENTTOOL_REQUEST,
    GET_ASSESSMENTTOOL_SUCCESS,
    GET_ASSESSMENTTOOL_FALIURE,
    POST_ASSESSMENTTOOL_REQUEST,
    POST_ASSESSMENTTOOL_SUCCESS,
    POST_ASSESSMENTTOOL_FALIURE,
    DELETE_ASSESSMENTTOOL_REQUEST,
    DELETE_ASSESSMENTTOOL_SUCCESS,
    DELETE_ASSESSMENTTOOL_FALIURE,
    UPDATE_ASSESSMENTTOOL_REQUEST,
    UPDATE_ASSESSMENTTOOL_SUCCESS,
    UPDATE_ASSESSMENTTOOL_FALIURE,
    GET_ASSESSMENTTYPE_REQUEST,
    GET_ASSESSMENTTYPE_SUCCESS,
    GET_ASSESSMENTTYPE_FALIURE,
    POST_ASSESSMENTTYPE_REQUEST,
    POST_ASSESSMENTTYPE_SUCCESS,
    POST_ASSESSMENTTYPE_FALIURE,
    SHOW_ASSESSMENT_FORM,
    EDIT_CUSTOM_FORM_ASSESSMENT_FORM
} from "./actionTypes";


// GET Viatl History
export interface getDataRequestType {
    type: typeof GET_ASSESSMENTTOOL_REQUEST;
    payload: any;
}
export interface getDataSuccessType {
    type: typeof GET_ASSESSMENTTOOL_SUCCESS;
    payload: any;
}
export interface getDataFailureType {
    type: typeof GET_ASSESSMENTTOOL_FALIURE;
    payload: string;
}

// POST  History 
export interface postDataRequestType {
    type: typeof POST_ASSESSMENTTOOL_REQUEST;
    payload: any
}
export interface postDataSuccessType {
    type: typeof POST_ASSESSMENTTOOL_SUCCESS;
    payload: any;
}
export interface postDataFailureType {
    type: typeof POST_ASSESSMENTTOOL_FALIURE;
    payload: string;
}

// DELETE  History
export interface deleteRequestType {
    type: typeof DELETE_ASSESSMENTTOOL_REQUEST,
    payload: string;
}
export interface deleteSuccessType {
    type: typeof DELETE_ASSESSMENTTOOL_SUCCESS;
    payload: any;
}
export interface deleteFailureType {
    type: typeof DELETE_ASSESSMENTTOOL_FALIURE;
    payload: string;
}

// UPDATE  History
export interface updateRequestType {
    type: typeof UPDATE_ASSESSMENTTOOL_REQUEST,
    payload: any;
}
export interface updateSuccessType {
    type: typeof UPDATE_ASSESSMENTTOOL_SUCCESS;
    payload: any;
}
export interface updateFailureType {
    type: typeof UPDATE_ASSESSMENTTOOL_FALIURE;
    payload: string;
}

// GET Assessment type
export interface getAssessmentTypeDataRequestType {
    type: typeof GET_ASSESSMENTTYPE_REQUEST;
}
export interface getAssessmentTypeSuccessType {
    type: typeof GET_ASSESSMENTTYPE_SUCCESS;
    payload: any;
}
export interface getAssessmentTypeFailureType {
    type: typeof GET_ASSESSMENTTYPE_FALIURE;
    payload: string;
}


// POST  Assessment type
export interface postAssessmentTypeDataRequestType {
    type: typeof POST_ASSESSMENTTYPE_REQUEST;
    payload: any
}
export interface postAssessmentTypeSuccessType {
    type: typeof POST_ASSESSMENTTYPE_SUCCESS;
    payload: any;
}
export interface postAssessmentTypeFailureType {
    type: typeof POST_ASSESSMENTTYPE_FALIURE;
    payload: string;
}

export interface  ShowFormDATAssesment {
    type: typeof SHOW_ASSESSMENT_FORM;
    payload: any;
    formType : any;
}

export interface  EditCustomFormDATAssesment {
    type: typeof EDIT_CUSTOM_FORM_ASSESSMENT_FORM;
    payload: any;
}
export type AuthActions =
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
    | getAssessmentTypeDataRequestType
    | getAssessmentTypeSuccessType
    | getAssessmentTypeFailureType
    | postAssessmentTypeDataRequestType
    | postAssessmentTypeSuccessType
    | postAssessmentTypeFailureType
    | ShowFormDATAssesment
    |EditCustomFormDATAssesment