import {
    POST_QUICK_GUIDE_REQUEST,
    POST_QUICK_GUIDE_SUCCESS,
    POST_QUICK_GUIDE_FALIURE,
    GET_QUICK_GUIDE_REQUEST,
    GET_QUICK_GUIDE_SUCCESS,
    GET_QUICK_GUIDE_FALIURE,
    DELETE_QUICK_GUIDE_REQUEST,
    DELETE_QUICK_GUIDE_FALIURE,
    DELETE_QUICK_GUIDE_SUCCESS,
    UPDATE_QUICK_GUIDE_REQUEST,
    UPDATE_QUICK_GUIDE_SUCCESS,
    UPDATE_QUICK_GUIDE_FALIURE,
} from "./actionTypes";

import {
    FetchQuickGuideDataRequest,
    FetchQuickGuideDataSuccess,
    FetchQuickGuideDataFailure,
    PostQuickGuideDataRequest,
    PostQuickGuideDataSuccess,
    PostQuickGuideataFailure,
    DeletequickGuideDataRequest,
    DeletequickGuideDataSuccess,
    DeletequickGuideDataFailure,
    UpdatequickGuideRequestType,
    UpdatequickGuideSuccessType,
    UpdatequickGuideFailureType,
} from './types'

// GET QUickGuide 

export const fetchQuickGuideDataRequest = () : FetchQuickGuideDataRequest => ({
    type: GET_QUICK_GUIDE_REQUEST,
});
export const fetchQuickGuideDataSuccess = (payload: any ) : FetchQuickGuideDataSuccess => ({
    type: GET_QUICK_GUIDE_SUCCESS,
    payload
});
export const fetchQuickGuideDataFailure = (payload: any) : FetchQuickGuideDataFailure  => ({
    type: GET_QUICK_GUIDE_FALIURE,
    payload
    
})

// POST Quick Guide
export const postquickGuideRequest = (payload: any , formData :any): PostQuickGuideDataRequest => ({
    type: POST_QUICK_GUIDE_REQUEST,
    payload,
    formData
});

export const postquickGuideSuccess = (payload: any): PostQuickGuideDataSuccess => {
    return {
        type: POST_QUICK_GUIDE_SUCCESS,
        payload
    }
};

export const postquickGuideFaliure = (payload: string): PostQuickGuideataFailure => ({
    type: POST_QUICK_GUIDE_FALIURE,
    payload
})

// DELETE Quick Guide

export const deletequickGuideDataRequest = (payload: string) : DeletequickGuideDataRequest => ({
    type: DELETE_QUICK_GUIDE_REQUEST,
    payload
});
export const deletequickGuideDataSuccess = (payload: any ) : DeletequickGuideDataSuccess => ({
    type: DELETE_QUICK_GUIDE_SUCCESS,
    payload
});
export const deletequickGuideDataFailure = (payload: any) : DeletequickGuideDataFailure  => ({
    type: DELETE_QUICK_GUIDE_FALIURE,
    payload  
})


// update  Quick Guide
export const updatequickGuideRequest = (payload: object , id : string): UpdatequickGuideRequestType => ({
    type: UPDATE_QUICK_GUIDE_REQUEST,
    payload,
    id
});

export const updatequickGuidetSuccess = (payload: any): UpdatequickGuideSuccessType => ({
    type: UPDATE_QUICK_GUIDE_SUCCESS,
    payload
});

export const updatequickGuideFailure = (payload: string): UpdatequickGuideFailureType => ({
    type: UPDATE_QUICK_GUIDE_FALIURE,
    payload
})

