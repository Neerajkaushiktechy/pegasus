import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FALIURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FALIURE,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FALIURE
} from "./actionTypes";

import {
    FetchProfileDataRequest,
    FetchProfileDatSuccess,
    FetchProfileDatFailure,
    UpdateProfileRequestType,
    UpdateProfileSuccessType,
    UpdateProfileFailureType,
    ChangePasswordRequestType,
    ChangePasswordSuccessType,
    ChangePasswordFailureType
} from './types'

// GET Profile 

export const fetchprofileDataRequest = () : FetchProfileDataRequest => ({
    type: GET_PROFILE_REQUEST,
});
export const fetchprofileDataSuccess = (payload: any ) : FetchProfileDatSuccess => ({
    type: GET_PROFILE_SUCCESS,
    payload
});
export const fetchprofileDataFailure = (payload: any) : FetchProfileDatFailure  => ({
    type: GET_PROFILE_FALIURE,
    payload
    
})




// update Profile
export const updateProfileRequest = (payload: object): UpdateProfileRequestType => ({
    type: UPDATE_PROFILE_REQUEST,
    payload
});

export const updateProfiletSuccess = (payload: any): UpdateProfileSuccessType => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload
});

export const updateProfileFailure = (payload: string): UpdateProfileFailureType => ({
    type: UPDATE_PROFILE_FALIURE,
    payload
})



// update Password
export const updatePasswordRequest = (payload: object): ChangePasswordRequestType => ({
    type: UPDATE_PASSWORD_REQUEST,
    payload
});

export const updatePasswordSuccess = (payload: any): ChangePasswordSuccessType => ({
    type: UPDATE_PASSWORD_SUCCESS,
    payload
});

export const updatePasswordFailure = (payload: string): ChangePasswordFailureType => ({
    type: UPDATE_PASSWORD_FALIURE,
    payload
})

