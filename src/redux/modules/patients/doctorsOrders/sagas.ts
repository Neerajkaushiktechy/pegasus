import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_DOCTORORDER_REQUEST, POST_DOCTORORDER_REQUEST, DELETE_DOCTORORDER_REQUEST, UPDATE_DOCTORORDER_REQUEST} from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { GETDOCTORORDER, POSTDOCTORORDER, UPDATEDOCTORORDER, DELETEDOCTORORDER} from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchDoctorsOrdersSuccess,
  fetchDoctorsOrdersFailure,
  postDoctorsOrdersSuccessAction,
  postDoctorsOrdersFailureAction,
  deleteDoctorsOrdersSuccess,
  deleteDoctorsOrdersFailure,
  updateDoctorsOrdersSuccess,
  updateDoctorsOrdersFailure,
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getDoctorsOrdersWatcher() {
  yield takeLatest(FETCH_DOCTORORDER_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${GETDOCTORORDER}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchDoctorsOrdersSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchDoctorsOrdersFailure({
        error: e.message,
      })
    );
  }
}

export function* postDoctorsOrdersWatcher() {
  yield takeLatest(POST_DOCTORORDER_REQUEST, postData);
}

function* postData(action: any): any {
  const requestURL = `${API_BASE_URL}${POSTDOCTORORDER}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postDoctorsOrdersSuccessAction({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postDoctorsOrdersFailureAction({
        error: e.message,
      })
    );
  }
}

// DELETE Nursing Care Plan
export function* deleteDoctorsOrdersWatcher() {
  yield takeLatest(DELETE_DOCTORORDER_REQUEST, deleteDoctorsOrders);
}

function* deleteDoctorsOrders(action: any): any {
  const requestURL = `${API_BASE_URL}${DELETEDOCTORORDER}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})}  
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteDoctorsOrdersSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteDoctorsOrdersFailure(e.message)
    );
  }
}

//Update Nursing Care Plan

export function* updateDoctorsOrdersWatcher() {
  yield takeLatest(UPDATE_DOCTORORDER_REQUEST, updateDoctorsOrders);
}

function* updateDoctorsOrders(action: any): any {
  const requestURL = `${API_BASE_URL}${UPDATEDOCTORORDER}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateDoctorsOrdersSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateDoctorsOrdersFailure(e.message)
    );
  }
}

let exportArr = [getDoctorsOrdersWatcher, postDoctorsOrdersWatcher, deleteDoctorsOrdersWatcher, updateDoctorsOrdersWatcher]

export default exportArr;