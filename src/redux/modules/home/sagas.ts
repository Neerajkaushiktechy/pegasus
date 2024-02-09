import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_USER_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../utils/globalConstants";
import { GETUSER } from "../../../utils/constants";
import request from "../../../utils/request";
import { fetchUserFailure, fetchUserSuccess } from "./action";

export function* userRequestWatcher() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
}

function* fetchUserSaga(action:any):any {
    const requestURL = `${API_BASE_URL}${GETUSER}`;
    const params = {
      method: "POST",
      body: JSON.stringify({params:action.payload}),
      headers: { "Content-Type": "application/json" },
    };
    try {
        const res = yield call(request, requestURL, params);
        yield put(
            fetchUserSuccess({
            user : res,
          })
        );
      } catch (e:any) {
        yield put(
            fetchUserFailure({
            error: e.message,
          })
        );
      } 
}

let exportArr = [userRequestWatcher] 

export default exportArr;
