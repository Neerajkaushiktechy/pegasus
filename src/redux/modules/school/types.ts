import {
    POST_SCHOOL_REQUEST,
    POST_SCHOOL_SUCCESS,
    POST_SCHOOL_FALIURE,
    GET_SCHOOL_REQUEST,
    GET_SCHOOL_SUCCESS,
    GET_SCHOOL_FALIURE,
    DELETE_SCHOOL_REQUEST,
    DELETE_SCHOOL_FALIURE,
    DELETE_SCHOOL_SUCCESS,
    UPDATE_SCHOOL_REQUEST,
    UPDATE_SCHOOL_SUCCESS,
    UPDATE_SCHOOL_FALIURE,
    CHECK__SCHOOL_EMAIL_REQUEST,
    CHECK__SCHOOL_EMAIL_FALIURE,
    CHECK_SCHOOL_EMAIL_SUCCESS
} from "./actionTypes";

// GET School
export interface FetchschoolsDataRequest {
    type: typeof GET_SCHOOL_REQUEST;
}
export interface FetchschoolsDataSuccess {
    type: typeof GET_SCHOOL_SUCCESS;
    payload: any;
}
export interface FetchschoolsDataFailure {
    type: typeof GET_SCHOOL_FALIURE;
    payload: any;
}


// POST School
export interface PostSchoolDataRequest {
    type: typeof POST_SCHOOL_REQUEST;
    payload: any
}
export interface PostSchoolDataSuccess {
    type: typeof POST_SCHOOL_SUCCESS;
    payload: any;
}
export interface PostSchoolDataFailure {
    type: typeof POST_SCHOOL_FALIURE;
    payload: string;
}

// DELETE School
export interface DeleteschoolDataRequest {
    type: typeof DELETE_SCHOOL_REQUEST;
    payload: string;
}
export interface DeleteschoolDataSuccess {
    type: typeof DELETE_SCHOOL_SUCCESS;
    payload: any;
}
export interface DeleteschoolDataFailure {
    type: typeof DELETE_SCHOOL_FALIURE;
    payload: any;
}

// UPDATE School
export interface UpdateSchoolRequestType {
    type: typeof UPDATE_SCHOOL_REQUEST,
    payload: object;

}
export interface UpdateSchoolSuccessType {
    type: typeof UPDATE_SCHOOL_SUCCESS;
    payload: any;
}
export interface UpdateSchoolFailureType {
    type: typeof UPDATE_SCHOOL_FALIURE;
    payload: string;
}

export interface CheckEmailRequestType {
    type: typeof CHECK__SCHOOL_EMAIL_REQUEST,
    payload:object;

}
export interface CheckEmailSuccessType {
    type: typeof CHECK_SCHOOL_EMAIL_SUCCESS;
    payload: string;
}
export interface CheckEmailFailureType {
    type: typeof CHECK__SCHOOL_EMAIL_FALIURE;
    payload: string;
}
export type AuthActions =
    | FetchschoolsDataRequest
    | FetchschoolsDataSuccess
    | FetchschoolsDataFailure
    | PostSchoolDataRequest
    | PostSchoolDataSuccess
    | PostSchoolDataFailure
    | DeleteschoolDataRequest
    | DeleteschoolDataSuccess
    | DeleteschoolDataFailure
    | UpdateSchoolRequestType
    | UpdateSchoolSuccessType
    | UpdateSchoolSuccessType
    | CheckEmailRequestType
    | CheckEmailSuccessType
    | CheckEmailFailureType