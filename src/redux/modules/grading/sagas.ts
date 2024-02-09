import { call, put, takeLatest } from "redux-saga/effects";
import { GET_FORM_DATA_REQUEST,GET_GRADING_REQUEST, POST_GRADING_REQUEST, DELETE_GRADING_REQUEST, UPDATE_GRADING_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../utils/globalConstants";
import { GRADING,GRADING_FORM_DATA } from "../../../utils/constants";
import request from "../../../utils/request";
import {
  getFormDataSuccess,
  getFormDataFailure,
  getDataSuccess,
  getDataFailure,
  postDataSuccess,
  postDataFailure,
  deleteSuccess,
  deleteFailure,
  updateSuccess,
  updateFailure
} from "./action";
import { authToken } from "../../../utils/commonUtil";
import { encrypt } from "../../../utils/encryptDecrypt";


export function* getFormDataWatcher() {
  yield takeLatest(GET_FORM_DATA_REQUEST, getFormData);
}

function* getFormData(action: any): any {
let requestURL = `${API_BASE_URL}${GRADING_FORM_DATA}/?assignmentId=${action.payload.assignmentId}&assignmentType=${action.payload.assignmentType}&studentId=${action.payload.studentId}`
let token = authToken();
const params = {
  method: "GET",
  headers: { "Content-Type": "application/json", ...(token && { token }) },
};
try {

  const res = yield call(request, requestURL, params);
  yield put(
    getFormDataSuccess(res)
  );
} catch (e: any) {
  yield put(
    getFormDataFailure(e)
  );
}
}

export function* getWatcher() {
  yield takeLatest(GET_GRADING_REQUEST, getData);
}

function* getData(action: any): any {
  const requestURL = `${API_BASE_URL}${GRADING}/?searchType=${action.payload.searchType}&searchText=${action.payload.searchText}&pageNumber=${action.payload.pagenumber}&limit=${action.payload.limit}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      getDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      getDataFailure(e)
    );
  }
}

export function* postWatcher() {
  yield takeLatest(POST_GRADING_REQUEST, postData);
}

function* postData(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${GRADING}`;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };

  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      postDataFailure(e)
    );
  }
}


// DELETE 
export function* deleteWatcher() {
  yield takeLatest(DELETE_GRADING_REQUEST, deleteData);
}

function* deleteData(action: any): any {
  const requestURL = `${API_BASE_URL}${GRADING}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };

  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteFailure(e)
    );
  }
}



export function* updateWatcher() {
  yield takeLatest(UPDATE_GRADING_REQUEST, updateData);
}

function* updateData(action: any): any {
  const requestURL = `${API_BASE_URL}${GRADING}/${action.payload.id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload.data)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateFailure(e)
    );
  }
}





let exportArr = [getFormDataWatcher, getWatcher, postWatcher, deleteWatcher, updateWatcher]

export default exportArr;