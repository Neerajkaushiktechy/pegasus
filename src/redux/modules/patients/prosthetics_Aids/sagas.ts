import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_PROSTHETICSAIDS_REQUEST, POST_PROSTHETICSAIDS_REQUEST, DELETE_PROSTHETICSAIDS_REQUEST, UPDATE_PROSTHETICSAIDS_REQUEST} from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { GETPROSTHETICSAIDS, POSTPROSTHETICSAIDS, UPDATEPROSTHETICSAIDS, DELETEPROSTHETICSAIDS} from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchProsthetics_AidsSuccess,
  fetchProsthetics_AidsFailure,
  postProsthetics_AidsSuccessAction,
  postProsthetics_AidsFailureAction,
  deleteProsthetics_AidsSuccess,
  deleteProsthetics_AidsFailure,
  updateProsthetics_AidsSuccess,
  updateProsthetics_AidsFailure,
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getProsthetics_AidsWatcher() {
  yield takeLatest(FETCH_PROSTHETICSAIDS_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${GETPROSTHETICSAIDS}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchProsthetics_AidsSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchProsthetics_AidsFailure({
        error: e.message,
      })
    );
  }
}

export function* postProsthetics_AidsWatcher() {
  yield takeLatest(POST_PROSTHETICSAIDS_REQUEST, postData);
}

function* postData(action: any): any {
  const requestURL = `${API_BASE_URL}${POSTPROSTHETICSAIDS}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postProsthetics_AidsSuccessAction({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postProsthetics_AidsFailureAction({
        error: e.message,
      })
    );
  }
}

// DELETE Nursing Care Plan
export function* deleteProsthetics_AidsWatcher() {
  yield takeLatest(DELETE_PROSTHETICSAIDS_REQUEST, deleteProsthetics_Aids);
}

function* deleteProsthetics_Aids(action: any): any {
  const requestURL = `${API_BASE_URL}${DELETEPROSTHETICSAIDS}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})}  
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteProsthetics_AidsSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteProsthetics_AidsFailure(e.message)
    );
  }
}

//Update Nursing Care Plan

export function* updateProsthetics_AidsWatcher() {
  yield takeLatest(UPDATE_PROSTHETICSAIDS_REQUEST, updateProsthetics_Aids);
}

function* updateProsthetics_Aids(action: any): any {
  const requestURL = `${API_BASE_URL}${UPDATEPROSTHETICSAIDS}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateProsthetics_AidsSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateProsthetics_AidsFailure(e.message)
    );
  }
}

let exportArr = [getProsthetics_AidsWatcher, postProsthetics_AidsWatcher, deleteProsthetics_AidsWatcher, updateProsthetics_AidsWatcher]

export default exportArr;