import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ASSESSMENTTOOL_REQUEST, POST_ASSESSMENTTOOL_REQUEST,DELETE_ASSESSMENTTOOL_REQUEST,UPDATE_ASSESSMENTTOOL_REQUEST, GET_ASSESSMENTTYPE_REQUEST , POST_ASSESSMENTTYPE_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { ASSESSMENTTOOL , ASSESSMENTTYPE } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  getDataSuccess,
  getDataFailure,
  postDataSuccess,
  postDataFailure,
  deleteSuccess,
  deleteFailure,
  updateSuccess,
  updateFailure,
  getAssessmentTypDataSuccess,
  getAssessmentTypDataFailure,
  postAssessmentTypDataSuccess,
  postAssessmentTypDataFailure
} from "./action";
import {authToken} from "../../../../utils/commonUtil";

export function* getWatcher() {
  yield takeLatest(GET_ASSESSMENTTOOL_REQUEST, getData);
}

function* getData(action:any): any {
  const requestURL = `${API_BASE_URL}${ASSESSMENTTOOL}?pageNumber=${action.payload.pagenumber}&limit=${action.payload.limit}`;
  let token = authToken();

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
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
  yield takeLatest(POST_ASSESSMENTTOOL_REQUEST, postData);
}

function* postData(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${ASSESSMENTTOOL}`;
  const params = {
    method: "POST",
    body: action.payload,
    ...(token && {headers : {token}})
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
  yield takeLatest(DELETE_ASSESSMENTTOOL_REQUEST, deleteData);
}

function* deleteData(action: any): any {
  const requestURL = `${API_BASE_URL}${ASSESSMENTTOOL}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
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
  yield takeLatest(UPDATE_ASSESSMENTTOOL_REQUEST, updateData);
}

function* updateData(action: any): any {
  const requestURL = `${API_BASE_URL}${ASSESSMENTTOOL}/${action.payload.id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    body: action.payload.data,
    ...(token && {headers : {token}})
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

export function* getAssessmentTypeWatcher() {
  yield takeLatest(GET_ASSESSMENTTYPE_REQUEST, getAssessmentTypeData);
}

function* getAssessmentTypeData(): any {
  const requestURL = `${API_BASE_URL}${ASSESSMENTTYPE}`;
  let token = authToken();

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {

    const res = yield call(request, requestURL, params);
    yield put(
      getAssessmentTypDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      getAssessmentTypDataFailure(e)
    );
  }
}

export function* postAssessmentTypeWatcher() {
  yield takeLatest(POST_ASSESSMENTTYPE_REQUEST, postAssessmentTypeData);
}

function* postAssessmentTypeData(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${ASSESSMENTTYPE}`;
  const params = {
    method: "POST",
    body: action.payload,
    ...(token && {headers : {token}})
  };
  
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postAssessmentTypDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      postAssessmentTypDataFailure(e)
    );
  }
}




let exportArr = [getWatcher, postWatcher, deleteWatcher, updateWatcher , getAssessmentTypeWatcher , postAssessmentTypeWatcher]

export default exportArr;