import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ASSESSMENTGROUP_REQUEST, POST_ASSESSMENTGROUP_REQUEST,DELETE_ASSESSMENTGROUP_REQUEST,UPDATE_ASSESSMENTGROUP_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { ASSESSMENTGROUP } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  getDataSuccess,
  getDataFailure,
  postDataSuccess,
  postDataFailure,
  deleteSuccess,
  deleteFailure,
  updateSuccess,
  updateFailure
} from "./action";
import {authToken} from "../../../../utils/commonUtil";
import { encrypt } from "../../../../utils/encryptDecrypt";

export function* getWatcher() {
  yield takeLatest(GET_ASSESSMENTGROUP_REQUEST, getData);
}

function* getData(): any {
  const requestURL = `${API_BASE_URL}${ASSESSMENTGROUP}`;
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
  yield takeLatest(POST_ASSESSMENTGROUP_REQUEST, postData);
}

function* postData(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${ASSESSMENTGROUP}`;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
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
  yield takeLatest(DELETE_ASSESSMENTGROUP_REQUEST, deleteData);
}

function* deleteData(action: any): any {
  const requestURL = `${API_BASE_URL}${ASSESSMENTGROUP}/${action.payload}`;
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
  yield takeLatest(UPDATE_ASSESSMENTGROUP_REQUEST, updateData);
}

function* updateData(action: any): any {
  const requestURL = `${API_BASE_URL}${ASSESSMENTGROUP}/${action.payload.id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token && {token}) },
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





let exportArr = [getWatcher, postWatcher, deleteWatcher, updateWatcher]

export default exportArr;