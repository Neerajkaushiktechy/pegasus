import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_CUSTOM_FORM_REQUEST, SUBMIT_CUSTOM_FORM_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../utils/globalConstants";
import request from "../../../utils/request";
import {
  postcustomFormRequestSuccess,
  postcustomFormRequestFaliure,
  submitcustomFormRequestSuccess,
  submitcustomFormRequestFaliure
} from './action'
import { CUSTOM_FORM, SUBMITCUSTOMFORM } from "../../../utils/constants";
import { authToken } from "../../../utils/commonUtil";
import { encrypt } from "../../../utils/encryptDecrypt";

export function* postCustomFormWatcher() {
  yield takeLatest(CREATE_CUSTOM_FORM_REQUEST, postCustomFormSaga);
}

function* postCustomFormSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${CUSTOM_FORM}`;
  let token = authToken();

  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postcustomFormRequestSuccess(res)
    );
  } catch (e: any) {
    yield put(
      postcustomFormRequestFaliure(e)
    );
  }
}

export function* submitCustomFormWatcher() {
  yield takeLatest(SUBMIT_CUSTOM_FORM_REQUEST, submitCustomFormSaga);
}

function* submitCustomFormSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${SUBMITCUSTOMFORM}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(token && { token }) },
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      submitcustomFormRequestSuccess(res)
    );
  } catch (e: any) {
    yield put(
      submitcustomFormRequestFaliure(e)
    );
  }
}

let exportArr = [postCustomFormWatcher, submitCustomFormWatcher]

export default exportArr;