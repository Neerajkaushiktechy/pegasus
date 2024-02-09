import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_LABORATORY_REQUEST, POST_LABORATORY_REQUEST, DELETE_LABORATORY_REQUEST, UPDATE_LABORATORY_REQUEST} from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { GETLABORATORY, POSTLABORATORY, UPDATELABORATORY, DELETELABORATORY} from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchLaboratorySuccess,
  fetchLaboratoryFailure,
  postLaboratorySuccessAction,
  postLaboratoryFailureAction,
  deleteLaboratorySuccess,
  deleteLaboratoryFailure,
  updateLaboratorySuccess,
  updateLaboratoryFailure,
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getLaboratoryWatcher() {
  yield takeLatest(FETCH_LABORATORY_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${GETLABORATORY}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchLaboratorySuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchLaboratoryFailure({
        error: e.message,
      })
    );
  }
}

export function* postLaboratoryWatcher() {
  yield takeLatest(POST_LABORATORY_REQUEST, postData);
}

function* postData(action: any): any {
  const requestURL = `${API_BASE_URL}${POSTLABORATORY}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postLaboratorySuccessAction({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postLaboratoryFailureAction({
        error: e.message,
      })
    );
  }
}

// DELETE Nursing Care Plan
export function* deleteLaboratoryWatcher() {
  yield takeLatest(DELETE_LABORATORY_REQUEST, deleteLaboratory);
}

function* deleteLaboratory(action: any): any {
  const requestURL = `${API_BASE_URL}${DELETELABORATORY}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})}  
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteLaboratorySuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteLaboratoryFailure(e.message)
    );
  }
}

//Update Nursing Care Plan

export function* updateLaboratoryWatcher() {
  yield takeLatest(UPDATE_LABORATORY_REQUEST, updateLaboratory);
}

function* updateLaboratory(action: any): any {
  const requestURL = `${API_BASE_URL}${UPDATELABORATORY}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateLaboratorySuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateLaboratoryFailure(e.message)
    );
  }
}

let exportArr = [getLaboratoryWatcher, postLaboratoryWatcher, deleteLaboratoryWatcher, updateLaboratoryWatcher]

export default exportArr;