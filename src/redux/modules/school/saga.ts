import { call, put, takeLatest } from "redux-saga/effects";
import { POST_SCHOOL_REQUEST, GET_SCHOOL_REQUEST, UPDATE_SCHOOL_REQUEST, DELETE_SCHOOL_REQUEST , CHECK__SCHOOL_EMAIL_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../utils/globalConstants";
import request from "../../../utils/request";
import {
  fetchschoolsDataSuccess,
  fetchschoolsDataFailure,
  postschoolSuccess,
  postschoolFaliure,
  deleteschoolDataSuccess,
  deleteschoolDataFailure,
  updateSchoolFailure,
  updateSchooltSuccess,
  checkEmailSuccess,
  checkEmailFailure
} from './action'
import {  CHECK_EMAIL, SCHOOL } from "../../../utils/constants";
import { encrypt } from "../../../utils/encryptDecrypt";
import {authToken } from "../../../utils/commonUtil";

export function* getSchooltWatcher() {
  yield takeLatest(GET_SCHOOL_REQUEST, fetchschoolDataSaga);
}


function* fetchschoolDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${SCHOOL}`;
  let token = authToken();

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchschoolsDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchschoolsDataFailure(e.message)
    );
  }
}


export function* postSchoolWatcher() {
  yield takeLatest(POST_SCHOOL_REQUEST, postSchoolSaga);
}

function* postSchoolSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${SCHOOL}`;
  let token = authToken();

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postschoolSuccess(res)
    );
  } catch (e: any) {
    yield put(
      postschoolFaliure(e.message)
    );
  }
}
// DELETE School
export function* deleteSchoolWatcher() {
  yield takeLatest(DELETE_SCHOOL_REQUEST, deleteschool);
}


function* deleteschool(action: any): any {
  const requestURL = `${API_BASE_URL}${SCHOOL}/${action.payload}`;
  let token = authToken();

  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteschoolDataSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteschoolDataFailure(e.message)
    );
  }
}

export function* updateSchoolWatcher() {
  yield takeLatest(UPDATE_SCHOOL_REQUEST, updateSchool);
}

function* updateSchool(action: any): any {
  const requestURL = `${API_BASE_URL}${SCHOOL}/${action.payload._id}`;
  let token = authToken();

  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateSchooltSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateSchoolFailure(e.message)
    );
  }
}

// check Email already exists
export function* postemailWatcher() {
  yield takeLatest(CHECK__SCHOOL_EMAIL_REQUEST, postEmailSaga);
}

function* postEmailSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${SCHOOL}/${CHECK_EMAIL}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      checkEmailSuccess(res)
    );
  } catch (e: any) {
    yield put(
      checkEmailFailure(e.status)
    );
  }
}

let exportArr = [getSchooltWatcher, postSchoolWatcher, updateSchoolWatcher , deleteSchoolWatcher,postemailWatcher ]

export default exportArr;