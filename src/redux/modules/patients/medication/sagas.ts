import { call, put, takeLatest } from "redux-saga/effects";
import { GET_MEDECATION_FORM_DATA_REQUEST, GET_MEDICATION_REQUEST, POST_MEDICATION_REQUEST, DELETE_MEDICATION_REQUEST, UPDATE_MEDICATION_REQUEST,POST_CUSTOMMEDICATIONROUTE_REQUEST, GET_MEDICATIONMEDICINE_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { MEDICATION,MEDICATION_FORM_DATA,CUSTOMMASTERDATA, MEDICATIONMEDICINE } from "../../../../utils/constants";
import request from "../../../../utils/request";
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
  updateFailure,
  postCustomMedicationRouteSuccess,
  postCustomMedicationRouteFailure,
  getMedicationMedicineSuccess,
  getMedicationMedicineFailure
} from "./action";
import { authToken } from "../../../../utils/commonUtil";
import { encrypt } from "../../../../utils/encryptDecrypt";


export function* getFormDataWatcher() {
  yield takeLatest(GET_MEDECATION_FORM_DATA_REQUEST, getFormData);
}

function* getFormData(action: any): any {
  let requestURL = `${API_BASE_URL}${MEDICATION_FORM_DATA}`
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
  yield takeLatest(GET_MEDICATION_REQUEST, getData);
}

function* getData(action: any): any {
  const requestURL = `${API_BASE_URL}${MEDICATION}/${action.payload}`;
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
  yield takeLatest(POST_MEDICATION_REQUEST, postData);
}

function* postData(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${MEDICATION}`;
  const params = {
    method: "POST",
    body: action.payload,
    ...(token && { headers: { token } })
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
  yield takeLatest(DELETE_MEDICATION_REQUEST, deleteData);
}

function* deleteData(action: any): any {
  const requestURL = `${API_BASE_URL}${MEDICATION}/${action.payload}`;
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
  yield takeLatest(UPDATE_MEDICATION_REQUEST, updateData);
}

function* updateData(action: any): any {
  const requestURL = `${API_BASE_URL}${MEDICATION}/${action.payload.id}`;
  let token = authToken();

  const params = {
    method: "PUT",
    body: action.payload.data,
    ...(token && { headers: { token } })
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

export function* postCustomMedicationRouteWatcher() {
  yield takeLatest(POST_CUSTOMMEDICATIONROUTE_REQUEST, postCustomMedicationRoute);
}

function* postCustomMedicationRoute(action: any): any {
  let token = authToken();
  const requestURL = `${API_BASE_URL}${CUSTOMMASTERDATA}`;
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };

  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postCustomMedicationRouteSuccess(res)
    );
  } catch (e: any) {
    yield put(
      postCustomMedicationRouteFailure(e)
    );
  }
}

export function* getMedicationMedicineWatcher() {
  yield takeLatest(GET_MEDICATIONMEDICINE_REQUEST, getMedicationMedicine);
}

function* getMedicationMedicine(action: any): any {
  const requestURL = `${API_BASE_URL}${MEDICATIONMEDICINE}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      getMedicationMedicineSuccess(res)
    );

  } catch (e: any) {
    yield put(
      getMedicationMedicineFailure(e)
    );
  }
}



let exportArr = [getFormDataWatcher, getWatcher, postWatcher, deleteWatcher, updateWatcher, postCustomMedicationRouteWatcher, getMedicationMedicineWatcher]

export default exportArr;