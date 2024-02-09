import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_ALLERGY_REQUEST, POST_ALLERGY_REQUEST, GET_ALLERGY_REACTION_REQUEST, GET_ALLERGY_SEVERTIES_REQUEST, DELETE_ALLERGY_REQUEST, UPDATE_ALLERGY_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import { POSTALLERGIES, GETALLERGIES, GETALLERGIES_REACTION, GETALLERGIES_SEVERTIES, DELETE_ALLERGIES_SEVERTIES, UPDATE_ALLERGIES_SEVERTIES } from "../../../../utils/constants";
import request from "../../../../utils/request";
import {
  fetchAllergyDataSuccess,
  fetchAllergyDataFailure,
  postAllergyDataSuccessAction,
  postAllergyDataFailureAction,
  getAllergyReactionSuccess,
  getAllergyReactionFailure,
  getAllergyServertiesSuccess,
  getAllergyServertiesFailure,
  deleteAllergySuccess,
  deleteAllergyFailure,
  updateAllergySuccess,
  updateAllergyFailure
} from "./action";
import { encrypt } from "../../../../utils/encryptDecrypt";
import {authToken} from "../../../../utils/commonUtil";

export function* getWatcher() {
  yield takeLatest(FETCH_ALLERGY_REQUEST, fetchDataSaga);
}

function* fetchDataSaga(action: any): any {
  const requestURL = `${API_BASE_URL}${GETALLERGIES}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      fetchAllergyDataSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      fetchAllergyDataFailure({
        error: e.message,
      })
    );
  }
}

export function* postWatcher() {
  yield takeLatest(POST_ALLERGY_REQUEST, postData);
}

function* postData(action: any): any {
  const requestURL = `${API_BASE_URL}${POSTALLERGIES}`;
  let token = authToken();
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      postAllergyDataSuccessAction({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      postAllergyDataFailureAction({
        error: e.message,
      })
    );
  }
}
export function* getReactionWatcher() {
  yield takeLatest(GET_ALLERGY_REACTION_REQUEST, getReaction);
}

function* getReaction(action: any): any {
  const requestURL = `${API_BASE_URL}${GETALLERGIES_REACTION}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };


  try {
    const res = yield call(request, requestURL, params);
    yield put(
      getAllergyReactionSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      getAllergyReactionFailure({
        error: e.message,
      })
    );
  }
}
export function* getServertiesWatcher() {
  yield takeLatest(GET_ALLERGY_SEVERTIES_REQUEST, getServerties);
}

function* getServerties(action: any): any {
  const requestURL = `${API_BASE_URL}${GETALLERGIES_SEVERTIES}`;
  let token = authToken();
  const params = {
    method: "GET",
    headers: { "Content-Type": "application/json",...(token && {token})},
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      getAllergyServertiesSuccess({
        data: res,
      })
    );
  } catch (e: any) {
    yield put(
      getAllergyServertiesFailure({
        error: e.message,
      })
    );
  }
}

// DELETE Allergie
export function* deleteAllergiesWatcher() {
  yield takeLatest(DELETE_ALLERGY_REQUEST, deleteAllergie);
}

function* deleteAllergie(action: any): any {
  const requestURL = `${API_BASE_URL}${DELETE_ALLERGIES_SEVERTIES}/${action.payload}`;
  let token = authToken();
  const params = {
    method: "DELETE",
    headers: { "Content-Type": "application/json",...(token && {token})}  
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      deleteAllergySuccess(res)
    );

  } catch (e: any) {
    yield put(
      deleteAllergyFailure(e.message)
    );
  }
}

export function* updateAllergiesWatcher() {
  yield takeLatest(UPDATE_ALLERGY_REQUEST, updateAllergie);
}

function* updateAllergie(action: any): any {
  const requestURL = `${API_BASE_URL}${UPDATE_ALLERGIES_SEVERTIES}/${action.payload._id}`;
  let token = authToken();
  const params = {
    method: "PUT",
    headers: { "Content-Type": "application/json",...(token && {token})},
    body: JSON.stringify({ params: encrypt(JSON.stringify(action.payload)) }),
  };
  try {
    const res = yield call(request, requestURL, params);
    yield put(
      updateAllergySuccess(res)
    );
  } catch (e: any) {
    yield put(
      updateAllergyFailure(e.message)
    );
  }
}


let exportArr = [getWatcher, postWatcher, getReactionWatcher, getServertiesWatcher, deleteAllergiesWatcher, updateAllergiesWatcher]

export default exportArr;