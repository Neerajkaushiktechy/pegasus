import {
    CREATE_CUSTOM_FORM_REQUEST,
    CREATE_CUSTOM_FORM_SUCCESS,
    CREATE_CUSTOM_FORM_FAILURE,
    SUBMIT_CUSTOM_FORM_REQUEST,
    SUBMIT_CUSTOM_FORM_SUCCESS,
    SHOW_FIRST_CUSTOM_FORM,
    SUBMIT_CUSTOM_FORM_FAILURE
} from "./actionTypes";

import {
    PostSCustomFormDataRequest,
    PostCustomFormDataSuccess,
    PostCustomFormDataFailure,
    SubmitCustomFormDataRequest,
    SubmitCustomFormDataSuccess,
    SubmitCustomFormDataFailure,
    ShowFirstCustomForm
} from './types'


// POST custom form 
export const postcustomFormRequest = (payload: any): PostSCustomFormDataRequest => ({
    type: CREATE_CUSTOM_FORM_REQUEST,
    payload
});

export const postcustomFormRequestSuccess = (payload: any): PostCustomFormDataSuccess => {
    return {
        type: CREATE_CUSTOM_FORM_SUCCESS,
        payload
    }
};

export const postcustomFormRequestFaliure = (payload: string): PostCustomFormDataFailure => ({
    type: CREATE_CUSTOM_FORM_FAILURE,
    payload
})

export const showFirstCustomForm = () : ShowFirstCustomForm  => ({
    type: SHOW_FIRST_CUSTOM_FORM,
})

// Submit Custom form

export const submitcustomFormRequest = (payload: any): SubmitCustomFormDataRequest => ({
    type: SUBMIT_CUSTOM_FORM_REQUEST,
    payload
});

export const submitcustomFormRequestSuccess = (payload: any): SubmitCustomFormDataSuccess => {
    return {
        type: SUBMIT_CUSTOM_FORM_SUCCESS,
        payload
    }
};

export const submitcustomFormRequestFaliure = (payload: string): SubmitCustomFormDataFailure => ({
    type: SUBMIT_CUSTOM_FORM_FAILURE,
    payload
})