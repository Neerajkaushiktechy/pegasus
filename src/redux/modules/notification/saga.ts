import { call, put, takeLatest } from "redux-saga/effects";
import { GET_NOTIFICATION_REQUEST, UPDATE_NOTIFICATION_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../utils/globalConstants";
import request from "../../../utils/request";
import {
  fetchnotificationDataSuccess,
  fetchnotificationDataFailure,
  updateNotificationtSuccess,
  updateNotificationFailure,
} from './action'
import { encrypt } from "../../../utils/encryptDecrypt";
import { authToken } from "../../../utils/commonUtil";
import { NOTIFICATION } from "../../../utils/constants";

export function* getNotificationtWatcher() {
  yield takeLatest(GET_NOTIFICATION_REQUEST, fetchnotificationDataSaga);
}


function* fetchnotificationDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${NOTIFICATION}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchnotificationDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchnotificationDataFailure(e)
    );
  }
}





export function* updateNotificationWatcher() {
  yield takeLatest(UPDATE_NOTIFICATION_REQUEST, updateNotification);
}

function* updateNotification(action: any): any {
  const requestURL = `${API_BASE_URL}${NOTIFICATION}`;
  let token = authToken();
  const params = {
    method: "PUT",
    ...(token && {headers : {token}})
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateNotificationtSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateNotificationFailure(e)
    );
  }
}



let exportArr = [getNotificationtWatcher, updateNotificationWatcher]

export default exportArr;