import {
    POST_QUICK_GUIDE_REQUEST,
    POST_QUICK_GUIDE_SUCCESS,
    POST_QUICK_GUIDE_FALIURE,
    GET_QUICK_GUIDE_REQUEST,
    GET_QUICK_GUIDE_SUCCESS,
    GET_QUICK_GUIDE_FALIURE,
    DELETE_QUICK_GUIDE_REQUEST,
    DELETE_QUICK_GUIDE_FALIURE,
    DELETE_QUICK_GUIDE_SUCCESS,
    UPDATE_QUICK_GUIDE_REQUEST,
    UPDATE_QUICK_GUIDE_SUCCESS,
    UPDATE_QUICK_GUIDE_FALIURE,
} from "./actionTypes";

// GET QuickGuide
export interface FetchQuickGuideDataRequest {
    type: typeof GET_QUICK_GUIDE_REQUEST;
}
export interface FetchQuickGuideDataSuccess {
    type: typeof GET_QUICK_GUIDE_SUCCESS;
    payload: any;
}
export interface FetchQuickGuideDataFailure {
    type: typeof GET_QUICK_GUIDE_FALIURE;
    payload: any;
}


// POST QuickGuide
export interface PostQuickGuideDataRequest {
    type: typeof POST_QUICK_GUIDE_REQUEST;
    payload: any,
    formData : any
}
export interface PostQuickGuideDataSuccess {
    type: typeof POST_QUICK_GUIDE_SUCCESS;
    payload: any;
}
export interface PostQuickGuideataFailure {
    type: typeof POST_QUICK_GUIDE_FALIURE;
    payload: string;
}

// DELETE School
export interface DeletequickGuideDataRequest {
    type: typeof DELETE_QUICK_GUIDE_REQUEST;
    payload: string;
}
export interface DeletequickGuideDataSuccess {
    type: typeof DELETE_QUICK_GUIDE_SUCCESS;
    payload: any;
}
export interface DeletequickGuideDataFailure {
    type: typeof DELETE_QUICK_GUIDE_FALIURE;
    payload: any;
}

// UPDATE QuickGuide
export interface UpdatequickGuideRequestType {
    type: typeof UPDATE_QUICK_GUIDE_REQUEST,
    payload: object;
    id : string;

}
export interface UpdatequickGuideSuccessType {
    type: typeof UPDATE_QUICK_GUIDE_SUCCESS;
    payload: any;
}
export interface UpdatequickGuideFailureType {
    type: typeof UPDATE_QUICK_GUIDE_FALIURE;
    payload: string;
}

export type AuthActions =
    | FetchQuickGuideDataRequest
    | FetchQuickGuideDataSuccess
    | FetchQuickGuideDataFailure
    | PostQuickGuideDataRequest
    | PostQuickGuideDataSuccess
    | PostQuickGuideataFailure
    | DeletequickGuideDataRequest
    | DeletequickGuideDataSuccess
    | DeletequickGuideDataFailure
    | UpdatequickGuideRequestType
    | UpdatequickGuideSuccessType
    | UpdatequickGuideFailureType