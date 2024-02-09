import {
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FALIURE,
    UPDATE_NOTIFICATION_REQUEST,
    UPDATE_NOTIFICATION_SUCCESS,
    UPDATE_NOTIFICATION_FALIURE,
    APPEND_NOTIFICATION
} from "./actionTypes";

import {
    FetchNotificationDataRequest,
    FetchNotificatioDatSuccess,
    FetchNotificatioDatFailure,
    UpdateNotificationRequestType,
    UpdateNotificationSuccessType,
    UpdateNotificationFailureType,
    AppendNotificatioData
} from './types'

// GET Notification 

export const fetchnotificationDataRequest = () : FetchNotificationDataRequest => ({
    type: GET_NOTIFICATION_REQUEST,
});
export const fetchnotificationDataSuccess = (payload: any ) : FetchNotificatioDatSuccess => ({
    type: GET_NOTIFICATION_SUCCESS,
    payload
});
export const fetchnotificationDataFailure = (payload: any) : FetchNotificatioDatFailure  => ({
    type: GET_NOTIFICATION_FALIURE,
    payload
    
})
export const appendnotification = (payload: any , notificationType : string) : AppendNotificatioData  => ({
    type: APPEND_NOTIFICATION,
    payload,
    notificationType
})




// update Profile
export const updateNotificationRequest = (): UpdateNotificationRequestType => ({
    type: UPDATE_NOTIFICATION_REQUEST
});

export const updateNotificationtSuccess = (payload: any): UpdateNotificationSuccessType => ({
    type: UPDATE_NOTIFICATION_SUCCESS,
    payload
});

export const updateNotificationFailure = (payload: string): UpdateNotificationFailureType => ({
    type: UPDATE_NOTIFICATION_FALIURE,
    payload
})



