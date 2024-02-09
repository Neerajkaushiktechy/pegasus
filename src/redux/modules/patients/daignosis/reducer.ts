import moment from "moment";
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
import { AuthActions, diagnosisState } from "./types";
import dayjs from "dayjs";
const initialFormData = {
  status: "Active",
  description: "",
  icd10Problem: "",
  startDate: `${dayjs()}`,
  editDate: moment().format("YYYY-MM-DD HH:mm:ss"),
  type: "Acute",
  comment: "",
  domainClass: { name: "", classId: "" },
  pId: "",
};

const initialState: diagnosisState = {
  loading: false,
  data: [],
  error: null,
  options: [],
  optionsLoading: false,
  dataLoading: false,
  daignosisClasses: [],
  daignosisDescriptionList: [],
  daignosisFormData: initialFormData,
  editMode: false,
  editId: "",
  message: "",
};

export function Diagnosis(state = { ...initialState }, action: AuthActions) {
  switch (action.type) {
    case FETCH_GETDIAGNOSIS_REQUEST:
      return {
        ...state,
        dataLoading: true,
      };
    case FETCH_GETDIAGNOSIS_SUCCESS:
      return {
        ...state,
        dataLoading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_GETDIAGNOSIS_FALIURE:
      return {
        ...state,
        dataLoading: false,
        data: [],
        error: action.payload.error,
      };
    case FETCH_MASTERDAIGNOSIS_REQUEST:
      return {
        ...state,
        optionsLoading: true,
      };
    case FETCH_MASTERDAIGNOSIS_SUCCESS:
      return {
        ...state,
        optionsLoading: false,
        options: action.payload.data,
        error: null,
      };
    case FETCH_MASTERDAIGNOSIS_FALIURE:
      return {
        ...state,
        optionsLoading: false,
        options: [],
        error: action.payload.error,
      };
    case POST_GETDIAGNOSIS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_GETDIAGNOSIS_SUCCESS:
      return {
        ...state,
        message: action.payload.data,
        loading: false,
        error: null,
      };
    case POST_GETDIAGNOSIS_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case DELETE_DIAGNOSIS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DIAGNOSIS_SUCCESS:
      return {
        ...state,
        message: action.payload.data,
        loading: false,
        error: null,
      };
    case DELETE_DIAGNOSIS_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case UPDATE_DIAGNOSIS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_DIAGNOSIS_SUCCESS:
      return {
        ...state,
        message: action.payload.data,
        loading: false,
        error: null,
      };
    case UPDATE_DIAGNOSIS_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case FETCH_DAIGNOSISCLASSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DAIGNOSISCLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        daignosisClasses: action.payload.data,
      };
    case FETCH_DAIGNOSISCLASSES_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case FETCH_DAIGNOSISDESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DAIGNOSISDESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        daignosisDescriptionList: action.payload.data[0].list,
      };
    case FETCH_DAIGNOSISDESCRIPTION_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case EDIT_PAITENT_DIAGNOSIS:
      const newFormData = state.data.find(
        (item: any) => item._id === action.id
      );

      return {
        ...state,
        daignosisFormData: {
          ...newFormData,
          startDate: newFormData.startDate
        },
        editId: action.id,
      };
    case CHANGE_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
        editId: action.payload ? state.editId : "",
        daignosisFormData: action.payload
          ? state.daignosisFormData
          : initialFormData,
      };
    case CLEAR_DIALOUGE:
      return { ...state, message: "" };
    default:
      return {
        ...state,
      };
  }
}
