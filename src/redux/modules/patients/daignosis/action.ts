import {
  FETCH_GETDIAGNOSIS_REQUEST,
  FETCH_GETDIAGNOSIS_FALIURE,
  FETCH_GETDIAGNOSIS_SUCCESS,
  POST_GETDIAGNOSIS_FALIURE,
  POST_GETDIAGNOSIS_REQUEST,
  POST_GETDIAGNOSIS_SUCCESS,
  FETCH_MASTERDAIGNOSIS_REQUEST,
  FETCH_MASTERDAIGNOSIS_SUCCESS,
  FETCH_MASTERDAIGNOSIS_FALIURE,
  DELETE_DIAGNOSIS_REQUEST,
  DELETE_DIAGNOSIS_SUCCESS,
  DELETE_DIAGNOSIS_FALIURE,
  UPDATE_DIAGNOSIS_REQUEST,
  UPDATE_DIAGNOSIS_SUCCESS,
  UPDATE_DIAGNOSIS_FALIURE,
  FETCH_DAIGNOSISCLASSES_REQUEST,
  FETCH_DAIGNOSISCLASSES_SUCCESS,
  FETCH_DAIGNOSISCLASSES_FALIURE,
  FETCH_DAIGNOSISDESCRIPTION_REQUEST,
  FETCH_DAIGNOSISDESCRIPTION_SUCCESS,
  FETCH_DAIGNOSISDESCRIPTION_FALIURE,
  EDIT_PAITENT_DIAGNOSIS,
  CHANGE_EDIT_MODE,
  CLEAR_DIALOUGE,
} from "./actionTypes";
import {
  FetchGetDiagnosisRequest,
  FetchGetDiagnosisSuccess,
  FetchGetDiagnosisFailure,
  PostDiagnosisRequest,
  PostDiagnosisSuccess,
  FetchMasterDaignosisRequest,
  FetchMasterDaignosisSuccess,
  FetchMasterDaignosisFailure,
  FetchSuccessPayload,
  FetchFailurePayload,
  PostDiagnosisSuccessPayload,
  PostDiagnosisFailurePayload,
  FetchMasterDaignosisSuccessPayload,
  FetchMasterDaignosisFailurePayload,
  PostDiagnosisFailure,
  DeleteDiagnosisSuccess,
  DeleteDiagnosisRequest,
  DeleteDiagnosisFailure,
  DeleteDiagnosisFailurePayload,
  DeleteDiagnosisSuccessPayload,
  UpdateDiagnosisSuccess,
  UpdateDiagnosisRequest,
  UpdateDiagnosisFailure,
  UpdateDiagnosisSuccessPayload,
  UpdateDiagnosisFailurePayload,
  GetDiagnosisClassesRequest,
  GetDiagnosisClassesSuccess,
  GetDiagnosisClassesFailure,
  GetDiagnosisClassesSuccessPayload,
  GetDiagnosisClassesFailurePayload,
  DiagnosisDescriptionRequest,
  DiagnosisDescriptionSuccess,
  DiagnosisDescriptionFailure,
  DiagnosisDescriptionSuccessPayload,
  DiagnosisDescriptionFailurePayload,
  EditPaitentDiagnosis,
  ChangeEditMode,
} from "./types";

export const clearDialouge = () => ({
  type: CLEAR_DIALOUGE,
});

export const fetchGetDiagnosisRequest = (
  payload: string
): FetchGetDiagnosisRequest => ({
  type: FETCH_GETDIAGNOSIS_REQUEST,
  payload,
});

export const fetchGetDiagnosisSuccess = (
  payload: FetchSuccessPayload
): FetchGetDiagnosisSuccess => ({
  type: FETCH_GETDIAGNOSIS_SUCCESS,
  payload,
});

export const fetchGetDiagnosisFailure = (
  payload: FetchFailurePayload
): FetchGetDiagnosisFailure => ({
  type: FETCH_GETDIAGNOSIS_FALIURE,
  payload,
});

//Master Daignosis

export const fetchMasterDiagnosisRequest = (
  query: string
): FetchMasterDaignosisRequest => ({
  type: FETCH_MASTERDAIGNOSIS_REQUEST,
  value: query,
});

export const fetchMasterDiagnosisSuccess = (
  payload: FetchMasterDaignosisSuccessPayload
): FetchMasterDaignosisSuccess => ({
  type: FETCH_MASTERDAIGNOSIS_SUCCESS,
  payload,
});

export const fetchMasterDiagnosisFailure = (
  payload: FetchMasterDaignosisFailurePayload
): FetchMasterDaignosisFailure => ({
  type: FETCH_MASTERDAIGNOSIS_FALIURE,
  payload,
});

// Post Daignosis
export const postDiagnosisRequest = (payload: any): PostDiagnosisRequest => ({
  type: POST_GETDIAGNOSIS_REQUEST,
  payload,
});

export const postDiagnosisSuccess = (
  payload: PostDiagnosisSuccessPayload
): PostDiagnosisSuccess => ({
  type: POST_GETDIAGNOSIS_SUCCESS,
  payload,
});

export const postDemographiFailure = (
  payload: PostDiagnosisFailurePayload
): PostDiagnosisFailure => ({
  type: POST_GETDIAGNOSIS_FALIURE,
  payload,
});

// Delete Daignosis
export const deleteDiagnosisRequest = (
  payload: any
): DeleteDiagnosisRequest => ({
  type: DELETE_DIAGNOSIS_REQUEST,
  payload,
});

export const deleteDiagnosisSuccess = (
  payload: DeleteDiagnosisSuccessPayload
): DeleteDiagnosisSuccess => ({
  type: DELETE_DIAGNOSIS_SUCCESS,
  payload,
});

export const deleteDemographiFailure = (
  payload: DeleteDiagnosisFailurePayload
): DeleteDiagnosisFailure => ({
  type: DELETE_DIAGNOSIS_FALIURE,
  payload,
});

// Update Daignosis
export const updateDiagnosisRequest = (
  payload: any
): UpdateDiagnosisRequest => ({
  type: UPDATE_DIAGNOSIS_REQUEST,
  payload,
});

export const updateDiagnosisSuccess = (
  payload: UpdateDiagnosisSuccessPayload
): UpdateDiagnosisSuccess => ({
  type: UPDATE_DIAGNOSIS_SUCCESS,
  payload,
});

export const updateDiagnosisFailure = (
  payload: UpdateDiagnosisFailurePayload
): UpdateDiagnosisFailure => ({
  type: UPDATE_DIAGNOSIS_FALIURE,
  payload,
});

//Get Daignosis Classes

export const getDiagnosisClassesRequest = (): GetDiagnosisClassesRequest => ({
  type: FETCH_DAIGNOSISCLASSES_REQUEST,
});

export const getDiagnosisClassesSuccess = (
  payload: GetDiagnosisClassesSuccessPayload
): GetDiagnosisClassesSuccess => ({
  type: FETCH_DAIGNOSISCLASSES_SUCCESS,
  payload,
});

export const getDiagnosisClassesFailure = (
  payload: GetDiagnosisClassesFailurePayload
): GetDiagnosisClassesFailure => ({
  type: FETCH_DAIGNOSISCLASSES_FALIURE,
  payload,
});

//Get Daignosis Description

export const diagnosisDescriptionRequest = (
  payload: any
): DiagnosisDescriptionRequest => ({
  type: FETCH_DAIGNOSISDESCRIPTION_REQUEST,
  payload,
});

export const diagnosisDescriptionSuccess = (
  payload: DiagnosisDescriptionSuccessPayload
): DiagnosisDescriptionSuccess => ({
  type: FETCH_DAIGNOSISDESCRIPTION_SUCCESS,
  payload,
});

export const diagnosisDescriptionFailure = (
  payload: DiagnosisDescriptionFailurePayload
): DiagnosisDescriptionFailure => ({
  type: FETCH_DAIGNOSISDESCRIPTION_FALIURE,
  payload,
});

export const editPaitentDiagnosis = (id: String): EditPaitentDiagnosis => ({
  type: EDIT_PAITENT_DIAGNOSIS,
  id,
});

export const changeEditMode = (payload: boolean): ChangeEditMode => ({
  type: CHANGE_EDIT_MODE,
  payload,
});
