import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_PROVIDERNAMES_REQUEST, FETCH_DOCUMENTTYPE_REQUEST,GET_DOCUMENT_REQUEST,POST_DOCUMENT_REQUEST,DELETE_DOCUMENT_REQUEST,UPDATE_DOCUMENT_REQUEST, DOWNLOAD_DOCUMENT_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { DOCUMENT, REFFWENAMES } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchProviderDataSuccess,
  fetchProviderDataFailure,
  fetchDocumentTypesSuccess,
  fetchDocumentTypesFailure,
  fetchDocumentDataSuccess,
  fetchDocumentDataFailure,
  postDocumentSuccess,
  postDocumentFaliure,
  deleteDocumentSuccess,
  deleteDocumentFailure,
  updateDocumentSuccess,
  updateDocumentFailure,
  downloadDocumentRequest,
  downloadDocumentFailure
} from "./action";
import {authToken} from "../../../../utils/commonUtil";


export function* getProviderNameWatcher() {
  yield takeLatest(FETCH_PROVIDERNAMES_REQUEST, fetchProviderNameSaga);
}

function* fetchProviderNameSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${REFFWENAMES}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchProviderDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchProviderDataFailure(e.message)
    );
  }
}

export function* getDocumentTypeWatcher() {
  yield takeLatest(FETCH_DOCUMENTTYPE_REQUEST, fetchDocumentTypeSaga);
}

function* fetchDocumentTypeSaga(action: any): any {
  const requestURL = `${API_BASE_URL}patientDocumentType`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})}
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchDocumentTypesSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchDocumentTypesFailure(e.message)
    );
  }
}
export function* getDocumentWatcher() {
  yield takeLatest(GET_DOCUMENT_REQUEST, fetchDocumentDataSaga);
}

function* fetchDocumentDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${DOCUMENT}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchDocumentDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchDocumentDataFailure(e.message)
    );
  }
}

export function* postDocumentWatcher() {
  yield takeLatest(POST_DOCUMENT_REQUEST, postDocumentSaga);
}

function* postDocumentSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${DOCUMENT}`;
  let token = authToken();

  const params = {
    method: "POST",
    ...(token && {headers : {token}}),
    body: action.payload
  };
  
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postDocumentSuccess(res)
    );
  } catch (e: any) {
    yield put(
      postDocumentFaliure(e.message)
    );
  }
}


// DELETE Document
export function* deleteDocumentWatcher() {
  yield takeLatest(DELETE_DOCUMENT_REQUEST, deleteDocumentSaga);
}

function* deleteDocumentSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${DOCUMENT}/${action.payload}`;
  let token = authToken();
  
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };

  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteDocumentSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteDocumentFailure(e.message)
    );
  }
}

export function* updateDocumentWatcher() {
  yield takeLatest(UPDATE_DOCUMENT_REQUEST, updateDocumentSaga);
}

function* updateDocumentSaga(action: any): any {
  const id = action.payload.get('id')
  const requestURL = `${API_BASE_URL}${DOCUMENT}/${id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    ...(token && {headers : {token}}),
    body: action.payload
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateDocumentSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateDocumentFailure
      (e.message)
    );
  }
}

export function* documentDownloadWatcher() {
  yield takeLatest(DOWNLOAD_DOCUMENT_REQUEST, documentDownloadSaga);
}

function* documentDownloadSaga(action: any): any {
  const requestURL = `${API_BASE_URL}patientDocument/getDocumentFiles/fileName`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      downloadDocumentRequest(res)
    );
  } catch (e: any) {
    yield put(
      downloadDocumentFailure(e.message)
    );
  }
}



let exportArr = [getProviderNameWatcher, getDocumentTypeWatcher, getDocumentWatcher, postDocumentWatcher, deleteDocumentWatcher, updateDocumentWatcher, documentDownloadWatcher]

export default exportArr;