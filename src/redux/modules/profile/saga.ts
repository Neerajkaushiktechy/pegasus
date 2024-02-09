import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PROFILE_REQUEST, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../utils/globalConstants";
import request from "../../../utils/request";
import {
  fetchprofileDataSuccess,
  fetchprofileDataFailure,
  updateProfiletSuccess,
  updateProfileFailure,
  updatePasswordSuccess,
  updatePasswordFailure
} from './action'
import { encrypt } from "../../../utils/encryptDecrypt";
import { authToken } from "../../../utils/commonUtil";

export function* getProfiletWatcher() {
  yield takeLatest(GET_PROFILE_REQUEST, fetchprofileDataSaga);
}


function* fetchprofileDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}getProfile`;
  let token = authToken();

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchprofileDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchprofileDataFailure(e)
    );
  }
}





export function* updateProfileWatcher() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
}

function* updateProfile(action: any): any {
  const requestURL = `${API_BASE_URL}updateProfile`;
  let token = authToken();
  const params = {
    method: "PUT",
    body: action.payload,
    ...(token && {headers : {token}})
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateProfiletSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateProfileFailure(e)
    );
  }
}

export function* changePasswordWatcher() {
  yield takeLatest(UPDATE_PASSWORD_REQUEST, changePassord);
}

function* changePassord(action: any): any {
  const requestURL = `${API_BASE_URL}change-password`;
  let token = authToken();

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updatePasswordSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updatePasswordFailure(e)
    );
  }
}


let exportArr = [getProfiletWatcher, updateProfileWatcher, changePasswordWatcher]

export default exportArr;