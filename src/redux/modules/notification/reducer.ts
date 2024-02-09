
import {
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FALIURE,
  APPEND_NOTIFICATION,
  UPDATE_NOTIFICATION_REQUEST,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FALIURE,

} from "./actionTypes";
import { AuthActions } from "./types";

const initialState = {
  loading: false,
  data : [] ,
  notificationData : [],
  error: null,
};

export function getNotification(state = initialState , action: AuthActions) {
  switch (action.type) {
    case GET_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notificationData: action.payload.data,
        error: null,
      };
    case APPEND_NOTIFICATION:
      let notification ;
      if(action.notificationType === "update"){
        let updateNotification : any = [...state.notificationData]
        for(let i = 0 ; i < state.notificationData.length ; i++){
          updateNotification[i].read = 1
        }
        notification = updateNotification
      }
      else if(action.notificationType === "append") {
        notification = [action.payload , ...state.notificationData]
      }
      

      return {
        ...state,
        loading: false,
        notificationData: notification,
        error: null,
      };
    case GET_NOTIFICATION_FALIURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};




export function updateNotificationData(state =  initialState , action: AuthActions) {
  switch (action.type) {
    case UPDATE_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_NOTIFICATION_FALIURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

