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

// GET profile
export interface FetchProfileDataRequest {
    type: typeof GET_PROFILE_REQUEST;
}
export interface  FetchProfileDatSuccess {
    type: typeof GET_PROFILE_SUCCESS;
    payload: any;
}
export interface  FetchProfileDatFailure {
    type: typeof GET_PROFILE_FALIURE;
    payload: any;
}



// UPDATE profile
export interface UpdateProfileRequestType {
    type: typeof UPDATE_PROFILE_REQUEST,
    payload: object;

}
export interface UpdateProfileSuccessType {
    type: typeof UPDATE_PROFILE_SUCCESS;
    payload: any;
}
export interface UpdateProfileFailureType {
    type: typeof UPDATE_PROFILE_FALIURE;
    payload: string;
}

// UPDATE password
export interface ChangePasswordRequestType {
    type: typeof UPDATE_PASSWORD_REQUEST,
    payload: object;

}
export interface ChangePasswordSuccessType {
    type: typeof UPDATE_PASSWORD_SUCCESS;
    payload: any;
}
export interface ChangePasswordFailureType {
    type: typeof UPDATE_PASSWORD_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchProfileDataRequest
    | FetchProfileDatSuccess
    | FetchProfileDatFailure
    | UpdateProfileRequestType
    | UpdateProfileSuccessType
    | UpdateProfileFailureType
    | ChangePasswordRequestType
    |ChangePasswordSuccessType
    | ChangePasswordFailureType