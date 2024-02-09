import { FETCH_USER_REQUEST,FETCH_USER_SUCCESS,FETCH_USER_FALIURE } from "./actionTypes";
import { 
    checkUserType,FetchUserRequest,
    FetchUserSuccessPayload,FetchUserSuccess,
    FetchUserFailurePayload,FetchUserFailure
} from "./types";


export const fetchUserRequest = (payload : checkUserType) :FetchUserRequest =>({
    type : FETCH_USER_REQUEST,
    payload
});

export const fetchUserSuccess = (payload : FetchUserSuccessPayload) : FetchUserSuccess=>({
    type : FETCH_USER_SUCCESS,
    payload
});

export const fetchUserFailure = (payload : FetchUserFailurePayload):FetchUserFailure =>({
    type : FETCH_USER_FALIURE,
    payload
})