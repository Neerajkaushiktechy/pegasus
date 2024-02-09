import { call, put, takeLatest } from "redux-saga/effects";
import {  GET_DEPARTMENT_REQUEST } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import request from "../../../../utils/request";
import {
    fetchdepartmentsDataSuccess,
    fetchdepartmentsDataFailure
} from './action'
import { DEPARTMENTS } from "../../../../utils/constants";
import {authToken} from "../../../../utils/commonUtil";

export function* getDepartmentWatcher() {
    yield takeLatest(GET_DEPARTMENT_REQUEST, fetchDataSaga);
  }

  function* fetchDataSaga(action: any): any {
    const requestURL = `${API_BASE_URL}${DEPARTMENTS}`;
    let token = authToken();
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json" , ...(token && {token})},
    };
    try {
      const res = yield call(request, requestURL, params);
      yield put(
        fetchdepartmentsDataSuccess(res)
      );
    } catch (e: any) {
      yield put(
        fetchdepartmentsDataFailure(e.message)
      );
    }
  }
  let exportArr = [getDepartmentWatcher]

export default exportArr;