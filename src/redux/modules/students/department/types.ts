import {
    GET_DEPARTMENT_REQUEST,
    GET_DEPARTMENT_SUCCESS,
    GET_DEPARTMENT_FALIURE,
} from "./actionTypes";

// GET Department Data
export interface FetchdepartmentsDataRequest {
    type: typeof GET_DEPARTMENT_REQUEST;
}
export interface FetchdepartmentsDataSuccess {
    type: typeof GET_DEPARTMENT_SUCCESS;
    payload: any;
}
export interface FetchdepartmentsDataFailure {
    type: typeof GET_DEPARTMENT_FALIURE;
    payload: any;
}

export type AuthActions =
    | FetchdepartmentsDataRequest
    | FetchdepartmentsDataSuccess
    | FetchdepartmentsDataFailure