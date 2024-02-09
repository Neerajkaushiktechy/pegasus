import { call, put, takeLatest } from "redux-saga/effects";
import { GET_VITALS_REQUEST, POST_VITALS_REQUEST,DELETE_VITALS_REQUEST,UPDATE_VITALS_REQUEST , GET_OXYGEN_SUPPLY_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { VITALS ,OXYGEN_SUPPLY } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchVitalsDataSuccess,
  fetchVitalsDataFailure,
  postVitalsDataSuccessAction,
  postVitalsDataFailureAction,
  deleteVitalsSuccess,
  deleteVitalsFailure,
  updateVitalsSuccess,
  updateVitalsFailure,
  fetchOxygenSupplyDataSuccess,
  fetchOxygenSupplyDataFailure
} from "./action";
import {authToken} from "../../../../utils/commonUtil";
import { encrypt } from "../../../../utils/encryptDecrypt";

export function* getWatcher() {
  yield takeLatest(GET_VITALS_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${VITALS}/${action.payload}`;
  let token = authToken();

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchVitalsDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchVitalsDataFailure(e.message)
    );
  }
}

export function* postWatcher() {
  yield takeLatest(POST_VITALS_REQUEST, postData);
}

function* postData(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${VITALS}`;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postVitalsDataSuccessAction(res)
    );
  } catch (e: any) {
    yield put(
      postVitalsDataFailureAction(e.message)
    );
  }
}


// DELETE Allergie
export function* deleteWatcher() {
  yield takeLatest(DELETE_VITALS_REQUEST, deleteAllergie);
}

function* deleteAllergie(action: any): any {
  const requestURL = `${API_BASE_URL}${VITALS}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
  };

  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteVitalsSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteVitalsFailure(e.message)
    );
  }
}

export function* updateWatcher() {
  yield takeLatest(UPDATE_VITALS_REQUEST, updateAllergie);
}

function* updateAllergie(action: any): any {
  const requestURL = `${API_BASE_URL}${VITALS}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(token && {token}) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateVitalsSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateVitalsFailure(e.message)
    );
  }
}

export function* getoxgenSupplyWatcher() {
  yield takeLatest(GET_OXYGEN_SUPPLY_REQUEST, fetchOxygensupplyDataSaga);
}

function* fetchOxygensupplyDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${OXYGEN_SUPPLY}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    console.log(res,"res")
    yield put(
      fetchOxygenSupplyDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchOxygenSupplyDataFailure(e.message)
    );
  }
}



let exportArr = [getWatcher, postWatcher, deleteWatcher, updateWatcher , getoxgenSupplyWatcher]

export default exportArr;