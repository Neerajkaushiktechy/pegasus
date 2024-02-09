import { call, put, takeLatest } from "redux-saga/effects";
import { CHECK_EMAIL_REQUEST, DELETE_DEMOGRAPHIC_REQUEST, FETCH_REFFERNAMES_REQUEST, GET_DEMOGRAPHIC_REQUEST, POST_DEMOGRAPHIC_REQUEST, UPDATE_DEMOGRAPHIC_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { REFFWENAMES, DEMOGRAPHIC, CHECK_EMAIL } from "../../../../utils/constants";
import request from "../../../../utils/request";
import { fetchRefferNameFailure, fetchRefferNameSuccess, postDemographicSuccess, postDemographicFailure, deleteDemographicSuccess, deleteDemographicFailure, updateDemographicFailure, updateDemographicSuccess, getDemographicSuccess, getDemographicFailure, checkEmailSuccess, checkEmailFailure } from "./action";
import {authToken} from "../../../../utils/commonUtil";
import { encrypt } from "../../../../utils/encryptDecrypt";


export function* userRequestWatcher() {
  yield takeLatest(FETCH_REFFERNAMES_REQUEST, fetchUserSaga);
}

function* fetchUserSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${REFFWENAMES}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchRefferNameSuccess({
        refferNames: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchRefferNameFailure({
        error: e.message,
      })
    );
  }
}

export function* postDemographicWatcher() {
  yield takeLatest(POST_DEMOGRAPHIC_REQUEST, postDemographic);
}
function* postDemographic(action: any): any {
  const requestURL = `${API_BASE_URL}${DEMOGRAPHIC}`;
  let token = authToken();
  const params = {
    method: "POST",
    body: action.payload,
    ...(token && {headers : {token}})
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postDemographicSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postDemographicFailure({
        error: e,
      })
    );
  }
}
export function* getDemographicWatcher() {
  yield takeLatest(GET_DEMOGRAPHIC_REQUEST, getDemographic);
}
function* getDemographic(action: any): any {
  let requestURL = `${API_BASE_URL}${DEMOGRAPHIC}/?limit=${action.payload.limit}&skip=${action.payload.skip}&search=${action.payload.search}&searchType=${action.payload.searchType}`;
  if(action.payload.id){
    requestURL = `${API_BASE_URL}${DEMOGRAPHIC}/${action.payload.id}`
  }
  let token = authToken();
  const params = {
    method: "GET",
    ...(token && {headers : {token}})
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      getDemographicSuccess(res)
    );
  } catch (e: any) {
    yield put(
      getDemographicFailure(e.message)
    );
  }
}
export function* updateDemographicWatcher() {
  yield takeLatest(UPDATE_DEMOGRAPHIC_REQUEST, updateDemographic);
}
function* updateDemographic(action: any): any {
  const requestURL = `${API_BASE_URL}${DEMOGRAPHIC}/${action.payload.id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    body: action.payload.data,
    ...(token && {headers : {token}})
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateDemographicSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateDemographicFailure({error:e})
    );
  }
}
export function* deleteDemographicWatcher() {
  yield takeLatest(DELETE_DEMOGRAPHIC_REQUEST, deleteDemographic);
}
function* deleteDemographic(action: any): any {
  const requestURL = `${API_BASE_URL}${DEMOGRAPHIC}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    ...(token && {headers : {token}})
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteDemographicSuccess(res)
    );
  } catch (e: any) {
    yield put(
      deleteDemographicFailure(e.message)
    );
  }
}

// check Email already exists
export function* postemailWatcher() {
  yield takeLatest(CHECK_EMAIL_REQUEST, postEmailSaga);
}

function* postEmailSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${CHECK_EMAIL}`;
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
let exportArr = [userRequestWatcher, postDemographicWatcher, getDemographicWatcher, updateDemographicWatcher, deleteDemographicWatcher , postemailWatcher]

export default exportArr;
