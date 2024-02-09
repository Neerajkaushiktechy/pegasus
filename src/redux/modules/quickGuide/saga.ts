import { call, put, takeLatest } from "redux-saga/effects";
import { POST_QUICK_GUIDE_REQUEST, GET_QUICK_GUIDE_REQUEST, UPDATE_QUICK_GUIDE_REQUEST, DELETE_QUICK_GUIDE_REQUEST  } from "./actionTypes";
import { API_BASE_URL } from "../../../utils/globalConstants";
import request from "../../../utils/request";
import {
  fetchQuickGuideDataSuccess,
  fetchQuickGuideDataFailure,
  postquickGuideSuccess,
  postquickGuideFaliure,
  deletequickGuideDataSuccess,
  deletequickGuideDataFailure,
  updatequickGuidetSuccess,
  updatequickGuideFailure,
} from './action'
import {  QUICKGUIDE } from "../../../utils/constants";
import {authToken } from "../../../utils/commonUtil";
import { updateQuickGuidAttachement } from "../../../utils/api";
import { encrypt } from "../../../utils/encryptDecrypt";

export function* getQuickguidetWatcher() {
  yield takeLatest(GET_QUICK_GUIDE_REQUEST, fetchQuickguideDataSaga);
}


function* fetchQuickguideDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${QUICKGUIDE}`;
  let token = authToken();

  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(token && {token}) },
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchQuickGuideDataSuccess(res)
    );
  } catch (e: any) {
    yield put(
      fetchQuickGuideDataFailure(e.message)
    );
  }
}


export function* postQuickguideWatcher() {
  yield takeLatest(POST_QUICK_GUIDE_REQUEST, postQuickguideSaga);
}

 function* postQuickguideSaga(action: any ): any {
  const requestURL = `${API_BASE_URL}${QUICKGUIDE}`;
  let token = authToken();
  //delete action.payload.document
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postquickGuideSuccess(res)
    );
    
     updateQuickGuidAttachement(action.formData , res?.data?._id)
  } catch (e: any) {
    yield put(
      postquickGuideFaliure(e.message)
    );
  }
}
// DELETE School
export function* deleteQuickguideSagaWatcher() {
  yield takeLatest(DELETE_QUICK_GUIDE_REQUEST, deleteQuickguideSaga);
}


function* deleteQuickguideSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${QUICKGUIDE}/${action.payload}`;
  let token = authToken();

  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" , ...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deletequickGuideDataSuccess(res)
    );

  } catch (e: any) {
    yield put(
      deletequickGuideDataFailure(e.message)
    );
  }
}

export function* updateQuickguideWatcher() {
  yield takeLatest(UPDATE_QUICK_GUIDE_REQUEST, updateQuickguide);
}

function* updateQuickguide(action: any): any {
  console.log(action,'')
  const requestURL = `${API_BASE_URL}${QUICKGUIDE}/${action.id}`;
  let token = authToken();

  const params = {
    method: "PUT",
    body: action.payload,
    ...(token && {headers : {token}})
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updatequickGuidetSuccess(res)
    );
  } catch (e: any) {
    yield put(
      updatequickGuideFailure(e.message)
    );
  }
}


let exportArr = [getQuickguidetWatcher, postQuickguideWatcher, updateQuickguideWatcher , deleteQuickguideSagaWatcher ]

export default exportArr;