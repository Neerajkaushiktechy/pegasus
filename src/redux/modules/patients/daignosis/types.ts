import { clearDialouge } from "./action";
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

export interface userState {
  loading: boolean;
  data: any;
  error: string | null;
}
export interface diagnosisState {
  loading: boolean;
  data: any;
  error: string | null;
  options: any;
  optionsLoading: boolean;
  dataLoading: boolean;
  daignosisClasses: any;
  daignosisDescriptionList: any;
  daignosisFormData: {
    status: String;
    description: String;
    icd10Problem: String;
    startDate: String;
    editDate: String;
    type: String;
    comment: String;
    domainClass: { name: String; classId: String };
  };
  editMode: boolean;
  editId: String;
  message: "";
}
export interface clearDialouge {
  type: typeof CLEAR_DIALOUGE;
}

export interface FetchSuccessPayload {
  data: any;
}
export interface FetchFailurePayload {
  error: string;
}
export interface FetchGetDiagnosisRequest {
  type: typeof FETCH_GETDIAGNOSIS_REQUEST;
  payload: string;
}
export interface FetchGetDiagnosisSuccess {
  type: typeof FETCH_GETDIAGNOSIS_SUCCESS;
  payload: FetchSuccessPayload;
}
export interface FetchGetDiagnosisFailure {
  type: typeof FETCH_GETDIAGNOSIS_FALIURE;
  payload: FetchFailurePayload;
}

//GET DAIGNOSIS
export interface FetchMasterDaignosisSuccessPayload {
  data: any;
}
export interface FetchMasterDaignosisFailurePayload {
  error: string;
}
export interface FetchMasterDaignosisRequest {
  type: typeof FETCH_MASTERDAIGNOSIS_REQUEST;
  value: string;
}
export interface FetchMasterDaignosisSuccess {
  type: typeof FETCH_MASTERDAIGNOSIS_SUCCESS;
  payload: FetchMasterDaignosisSuccessPayload;
}
export interface FetchMasterDaignosisFailure {
  type: typeof FETCH_MASTERDAIGNOSIS_FALIURE;
  payload: FetchMasterDaignosisFailurePayload;
}

// POST DAIGNOSIS

export interface PostDiagnosisSuccessPayload {
  data: any;
}
export interface PostDiagnosisFailurePayload {
  error: string;
}

export interface PostDiagnosisRequest {
  type: typeof POST_GETDIAGNOSIS_REQUEST;
  payload: any;
}
export interface PostDiagnosisSuccess {
  type: typeof POST_GETDIAGNOSIS_SUCCESS;
  payload: PostDiagnosisSuccessPayload;
}
export interface PostDiagnosisFailure {
  type: typeof POST_GETDIAGNOSIS_FALIURE;
  payload: PostDiagnosisFailurePayload;
}

// DELETE DAIGNOSIS
export interface DeleteDiagnosisSuccessPayload {
  data: any;
}
export interface DeleteDiagnosisFailurePayload {
  error: string;
}

export interface DeleteDiagnosisRequest {
  type: typeof DELETE_DIAGNOSIS_REQUEST;
  payload: any;
}
export interface DeleteDiagnosisSuccess {
  type: typeof DELETE_DIAGNOSIS_SUCCESS;
  payload: DeleteDiagnosisSuccessPayload;
}
export interface DeleteDiagnosisFailure {
  type: typeof DELETE_DIAGNOSIS_FALIURE;
  payload: DeleteDiagnosisFailurePayload;
}

// UPDATE DAIGNOSIS
export interface UpdateDiagnosisSuccessPayload {
  data: any;
}
export interface UpdateDiagnosisFailurePayload {
  error: string;
}

export interface UpdateDiagnosisRequest {
  type: typeof UPDATE_DIAGNOSIS_REQUEST;
  payload: any;
}
export interface UpdateDiagnosisSuccess {
  type: typeof UPDATE_DIAGNOSIS_SUCCESS;
  payload: UpdateDiagnosisSuccessPayload;
}
export interface UpdateDiagnosisFailure {
  type: typeof UPDATE_DIAGNOSIS_FALIURE;
  payload: UpdateDiagnosisFailurePayload;
}

// GET DAIGNOSIS CLASSES
export interface GetDiagnosisClassesSuccessPayload {
  data: any;
}
export interface GetDiagnosisClassesFailurePayload {
  error: string;
}

export interface GetDiagnosisClassesRequest {
  type: typeof FETCH_DAIGNOSISCLASSES_REQUEST;
}
export interface GetDiagnosisClassesSuccess {
  type: typeof FETCH_DAIGNOSISCLASSES_SUCCESS;
  payload: GetDiagnosisClassesSuccessPayload;
}
export interface GetDiagnosisClassesFailure {
  type: typeof FETCH_DAIGNOSISCLASSES_FALIURE;
  payload: GetDiagnosisClassesFailurePayload;
}

// GET DAIGNOSIS DESCRIPTION
export interface DiagnosisDescriptionSuccessPayload {
  data: any;
}
export interface DiagnosisDescriptionFailurePayload {
  error: string;
}

export interface DiagnosisDescriptionRequest {
  type: typeof FETCH_DAIGNOSISDESCRIPTION_REQUEST;
  payload: any;
}
export interface DiagnosisDescriptionSuccess {
  type: typeof FETCH_DAIGNOSISDESCRIPTION_SUCCESS;
  payload: DiagnosisDescriptionSuccessPayload;
}
export interface DiagnosisDescriptionFailure {
  type: typeof FETCH_DAIGNOSISDESCRIPTION_FALIURE;
  payload: DiagnosisDescriptionFailurePayload;
}

export interface EditPaitentDiagnosis {
  type: typeof EDIT_PAITENT_DIAGNOSIS;
  id: String;
}
export interface ChangeEditMode {
  type: typeof CHANGE_EDIT_MODE;
  payload: boolean;
}

export type AuthActions =
  | FetchGetDiagnosisRequest
  | FetchGetDiagnosisSuccess
  | FetchGetDiagnosisFailure
  | PostDiagnosisRequest
  | PostDiagnosisSuccess
  | PostDiagnosisFailure
  | FetchMasterDaignosisRequest
  | FetchMasterDaignosisSuccess
  | FetchMasterDaignosisFailure
  | DeleteDiagnosisRequest
  | DeleteDiagnosisSuccess
  | DeleteDiagnosisFailure
  | UpdateDiagnosisRequest
  | UpdateDiagnosisSuccess
  | UpdateDiagnosisFailure
  | GetDiagnosisClassesRequest
  | GetDiagnosisClassesSuccess
  | GetDiagnosisClassesFailure
  | DiagnosisDescriptionRequest
  | DiagnosisDescriptionSuccess
  | DiagnosisDescriptionFailure
  | EditPaitentDiagnosis
  | ChangeEditMode
  | clearDialouge;
