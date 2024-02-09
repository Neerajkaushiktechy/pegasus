import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_NURSINGCAREPLAN_REQUEST, POST_NURSINGCAREPLAN_REQUEST, DELETE_NURSINGCAREPLAN_REQUEST, UPDATE_NURSINGCAREPLAN_REQUEST} from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { GETNURSINGCAREPLAN, POSTNURSINGCAREPLAN, UPDATENURSINGCAREPLAN, DELETENURSINGCAREPLAN} from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchNursingCarePlanSuccess,
  fetchNursingCarePlanFailure,
  postNursingCarePlanSuccessAction,
  postNursingCarePlanFailureAction,
  deleteNursingCarePlanSuccess,
  deleteNursingCarePlanFailure,
  updateNursingCarePlanSuccess,
  updateNursingCarePlanFailure,
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getNursingCarePlanWatcher() {
  yield takeLatest(FETCH_NURSINGCAREPLAN_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${GETNURSINGCAREPLAN}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchNursingCarePlanSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchNursingCarePlanFailure({
        error: e.message,
      })
    );
  }
}

export function* postNursingCarePlanWatcher() {
  yield takeLatest(POST_NURSINGCAREPLAN_REQUEST, postData);
}

function* postData(action: any): any {
  const requestURL = `${API_BASE_URL}${POSTNURSINGCAREPLAN}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postNursingCarePlanSuccessAction({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postNursingCarePlanFailureAction({
        error: e.message,
      })
    );
  }
}

// DELETE Nursing Care Plan
export function* deleteNursingCarePlanWatcher() {
  yield takeLatest(DELETE_NURSINGCAREPLAN_REQUEST, deleteNursingCarePlan);
}

function* deleteNursingCarePlan(action: any): any {
  const requestURL = `${API_BASE_URL}${DELETENURSINGCAREPLAN}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})}  
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteNursingCarePlanSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteNursingCarePlanFailure(e.message)
    );
  }
}

//Update Nursing Care Plan

export function* updateNursingCarePlanWatcher() {
  yield takeLatest(UPDATE_NURSINGCAREPLAN_REQUEST, updateNursingCarePlan);
}

function* updateNursingCarePlan(action: any): any {
  const requestURL = `${API_BASE_URL}${UPDATENURSINGCAREPLAN}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateNursingCarePlanSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateNursingCarePlanFailure(e.message)
    );
  }
}

let exportArr = [getNursingCarePlanWatcher, postNursingCarePlanWatcher, deleteNursingCarePlanWatcher, updateNursingCarePlanWatcher]

export default exportArr;