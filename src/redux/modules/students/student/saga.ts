import { call, put, takeLatest } from "redux-saga/effects";
import { POST_STUDENT_REQUEST, GET_STUDENT_REQUEST, DELETE_STUDENT_REQUEST, UPDATE_STUDENT_REQUEST, CHECK_STUDENT_EMAIL_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import request from "../../../../utils/request";
import {
  fetchstudentsDataSuccess,
  fetchstudentsDataFailure,
  poststudentSuccess,
  poststudentFaliure,
  deletestudentsDataSuccess,
  deletestudentsDataFailure,
  updateStudentSuccess,
  updateStudentFailure,
  checkEmailSuccess,
  checkEmailFailure
} from './action'
import { STUDENT , CHECK_EMAIL } from "../../../../utils/constants";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getStudenttWatcher() {
  yield takeLatest(GET_STUDENT_REQUEST, fetchDataSaga);
}


function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${STUDENT}?&pageNumber=${action.payload.pagenumber}&limit=${action.payload.limit}`;
  let token = authToken();

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchstudentsDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchstudentsDataFailure(e.message)
    );
  }
}


export function* postStudentWatcher() {
  yield takeLatest(POST_STUDENT_REQUEST, postStudenSaga);
}

function* postStudenSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${STUDENT}`;
  let token = authToken();

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      poststudentSuccess(res)
    );
  } catch (e: any) {
    yield put(
      poststudentFaliure(e.message)
    );
  }
}
// DELETE Student
export function* deleteStudentWatcher() {
  yield takeLatest(DELETE_STUDENT_REQUEST, deletestudent);
}


function* deletestudent(action: any): any {
  const requestURL = `${API_BASE_URL}${STUDENT}/${action.payload}`;
  let token = authToken();

  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deletestudentsDataSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deletestudentsDataFailure(e.message)
    );
  }
}

export function* updateStudentsWatcher() {
  yield takeLatest(UPDATE_STUDENT_REQUEST, updateStudent);
}

function* updateStudent(action: any): any {
  const requestURL = `${API_BASE_URL}${STUDENT}/${action.payload._id}`;
  let token = authToken();

  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateStudentSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateStudentFailure(e.message)
    );
  }
}

// check Email already exists
export function* postemailWatcher() {
  yield takeLatest(CHECK_STUDENT_EMAIL_REQUEST, postEmailSaga);
}

function* postEmailSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${STUDENT}/${CHECK_EMAIL}`;
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

let exportArr = [getStudenttWatcher, postStudentWatcher, updateStudentsWatcher , deleteStudentWatcher ,postemailWatcher]

export default exportArr;