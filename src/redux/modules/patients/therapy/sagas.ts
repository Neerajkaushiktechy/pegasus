import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_THERAPY_REQUEST, POST_THERAPY_REQUEST, DELETE_THERAPY_REQUEST, UPDATE_THERAPY_REQUEST} from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { GETTHERAPY, POSTTHERAPY, UPDATETHERAPY, DELETETHERAPY} from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchTherapySuccess,
  fetchTherapyFailure,
  postTherapySuccessAction,
  postTherapyFailureAction,
  deleteTherapySuccess,
  deleteTherapyFailure,
  updateTherapySuccess,
  updateTherapyFailure,
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getTherapyWatcher() {
  yield takeLatest(FETCH_THERAPY_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${GETTHERAPY}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchTherapySuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchTherapyFailure({
        error: e.message,
      })
    );
  }
}

export function* postTherapyWatcher() {
  yield takeLatest(POST_THERAPY_REQUEST, postData);
}

function* postData(action: any): any {
  const requestURL = `${API_BASE_URL}${POSTTHERAPY}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postTherapySuccessAction({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postTherapyFailureAction({
        error: e.message,
      })
    );
  }
}

// DELETE Nursing Care Plan
export function* deleteTherapyWatcher() {
  yield takeLatest(DELETE_THERAPY_REQUEST, deleteTherapy);
}

function* deleteTherapy(action: any): any {
  const requestURL = `${API_BASE_URL}${DELETETHERAPY}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})}  
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteTherapySuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteTherapyFailure(e.message)
    );
  }
}

//Update Nursing Care Plan

export function* updateTherapyWatcher() {
  yield takeLatest(UPDATE_THERAPY_REQUEST, updateTherapy);
}

function* updateTherapy(action: any): any {
  const requestURL = `${API_BASE_URL}${UPDATETHERAPY}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateTherapySuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateTherapyFailure(e.message)
    );
  }
}

let exportArr = [getTherapyWatcher, postTherapyWatcher, deleteTherapyWatcher, updateTherapyWatcher]

export default exportArr;