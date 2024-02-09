import { call, put, takeLatest } from "redux-saga/effects";
import { GET_COURSE_REQUEST  } from "./actionTypes";
import { API_BASE_URL } from "../../../../utils/globalConstants";
import request from "../../../../utils/request";
import {
    fetchcoursesDataSuccess,
    fetchcoursesDataFailure
} from './action'
import { COURSES } from "../../../../utils/constants";
import {authToken} from "../../../../utils/commonUtil";

export function* getcourseWatcher() {
    yield takeLatest(GET_COURSE_REQUEST, fetchDataSaga);
  }

  function* fetchDataSaga(action: any): any {
    const requestURL = `${API_BASE_URL}${COURSES}`;
    let token = authToken();
    const params = {
      method: "GET",
      headers: { "Content-Type": "application/json" , ...(token && {token}) },
    };
    try {
      const res = yield call(request, requestURL, params);
      yield put(
        fetchcoursesDataSuccess(res)
      );
    } catch (e: any) {
      yield put(
        fetchcoursesDataFailure(e.message)
      );
    }
  }
  let exportArr = [getcourseWatcher]

export default exportArr;