import { call, put, takeLatest } from "redux-saga/effects";
import moment from "moment";
import {
  FETCH_GETDIAGNOSIS_REQUEST,
  POST_GETDIAGNOSIS_REQUEST,
  FETCH_MASTERDAIGNOSIS_REQUEST,
  DELETE_DIAGNOSIS_REQUEST,
  FETCH_DAIGNOSISCLASSES_REQUEST,
  FETCH_DAIGNOSISDESCRIPTION_REQUEST,
  UPDATE_DIAGNOSIS_REQUEST,
} from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { DIAGNOSIS, DAIGNOSISMASTER } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchGetDiagnosisSuccess,
  fetchGetDiagnosisFailure,
  postDiagnosisSuccess,
  postDemographiFailure,
  fetchMasterDiagnosisSuccess,
  fetchMasterDiagnosisFailure,
  deleteDiagnosisSuccess,
  deleteDemographiFailure,
  fetchGetDiagnosisRequest,
  getDiagnosisClassesSuccess,
  getDiagnosisClassesFailure,
  diagnosisDescriptionSuccess,
  diagnosisDescriptionFailure,
  updateDiagnosisSuccess,
  updateDiagnosisFailure,
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* diagnosisWatcher() {
  yield takeLatest(FETCH_GETDIAGNOSIS_REQUEST, fetchDiagnosisSaga);
  yield takeLatest(FETCH_MASTERDAIGNOSIS_REQUEST, fetchMasterDiagnosisSaga);
  yield takeLatest(POST_GETDIAGNOSIS_REQUEST, postDiagnosisSaga);
  yield takeLatest(DELETE_DIAGNOSIS_REQUEST, deleteDaignosis);
  yield takeLatest(FETCH_DAIGNOSISCLASSES_REQUEST, fetchDiagnosisClassesSaga);
  yield takeLatest(
    FETCH_DAIGNOSISDESCRIPTION_REQUEST,
    diagnosisDescriptionClassesSaga
  );
  yield takeLatest(UPDATE_DIAGNOSIS_REQUEST, updateDaignosis);
}

function* fetchDiagnosisSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${DIAGNOSIS}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    const formattedData = res.data.map((item: any) => ({
      ...item,
      editDate: moment.utc(item.updatedAt).local().format("MM/DD/YYYY hh:mm A"),
    }));
    yield put(
      fetchGetDiagnosisSuccess({
        data: formattedData,
      })
    );
  } catch (e: any) {
    yield put(
      fetchGetDiagnosisFailure({
        error: e.message,
      })
    );
  }
}

function* fetchMasterDiagnosisSaga(action: any): any {
  const query = action.value;
  const requestURL = `${API_BASE_URL}${DIAGNOSIS}/${DAIGNOSISMASTER}/${query}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchMasterDiagnosisSuccess({
        data: res.data,
      })
    );
  } catch (e: any) {
    yield put(
      fetchMasterDiagnosisFailure({
        error: e.message,
      })
    );
  }
}

function* postDiagnosisSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${DIAGNOSIS}`;
  const body = {
    ...action.payload,
  };
  let token = authToken();
  const params = {
    method: "POST",
    body: JSON.stringify({ params: encrypt(JSON.stringify(body)) }),
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postDiagnosisSuccess({
        data: res.message,
      })
    );
  } catch (e: any) {
    yield put(
      postDemographiFailure({
        error: e.message,
      })
    );
  }
}

function* deleteDaignosis(action: any): any {
  const id = action.payload.id;
  const pId = action.payload.pId;

  const requestURL = `${API_BASE_URL}${DIAGNOSIS}/${id}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteDiagnosisSuccess({
        data: res.message,
      })
    );
    yield put(fetchGetDiagnosisRequest(pId));
  } catch (e: any) {
    yield put(
      deleteDemographiFailure({
        error: e.message,
      })
    );
  }
}

function* updateDaignosis(action: any): any {
  const id = action.payload.editId;
  const body = { formData: action.payload.formData, pId: action.payload.pId };
  const requestURL = `${API_BASE_URL}${DIAGNOSIS}/${id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    body: JSON.stringify({ params: encrypt(JSON.stringify(body)) }),
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateDiagnosisSuccess({
        data: res.message,
      })
    );
  } catch (e: any) {
    yield put(
      updateDiagnosisFailure({
        error: e.message,
      })
    );
  }
}

function* fetchDiagnosisClassesSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${DIAGNOSIS}/domainClasses`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      getDiagnosisClassesSuccess({
        data: res.data,
      })
    );
  } catch (e: any) {
    yield put(
      getDiagnosisClassesFailure({
        error: e.message,
      })
    );
  }
}

function* diagnosisDescriptionClassesSaga(action: any): any {
  const id = action.payload;
  const requestURL = `${API_BASE_URL}${DIAGNOSIS}/daignosisDescription/${id}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json" , ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      diagnosisDescriptionSuccess({
        data: res.data,
      })
    );
  } catch (e: any) {
    yield put(
      diagnosisDescriptionFailure({
        error: e.message,
      })
    );
  }
}

export default diagnosisWatcher;
