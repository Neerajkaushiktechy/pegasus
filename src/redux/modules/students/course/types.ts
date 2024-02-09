import {
    GET_COURSE_REQUEST,
    GET_COURSE_SUCCESS,
    GET_COURSE_FALIURE,
} from "./actionTypes";

// GET Course Data
export interface FetchcoursesDataRequest {
    type: typeof GET_COURSE_REQUEST;
}
export interface FetchcoursesDataSuccess {
    type: typeof GET_COURSE_SUCCESS;
    payload: any;
}
export interface FetchcoursesDataFailure {
    type: typeof GET_COURSE_FALIURE;
    payload: any;
}

export type AuthActions =
    | FetchcoursesDataRequest
    | FetchcoursesDataSuccess
    | FetchcoursesDataFailure