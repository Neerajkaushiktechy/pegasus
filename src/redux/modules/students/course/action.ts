import {
    GET_COURSE_REQUEST,
    GET_COURSE_SUCCESS,
    GET_COURSE_FALIURE,
} from "./actionTypes";

import {
    FetchcoursesDataRequest,
    FetchcoursesDataSuccess,
    FetchcoursesDataFailure
} from './types'
export const fetchcoursesDataRequest = () : FetchcoursesDataRequest => ({
    type: GET_COURSE_REQUEST,
});
export const fetchcoursesDataSuccess = (payload: any ) : FetchcoursesDataSuccess => ({
    type: GET_COURSE_SUCCESS,
    payload
});
export const fetchcoursesDataFailure = (payload: any) : FetchcoursesDataFailure  => ({
    type: GET_COURSE_FALIURE,
    payload
    
})