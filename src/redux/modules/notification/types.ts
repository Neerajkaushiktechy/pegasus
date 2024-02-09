import {
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FALIURE,
    UPDATE_NOTIFICATION_REQUEST,
    UPDATE_NOTIFICATION_SUCCESS,
    UPDATE_NOTIFICATION_FALIURE,
    APPEND_NOTIFICATION
} from "./actionTypes";

// GET Notification
export interface FetchNotificationDataRequest {
    type: typeof GET_NOTIFICATION_REQUEST;
}
export interface  FetchNotificatioDatSuccess {
    type: typeof GET_NOTIFICATION_SUCCESS;
    payload: any;
}
export interface  FetchNotificatioDatFailure {
    type: typeof GET_NOTIFICATION_FALIURE;
    payload: any;
}

export interface  AppendNotificatioData {
    type: typeof APPEND_NOTIFICATION;
    payload: any;
    notificationType : any
}


// UPDATE profile
export interface UpdateNotificationRequestType {
    type: typeof UPDATE_NOTIFICATION_REQUEST

}
export interface UpdateNotificationSuccessType {
    type: typeof UPDATE_NOTIFICATION_SUCCESS;
    payload: any;
}
export interface UpdateNotificationFailureType {
    type: typeof UPDATE_NOTIFICATION_FALIURE;
    payload: string;
}


export type AuthActions =
    | FetchNotificationDataRequest
    | FetchNotificatioDatSuccess
    | FetchNotificatioDatFailure
    | AppendNotificatioData
    | UpdateNotificationRequestType
    | UpdateNotificationSuccessType
    | UpdateNotificationFailureType