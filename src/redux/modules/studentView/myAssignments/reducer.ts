import {
  GET_MYASSIGNMENT_REQUEST,
  GET_MYASSIGNMENT_SUCCESS,
  GET_MYASSIGNMENT_FALIURE,
  GET_MYASSIGNMENTDETAILS_REQUEST,
  GET_MYASSIGNMENTDETAILS_SUCCESS,
  GET_MYASSIGNMENTDETAILS_FALIURE,
  GET_MYASSIGNMENTSTATUS_REQUEST,
  GET_MYASSIGNMENTSTATUS_SUCCESS,
  GET_MYASSIGNMENTSTATUS_FALIURE,
  POST_MYASSIGNMENTSTATUS_REQUEST,
  POST_MYASSIGNMENTSTATUS_SUCCESS,
  POST_MYASSIGNMENTSTATUS_FALIURE,
  UPDATE_MYASSIGNMENTSTATUS_REQUEST,
  UPDATE_MYASSIGNMENTSTATUS_SUCCESS,
  UPDATE_MYASSIGNMENTSTATUS_FALIURE,
  GET_MYCUSTOMASSIGNMENTFORM_REQUEST,
  GET_MYCUSTOMASSIGNMENTFORM_SUCCESS,
  GET_MYCUSTOMASSIGNMENTFORM_FALIURE,
  GET_MYGRADES_REQUEST,
  GET_MYGRADES_SUCCESS,
  GET_MYGRADES_FALIURE,
  UPDATE_ASSIGNMENTSUBMISSIONDATE_REQUEST,
  UPDATE_ASSIGNMENTSUBMISSIONDATE_SUCCESS,
  UPDATE_ASSIGNMENTSUBMISSIONDATE_FALIURE
} from "./actionTypes";
import { AuthActions } from "./types";


const initialState = {
  loading: false,
  data: [],
  error: null,
};


export function getMyAssignmentData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MYASSIGNMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MYASSIGNMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MYASSIGNMENT_FALIURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export function getMyAssignmentDetailData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MYASSIGNMENTDETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MYASSIGNMENTDETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MYASSIGNMENTDETAILS_FALIURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export function getMyAssignmentStatusData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MYASSIGNMENTSTATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MYASSIGNMENTSTATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MYASSIGNMENTSTATUS_FALIURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export function postMyAssignmentStatusData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case POST_MYASSIGNMENTSTATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_MYASSIGNMENTSTATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case POST_MYASSIGNMENTSTATUS_FALIURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export function updateMyAssignmentStatus(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_MYASSIGNMENTSTATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_MYASSIGNMENTSTATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_MYASSIGNMENTSTATUS_FALIURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};


export function getMyCustomAssignmentForm(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MYCUSTOMASSIGNMENTFORM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MYCUSTOMASSIGNMENTFORM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MYCUSTOMASSIGNMENTFORM_FALIURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export function getMyGradesData(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case GET_MYGRADES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MYGRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GET_MYGRADES_FALIURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export function updateAssignmentSubmissionDate(state = { initialState }, action: AuthActions) {
  switch (action.type) {
    case UPDATE_ASSIGNMENTSUBMISSIONDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ASSIGNMENTSUBMISSIONDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case UPDATE_ASSIGNMENTSUBMISSIONDATE_FALIURE:
      return {
        ...state,
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};