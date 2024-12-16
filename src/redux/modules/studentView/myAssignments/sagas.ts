import { call, put, takeLatest } from "redux-saga/effects";
import { GET_MYASSIGNMENT_REQUEST, GET_MYASSIGNMENTDETAILS_REQUEST, GET_MYASSIGNMENTSTATUS_REQUEST, POST_MYASSIGNMENTSTATUS_REQUEST, UPDATE_MYASSIGNMENTSTATUS_REQUEST, GET_MYCUSTOMASSIGNMENTFORM_REQUEST, GET_MYGRADES_REQUEST, UPDATE_ASSIGNMENTSUBMISSIONDATE_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { MYASSIGNMENT, MYASSIGNMENTDETAIL, MYASSIGNMENTSTATUS, MYCUSTOMASSIGNMENTFORM, MyGRADES, ASSIGNMENTSUBMISSIONDATE } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchMyAssignmentDataSuccess,
  fetchMyAssignmentDataFailure,
  fetchMyAssignmentDetailDataSuccess,
  fetchMyAssignmentDetailDataFailure,
  fetchMyAssignmentStatusDataSuccess,
  fetchMyAssignmentStatusDataFailure,
  postMyAssignmentStatusSuccess,
  postMyAssignmentStatusFaliure,
  updateMyAssignmentStatusSuccess,
  updateMyAssignmentStatusFailure,
  getMyCustomAssignmentFormSuccess,
  getMyCustomAssignmentFormFailure,
  fetchMyGradesDataSuccess,
  fetchMyGradesDataFailure,
  updateAssignmentSubmissionDateSuccess,
  updateAssignmentSubmissionDateFailure

} from "./action";
import { authToken } from "../../../../utils/commonUtil";
import { encrypt } from "../../../../utils/encryptDecrypt";


export function* getMyAssignmentWatcher() {
  yield takeLatest(GET_MYASSIGNMENT_REQUEST, fetchMyAssignmentDataSaga);
}
function* fetchMyAssignmentDataSaga(action: any): any {
  const { studentId } = action.payload;
  const requestURL = `${API_BASE_URL}${MYASSIGNMENT}/${studentId}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchMyAssignmentDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchMyAssignmentDataFailure(e.message)
    );
  }
}

export function* getMyAssignmentDetailWatcher() {
  yield takeLatest(GET_MYASSIGNMENTDETAILS_REQUEST, fetchMyAssignmentDetailDataSaga);
}
function* fetchMyAssignmentDetailDataSaga(action: any): any {
  const { assObj, assId } = action.payload;
  const requestURL = `${API_BASE_URL}${MYASSIGNMENTDETAIL}/${assObj}/${assId}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchMyAssignmentDetailDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchMyAssignmentDetailDataFailure(e.message)
    );
  }
}

export function* getMyAssignmentStatusWatcher() {
  yield takeLatest(GET_MYASSIGNMENTSTATUS_REQUEST, fetchMyAssignmentStatusDataSaga);
}

function* fetchMyAssignmentStatusDataSaga(action: any): any {
  const { statusObj, assObj, studentId } = action.payload
  const requestURL = `${API_BASE_URL}${MYASSIGNMENTSTATUS}/${statusObj}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    if (res.success) {
      let assId = res.data[0].assignmentId
      const requestURL = `${API_BASE_URL}${MYASSIGNMENTDETAIL}/${assObj}/${assId}/${studentId}`;
      let token = authToken();
      const params = {
        method: "GET",
        headers: { "Content-Type": "application/json", ...(token && { token }) },
      };
      try {
        const res = yield call(request, requestURL, params);
        yield put(
          fetchMyAssignmentDetailDataSuccess(res)
        );
      } catch (e: any) {
        yield put(
          fetchMyAssignmentDetailDataFailure(e.message)
        );
      }
    }
    yield put(
      fetchMyAssignmentStatusDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchMyAssignmentStatusDataFailure(e.message)
    );
  }
}

export function* postMyAssignmentStatusWatcher() {
  yield takeLatest(POST_MYASSIGNMENTSTATUS_REQUEST, postMyAssignmentStatusDataSaga);
}

function* postMyAssignmentStatusDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${MYASSIGNMENTSTATUS}`;
  let token = authToken();

  const params = {
    method: "POST",
    ...(token && { headers: { token } }),
    body: action.payload
  };

  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postMyAssignmentStatusSuccess(res)
    );
  } catch (e: any) {
    yield put(
      postMyAssignmentStatusFaliure(e.message)
    );
  }
}

export function* updateMyAssignmentStatusWatcher() {
  yield takeLatest(UPDATE_MYASSIGNMENTSTATUS_REQUEST, updateMyAssignmentStatus);
}

function* updateMyAssignmentStatus(action: any): any {
  debugger
  const id = action.payload.assessmentId
  const body = { status: action.payload.status, submittedTime: action.payload.submittedTime, studentId: action.payload.studentId };
  const requestURL = `${API_BASE_URL}${MYASSIGNMENTSTATUS}/${id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    body: JSON.stringify({ params: encrypt(JSON.stringify(body)) }),
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    debugger
    const res = yield call(request, requestURL, params);
    yield put(
      updateMyAssignmentStatusSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateMyAssignmentStatusFailure(e.message)
    );
  }
}

export function* getMyCustomAssignmentFormWatcher() {
  yield takeLatest(GET_MYCUSTOMASSIGNMENTFORM_REQUEST, fetchMyCustomAssignmentFormDataSaga);
}

function* fetchMyCustomAssignmentFormDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${MYCUSTOMASSIGNMENTFORM}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      getMyCustomAssignmentFormSuccess(res)
    );
  } catch (e: any) {
    yield put(
      getMyCustomAssignmentFormFailure(e.message)
    );
  }
}

export function* getMyGradesWatcher() {
  yield takeLatest(GET_MYGRADES_REQUEST, fetchMyGradesDataSaga);
}
function* fetchMyGradesDataSaga(action: any): any {
  const { studentId } = action.payload
  const requestURL = `${API_BASE_URL}${MyGRADES}/${studentId}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchMyGradesDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchMyGradesDataFailure(e.message)
    );
  }
}

export function* updateAssignmentSubmissionDateWatcher() {
  yield takeLatest(UPDATE_ASSIGNMENTSUBMISSIONDATE_REQUEST, updateAssignmentSubmissionDate);
}

function* updateAssignmentSubmissionDate(action: any): any {
  const id = action.payload.id
  const body = { endDate: action.payload.endDate };
  const requestURL = `${API_BASE_URL}${ASSIGNMENTSUBMISSIONDATE}/${id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    body: JSON.stringify({ params: encrypt(JSON.stringify(body)) }),
    headers: { "Content-Type": "application/json", ...(token && { token }) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateAssignmentSubmissionDateSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateAssignmentSubmissionDateFailure(e.message)
    );
  }
}

let exportArr = [getMyAssignmentWatcher, getMyAssignmentDetailWatcher, getMyAssignmentStatusWatcher, postMyAssignmentStatusWatcher, updateMyAssignmentStatusWatcher, getMyCustomAssignmentFormWatcher, getMyGradesWatcher, updateAssignmentSubmissionDateWatcher]

export default exportArr;