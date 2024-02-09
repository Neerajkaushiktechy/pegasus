import {
    GET_DEPARTMENT_REQUEST,
    GET_DEPARTMENT_SUCCESS,
    GET_DEPARTMENT_FALIURE,
} from "./actionTypes";

import {
    FetchdepartmentsDataRequest,
    FetchdepartmentsDataSuccess,
    FetchdepartmentsDataFailure
} from './types'
export const fetchdepartmentsDataRequest = () : FetchdepartmentsDataRequest => ({
    type: GET_DEPARTMENT_REQUEST,
});
export const fetchdepartmentsDataSuccess = (payload: any ) : FetchdepartmentsDataSuccess => ({
    type: GET_DEPARTMENT_SUCCESS,
    payload
});
export const fetchdepartmentsDataFailure = (payload: any) : FetchdepartmentsDataFailure  => ({
    type: GET_DEPARTMENT_FALIURE,
    payload
    
})