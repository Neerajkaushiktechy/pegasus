import { FETCH_USER_REQUEST,FETCH_USER_SUCCESS,FETCH_USER_FALIURE} from "./actionTypes";


export interface userState {
    loading: boolean;
    user: any;
    error: string | null;
}

export interface checkUserType {
    data: string;
}

export interface FetchUserSuccessPayload {
    user: any;
}
  
export interface FetchUserFailurePayload {
    error: string;
}

export interface FetchUserRequest {
    type: typeof FETCH_USER_REQUEST;
    payload: checkUserType;
}
export interface FetchUserSuccess {
    type: typeof FETCH_USER_SUCCESS;
    payload: FetchUserSuccessPayload;
}
export interface FetchUserFailure {
    type: typeof FETCH_USER_FALIURE;
    payload: FetchUserFailurePayload;
}

export type AuthActions =
  | FetchUserRequest
  | FetchUserSuccess
  | FetchUserFailure