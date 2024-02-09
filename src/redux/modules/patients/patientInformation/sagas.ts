import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PATIENTINFORMATION_REQUEST, GET_PATIENTVITAL_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { PATIENTALLINFORMATION, PATIENTVITAL } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchPatientInformationSuccess,
  fetchPatientInformationFailure,
  fetchPatientVitalSuccess,
  fetchPatientVitalFailure
} from "./action";
import {authToken} from "../../../../utils/commonUtil";

export function* getPatientInformationWatcher() {
  yield takeLatest(GET_PATIENTINFORMATION_REQUEST, fetchPatientALLInformationSaga);
}

function* fetchPatientALLInformationSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${PATIENTALLINFORMATION}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchPatientInformationSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchPatientInformationFailure(e.message)
    );
  }
}


export function* getPatientVitalsWatcher() {
  yield takeLatest(GET_PATIENTVITAL_REQUEST, fetchPatientVitalsSaga);
}

function* fetchPatientVitalsSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${PATIENTVITAL}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchPatientVitalSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchPatientVitalFailure(e.message)
    );
  }
}


let exportArr = [getPatientInformationWatcher, getPatientVitalsWatcher ]

export default exportArr;