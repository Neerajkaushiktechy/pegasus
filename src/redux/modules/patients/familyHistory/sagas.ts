import { call, put, takeLatest } from "redux-saga/effects";
import { GET_FAMILY_REQUEST, POST_FAMILY_REQUEST,DELETE_FAMILY_REQUEST,UPDATE_FAMILY_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { FAMILY_HISTORY , FAMILY_HISTORY_TYPE } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchFamilyDataSuccess,
  fetchFamilyDataFailure,
  postFamilyDataSuccessAction,
  postFamilyDataFailureAction,
  deleteFamilySuccess,
  deleteFamilyFailure,
  updateFamilySuccess,
  updateFamilyFailure,
  fetchfamilyHistoryTypeDataSuccess,
  fetchfamilyHistoryTypeDataFailure
} from "./action";


import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";


export function* getWatcher() {
  yield takeLatest(GET_FAMILY_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${FAMILY_HISTORY}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchFamilyDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchFamilyDataFailure(e.message)
    );
  }
}

export function* postWatcher() {
  yield takeLatest(POST_FAMILY_REQUEST, postData);
}

function* postData(action: any): any {

  const requestURL = `${API_BASE_URL}${FAMILY_HISTORY}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postFamilyDataSuccessAction(res)
    );
  } catch (e: any) {
    yield put(
      postFamilyDataFailureAction(e.message)
    );
  }
}


// DELETE Allergie
export function* deleteWatcher() {
  yield takeLatest(DELETE_FAMILY_REQUEST, deleteAllergie);
}

function* deleteAllergie(action: any): any {
  const requestURL = `${API_BASE_URL}${FAMILY_HISTORY}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };

  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteFamilySuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteFamilyFailure(e.message)
    );
  }
}

export function* updateWatcher() {
  yield takeLatest(UPDATE_FAMILY_REQUEST, updateAllergie);
}

function* updateAllergie(action: any): any {
  const requestURL = `${API_BASE_URL}${FAMILY_HISTORY}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateFamilySuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateFamilyFailure(e.message)
    );
  }
}


export function* getFamilyHistoryType() {
  yield takeLatest(GET_FAMILY_REQUEST, fetchFamilyHistoryDataSaga);
}

function* fetchFamilyHistoryDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${FAMILY_HISTORY_TYPE}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchfamilyHistoryTypeDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchfamilyHistoryTypeDataFailure(e)
    );
  }
}


let exportArr = [getWatcher, postWatcher, deleteWatcher, updateWatcher , getFamilyHistoryType]

export default exportArr;