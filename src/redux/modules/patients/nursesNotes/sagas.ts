import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_NURSESNOTES_REQUEST, POST_NURSESNOTES_REQUEST, DELETE_NURSESNOTES_REQUEST, UPDATE_NURSESNOTES_REQUEST} from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { GETNURSESNOTES, POSTNURSESNOTES, UPDATENURSESNOTES, DELETENURSESNOTES} from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchNursesNotesSuccess,
  fetchNursesNotesFailure,
  postNursesNotesSuccessAction,
  postNursesNotesFailureAction,
  deleteNursesNotesSuccess,
  deleteNursesNotesFailure,
  updateNursesNotesSuccess,
  updateNursesNotesFailure,
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getNursesNotesWatcher() {
  yield takeLatest(FETCH_NURSESNOTES_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${GETNURSESNOTES}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchNursesNotesSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchNursesNotesFailure({
        error: e.message,
      })
    );
  }
}

export function* postNursesNotesWatcher() {
  yield takeLatest(POST_NURSESNOTES_REQUEST, postData);
}

function* postData(action: any): any {
  const requestURL = `${API_BASE_URL}${POSTNURSESNOTES}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postNursesNotesSuccessAction({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postNursesNotesFailureAction({
        error: e.message,
      })
    );
  }
}

// DELETE Nursing Care Plan
export function* deleteNursesNotesWatcher() {
  yield takeLatest(DELETE_NURSESNOTES_REQUEST, deleteNursesNotes);
}

function* deleteNursesNotes(action: any): any {
  const requestURL = `${API_BASE_URL}${DELETENURSESNOTES}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})}  
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteNursesNotesSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteNursesNotesFailure(e.message)
    );
  }
}

//Update Nursing Care Plan

export function* updateNursesNotesWatcher() {
  yield takeLatest(UPDATE_NURSESNOTES_REQUEST, updateNursesNotes);
}

function* updateNursesNotes(action: any): any {
  const requestURL = `${API_BASE_URL}${UPDATENURSESNOTES}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateNursesNotesSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateNursesNotesFailure(e.message)
    );
  }
}

let exportArr = [getNursesNotesWatcher, postNursesNotesWatcher, deleteNursesNotesWatcher, updateNursesNotesWatcher]

export default exportArr;