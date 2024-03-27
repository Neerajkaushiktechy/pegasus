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
    CHECK_SCHOOL_EMAIL_SUCCESS,
    CHECK__USERID_REQUEST,
    CHECK_USERID_SUCCESS,
    CHECK__USERID_FALIURE
} from "./actionTypes";

import {
    FetchschoolsDataRequest,
    FetchschoolsDataSuccess,
    FetchschoolsDataFailure,
    PostSchoolDataRequest,
    PostSchoolDataSuccess,
    PostSchoolDataFailure,
    DeleteschoolDataRequest,
    DeleteschoolDataSuccess,
    DeleteschoolDataFailure,
    UpdateSchoolRequestType,
    UpdateSchoolSuccessType,
    UpdateSchoolFailureType,
    CheckEmailRequestType,
    CheckEmailSuccessType,
    CheckEmailFailureType,
    CheckUserIdRequestType,
    CheckUserIdSuccessType,
    CheckUserIdFailureType
} from './types'

// GET SCHOOL 

export const fetchschoolsDataRequest = () : FetchschoolsDataRequest => ({
    type: GET_SCHOOL_REQUEST,
});
export const fetchschoolsDataSuccess = (payload: any ) : FetchschoolsDataSuccess => ({
    type: GET_SCHOOL_SUCCESS,
    payload
});
export const fetchschoolsDataFailure = (payload: any) : FetchschoolsDataFailure  => ({
    type: GET_SCHOOL_FALIURE,
    payload
    
})

// POST School 
export const postschoolRequest = (payload: any): PostSchoolDataRequest => ({
    type: POST_SCHOOL_REQUEST,
    payload
});

export const postschoolSuccess = (payload: any): PostSchoolDataSuccess => {
    return {
        type: POST_SCHOOL_SUCCESS,
        payload
    }
};

export const postschoolFaliure = (payload: string): PostSchoolDataFailure => ({
    type: POST_SCHOOL_FALIURE,
    payload
})

// DELETE SChool

export const deleteschoolDataRequest = (payload: string) : DeleteschoolDataRequest => ({
    type: DELETE_SCHOOL_REQUEST,
    payload
});
export const deleteschoolDataSuccess = (payload: any ) : DeleteschoolDataSuccess => ({
    type: DELETE_SCHOOL_SUCCESS,
    payload
});
export const deleteschoolDataFailure = (payload: any) : DeleteschoolDataFailure  => ({
    type: DELETE_SCHOOL_FALIURE,
    payload  
})


// update SCHOOL
export const updateSchoolRequest = (payload: object): UpdateSchoolRequestType => ({
    type: UPDATE_SCHOOL_REQUEST,
    payload
});

export const updateSchooltSuccess = (payload: any): UpdateSchoolSuccessType => ({
    type: UPDATE_SCHOOL_SUCCESS,
    payload
});

export const updateSchoolFailure = (payload: string): UpdateSchoolFailureType => ({
    type: UPDATE_SCHOOL_FALIURE,
    payload
})

// check email
export const checkEmailRequest = (payload: object): CheckEmailRequestType => ({
    type:CHECK__SCHOOL_EMAIL_REQUEST,
    payload
});

export const checkEmailSuccess = (payload: string): CheckEmailSuccessType => ({
    type: CHECK_SCHOOL_EMAIL_SUCCESS,
    payload
});

export const checkEmailFailure = (payload: string): CheckEmailFailureType => ({
    type: CHECK__SCHOOL_EMAIL_FALIURE,
    payload
})

// check userId
export const checkUserIdRequest = (payload: object): CheckUserIdRequestType => ({
    type: CHECK__USERID_REQUEST,
    payload
});

export const checkUserIdSuccess = (payload: string): CheckUserIdSuccessType => ({
    type: CHECK_USERID_SUCCESS,
    payload
});

export const checkUserIdFailure = (payload: string): CheckUserIdFailureType => ({
    type: CHECK__USERID_FALIURE,
    payload
})