import { all, call, put, takeLatest } from "redux-saga/effects";
import { SIGNUP,SIGNIN, CREATE_PASSWORD } from "../../../utils/constants";
import { encrypt } from "../../../utils/encryptDecrypt";
import { API_BASE_URL  } from "../../../utils/globalConstants";
import { FORGOT_PASSWORD ,SCHOOL ,STUDENT , CHANGE_PASSWORD } from "../../../utils/constants"
import request from "../../../utils/request";
import { fetchSignUpSuccess, fetchSignUpFailure,fetchSignInSuccess,fetchSignINFailure , fetchSchoolSignInSuccess ,fetchSchoolSignINFailure , fetcStudentSignInSuccess , fetcStudentSignINFailure, forgotPasswordSuccess, forgotPasswordFailure, changePasswordSuccess, createPasswordSuccess, createPasswordFailure, changePasswordFailure} from "./actions";
import { FETCH_SIGNUP_REQUEST,FETCH_SIGNIN_REQUEST ,FETCH__SCHOOL_SIGNIN_REQUEST, FETCH__STUDENT_SIGNIN_REQUEST , FORGOT_PASSWORD_REQUEST, CHANGE_PASSWORD_REQUEST, CREATE_PASSWORD_REQUEST } from "./actionTypes";

export function* signUpUserRequestWatcher() {
  yield takeLatest(FETCH_SIGNUP_REQUEST, fetchSignUpSaga);
}
function* fetchSignUpSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${SIGNUP}`;
  const params = {
    method: "POST",
    body: JSON.stringify({params:encrypt(JSON.stringify(action.payload))}),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchSignUpSuccess({
        signUp: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchSignUpFailure({
        error: e.message,
      })
    );
  }
}



export function* signInUserRequestWatcher() {
  yield takeLatest(FETCH_SIGNIN_REQUEST, fetchSignInSaga);
}

function* fetchSignInSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${SIGNIN}`;
  const params = {
    method: "POST",
    body: JSON.stringify({params:encrypt(JSON.stringify(action.payload))}),
    headers: { "Content-Type": "application/json" },
  };
  
  try {
    let res = yield call(request, requestURL, params);
    yield put(
      fetchSignInSuccess({
        signIn: res,
        loginfirstTime: 0
      })
    );
  } catch (e: any) {
    yield put(
      fetchSignINFailure({
        error: e,
      })
    );
  }
}

export function* signInschoolRequestWatcher() {
  yield takeLatest(FETCH__SCHOOL_SIGNIN_REQUEST, fetchSchoolSignInSaga);
}

function* fetchSchoolSignInSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${SCHOOL}/${SIGNIN}`;
  const params = {
    method: "POST",
    body: JSON.stringify({params:encrypt(JSON.stringify(action.payload))}),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchSchoolSignInSuccess({
        signIn: res,
        loginfirstTime: res?.loginfirstTime,
        id : res?.id
      })
    );
  } catch (e: any) {
    yield put(
      fetchSchoolSignINFailure({
        error: e,
      })
    );
  }
}


export function* signInstudentRequestWatcher() {
  yield takeLatest(FETCH__STUDENT_SIGNIN_REQUEST, fetchStudentSignInSaga);
}

function* fetchStudentSignInSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${STUDENT}/${SIGNIN}`;
  const params = {
    method: "POST",
    body: JSON.stringify({params:encrypt(JSON.stringify(action.payload))}),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetcStudentSignInSuccess({
        signIn: res,
        loginfirstTime: res?.loginfirstTime,
        id : res?.id

      })
    );
  } catch (e: any) {
    yield put(
      fetcStudentSignINFailure({
        error: e,
      })
    );
  }
}

export function* forgotPasswordWatcher() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}

function* forgotPasswordSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${FORGOT_PASSWORD}`;
  const params = {
    method: "POST",
    body: JSON.stringify({params:encrypt(JSON.stringify(action.payload))}),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      forgotPasswordSuccess({
        signIn: res,
      })
    );
  } catch (e: any) {
    yield put(
      forgotPasswordFailure({
        error: e,
      })
    );
  }
}


export function* changePasswordWatcher() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, chnagePasswordSaga);
}

function* chnagePasswordSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${CHANGE_PASSWORD}`;
  const params = {
    method: "POST",
    body: JSON.stringify({params:encrypt(JSON.stringify(action.payload))}),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      changePasswordSuccess({
        signIn: res,
      })
    );
  } catch (e: any) {
    yield put(
      changePasswordFailure({
        error: e,
      })
    );
  }
}


export function* createPasswordWatcher() {
  yield takeLatest(CREATE_PASSWORD_REQUEST, createPasswordSaga);
}

function* createPasswordSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${CREATE_PASSWORD}`;
  const params = {
    method: "POST",
    body: JSON.stringify({params:encrypt(JSON.stringify(action.payload))}),
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      createPasswordSuccess({
        signIn: res,
      })
    );
  } catch (e: any) {
    yield put(
      createPasswordFailure({
        error: e,
      })
    );
  }
}
export default [signUpUserRequestWatcher,signInUserRequestWatcher ,signInschoolRequestWatcher ,signInstudentRequestWatcher , forgotPasswordWatcher , changePasswordWatcher , createPasswordWatcher ]