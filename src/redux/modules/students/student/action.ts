import {
    POST_STUDENT_REQUEST,
    POST_STUDENT_SUCCESS,
    POST_STUDENT_FALIURE,
    GET_STUDENT_REQUEST,
    GET_STUDENT_SUCCESS,
    GET_STUDENT_FALIURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_FALIURE,
    DELETE_STUDENT_SUCCESS,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FALIURE,
    CHECK_STUDENT_EMAIL_REQUEST,
    CHECK_STUDENT_EMAIL_SUCCESS,
    CHECK_STUDENT_EMAIL_FALIURE
} from "./actionTypes";

import {
    FetchstudentsDataRequest,
    FetchstudentsDataSuccess,
    FetchstudentsDataFailure,
    PostStudentDataRequest,
    PostStudentDataSuccess,
    PostStudentDataFailure,
    DeletestudentsDataRequest,
    DeletestudentsDataFailure,
    DeletestudentsDataSuccess,
    UpdateStudentRequestType,
    UpdateStudentSuccessType,
    UpdateStudentFailureType,
    CheckEmailRequestType,
    CheckEmailSuccessType,
    CheckEmailFailureType
} from './types'

// GET STUDENT 

export const fetchstudentsDataRequest = (payload:any) : FetchstudentsDataRequest => ({
    type: GET_STUDENT_REQUEST,
    payload
});
export const fetchstudentsDataSuccess = (payload: any ) : FetchstudentsDataSuccess => ({
    type: GET_STUDENT_SUCCESS,
    payload
});
export const fetchstudentsDataFailure = (payload: any) : FetchstudentsDataFailure  => ({
    type: GET_STUDENT_FALIURE,
    payload
    
})

// POST STUDENT 
export const poststudentRequest = (payload: any): PostStudentDataRequest => ({
    type: POST_STUDENT_REQUEST,
    payload
});

export const poststudentSuccess = (payload: any): PostStudentDataSuccess => {
    return {
        type: POST_STUDENT_SUCCESS,
        payload
    }
};

export const poststudentFaliure = (payload: string): PostStudentDataFailure => ({
    type: POST_STUDENT_FALIURE,
    payload
})

// DELETE STUDENT 

export const deletestudentsDataRequest = (payload: string) : DeletestudentsDataRequest => ({
    type: DELETE_STUDENT_REQUEST,
    payload
});
export const deletestudentsDataSuccess = (payload: any ) : DeletestudentsDataSuccess => ({
    type: DELETE_STUDENT_SUCCESS,
    payload
});
export const deletestudentsDataFailure = (payload: any) : DeletestudentsDataFailure  => ({
    type: DELETE_STUDENT_FALIURE,
    payload  
})


// update STUDENT
export const updateStudentRequest = (payload: object): UpdateStudentRequestType => ({
    type: UPDATE_STUDENT_REQUEST,
    payload
});

export const updateStudentSuccess = (payload: any): UpdateStudentSuccessType => ({
    type: UPDATE_STUDENT_SUCCESS,
    payload
});

export const updateStudentFailure = (payload: string): UpdateStudentFailureType => ({
    type: UPDATE_STUDENT_FALIURE,
    payload
})

// check email
export const checkEmailRequest = (payload: object): CheckEmailRequestType => ({
    type: CHECK_STUDENT_EMAIL_REQUEST,
    payload
});

export const checkEmailSuccess = (payload: string): CheckEmailSuccessType => ({
    type: CHECK_STUDENT_EMAIL_SUCCESS,
    payload
});

export const checkEmailFailure = (payload: string): CheckEmailFailureType => ({
    type: CHECK_STUDENT_EMAIL_FALIURE,
    payload
})