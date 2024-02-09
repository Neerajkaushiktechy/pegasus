import { call, put, takeLatest } from "redux-saga/effects";
import { GET_SOCIAL_REQUEST, POST_SOCIAL_REQUEST,DELETE_SOCIAL_REQUEST,UPDATE_SOCIAL_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { SOCIAL_HISTORY } from "../../../../utils/constants";
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
  yield takeLatest(GET_SOCIAL_REQUEST, getData);
}

function* getData(action: any): any {
  const requestURL = `${API_BASE_URL}${SOCIAL_HISTORY}/${action.payload}`;
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
      getDataFailure(e.message)
    );
  }
}

export function* postWatcher() {
  yield takeLatest(POST_SOCIAL_REQUEST, postData);
}

function* postData(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${SOCIAL_HISTORY}`;
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
      postDataFailure(e.message)
    );
  }
}


// DELETE 
export function* deleteWatcher() {
  yield takeLatest(DELETE_SOCIAL_REQUEST, deleteData);
}

function* deleteData(action: any): any {
  const requestURL = `${API_BASE_URL}${SOCIAL_HISTORY}/${action.payload}`;
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
      deleteFailure(e.message)
    );
  }
}



export function* updateWatcher() {
  yield takeLatest(UPDATE_SOCIAL_REQUEST, updateData);
}

function* updateData(action: any): any {
  const requestURL = `${API_BASE_URL}${SOCIAL_HISTORY}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token && {token}) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateFailure(e.message)
    );
  }
}





let exportArr = [getWatcher, postWatcher, deleteWatcher, updateWatcher]

export default exportArr;