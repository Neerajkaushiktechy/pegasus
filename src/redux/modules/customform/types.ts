import {
    CREATE_CUSTOM_FORM_REQUEST,
    CREATE_CUSTOM_FORM_SUCCESS,
    CREATE_CUSTOM_FORM_FAILURE,
    SUBMIT_CUSTOM_FORM_REQUEST,
    SUBMIT_CUSTOM_FORM_SUCCESS,
    SUBMIT_CUSTOM_FORM_FAILURE,
    SHOW_FIRST_CUSTOM_FORM
} from "./actionTypes";

// POST Custom form
export interface PostSCustomFormDataRequest {
    type: typeof CREATE_CUSTOM_FORM_REQUEST;
    payload: any
}
export interface PostCustomFormDataSuccess {
    type: typeof CREATE_CUSTOM_FORM_SUCCESS;
    payload: any;
}
export interface PostCustomFormDataFailure {
    type: typeof CREATE_CUSTOM_FORM_FAILURE;
    payload: string;
}

export interface ShowFirstCustomForm {
    type: typeof SHOW_FIRST_CUSTOM_FORM;
}

// Submit Custom form
export interface SubmitCustomFormDataRequest {
    type: typeof SUBMIT_CUSTOM_FORM_REQUEST;
    payload: any
}
export interface SubmitCustomFormDataSuccess {
    type: typeof SUBMIT_CUSTOM_FORM_SUCCESS;
    payload: any;
}
export interface SubmitCustomFormDataFailure {
    type: typeof SUBMIT_CUSTOM_FORM_FAILURE;
    payload: string;
}
export type AuthActions =
    | PostSCustomFormDataRequest
    | PostCustomFormDataSuccess
    | PostCustomFormDataFailure
    | SubmitCustomFormDataRequest
    | SubmitCustomFormDataSuccess
    | SubmitCustomFormDataFailure
    | ShowFirstCustomForm