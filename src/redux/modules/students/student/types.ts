import {
    POST_STUDENT_REQUEST,
    POST_STUDENT_SUCCESS,
    POST_STUDENT_FALIURE,
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FALIURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FALIURE,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FALIURE,
    CHECK_STUDENT_EMAIL_REQUEST,
    CHECK_STUDENT_EMAIL_SUCCESS,
    CHECK_STUDENT_EMAIL_FALIURE
} from "./actionTypes";

// GET Student
export interface FetchstudentsDataRequest {
    type: typeof GET_STUDENT_REQUEST;
    payload:any
}
export interface FetchstudentsDataSuccess {
    type: typeof GET_STUDENT_SUCCESS;
    payload: any;
}
export interface FetchstudentsDataFailure {
    type: typeof GET_STUDENT_FALIURE;
    payload: any;
}


// POST Student
export interface PostStudentDataRequest {
    type: typeof POST_STUDENT_REQUEST;
    payload: any
}
export interface PostStudentDataSuccess {
    type: typeof POST_STUDENT_SUCCESS;
    payload: any;
}
export interface PostStudentDataFailure {
    type: typeof POST_STUDENT_FALIURE;
    payload: string;
}

// DELETE Student
export interface DeletestudentsDataRequest {
    type: typeof DELETE_STUDENT_REQUEST;
    payload: string;
}
export interface DeletestudentsDataSuccess {
    type: typeof DELETE_STUDENT_SUCCESS;
    payload: any;
}
export interface DeletestudentsDataFailure {
    type: typeof DELETE_STUDENT_FALIURE;
    payload: any;
}

export interface UpdateStudentRequestType {
    type: typeof UPDATE_STUDENT_REQUEST,
    payload: object;

}
export interface UpdateStudentSuccessType {
    type: typeof UPDATE_STUDENT_SUCCESS;
    payload: any;
}
export interface UpdateStudentFailureType {
    type: typeof UPDATE_STUDENT_FALIURE;
    payload: string;
}

export interface CheckEmailRequestType {
    type: typeof CHECK_STUDENT_EMAIL_REQUEST,
    payload: object;

}
export interface CheckEmailSuccessType {
    type: typeof CHECK_STUDENT_EMAIL_SUCCESS;
    payload: string;
}
export interface CheckEmailFailureType {
    type: typeof CHECK_STUDENT_EMAIL_FALIURE;
    payload: string;
}
export type AuthActions =
    | FetchstudentsDataRequest
    | FetchstudentsDataSuccess
    | FetchstudentsDataFailure
    | PostStudentDataRequest
    | PostStudentDataSuccess
    | PostStudentDataFailure
    | DeletestudentsDataRequest
    | DeletestudentsDataSuccess
    | DeletestudentsDataFailure
    | UpdateStudentRequestType
    | UpdateStudentSuccessType
    | UpdateStudentFailureType
    | CheckEmailRequestType
    | CheckEmailSuccessType
    | CheckEmailFailureType