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
} from "./actionTypes"


// GET MyAssignment 
export interface FetchMyAssignmentDataRequest {
    type: typeof GET_MYASSIGNMENT_REQUEST;
    payload: any;
}
export interface FetchMyAssignmentDataSuccess {
    type: typeof GET_MYASSIGNMENT_SUCCESS;
    payload: any;
}
export interface FetchMyAssignmentDataFailure {
    type: typeof GET_MYASSIGNMENT_FALIURE;
    payload: string;
}


// GET MyAssignmentDetail 
export interface FetchMyAssignmentDetailDataRequest {
    type: typeof GET_MYASSIGNMENTDETAILS_REQUEST;
    payload: any;
}
export interface FetchMyAssignmentDetailDataSuccess {
    type: typeof GET_MYASSIGNMENTDETAILS_SUCCESS;
    payload: any;
}
export interface FetchMyAssignmentDetailDataFailure {
    type: typeof GET_MYASSIGNMENTDETAILS_FALIURE;
    payload: string;
}


// GET MyAssignment Status
export interface FetchMyAssignmentStatusDataRequest {
    type: typeof GET_MYASSIGNMENTSTATUS_REQUEST;
    payload: string;
}
export interface FetchMyAssignmentStatusDataSuccess {
    type: typeof GET_MYASSIGNMENTSTATUS_SUCCESS;
    payload: any;
}
export interface FetchMyAssignmentStatusDataFailure {
    type: typeof GET_MYASSIGNMENTSTATUS_FALIURE;
    payload: string;
}

// POST MyAssignment Status
export interface PostMyAssignmentStatusRequest {
    type: typeof POST_MYASSIGNMENTSTATUS_REQUEST;
    payload: any
}
export interface PostMyAssignmentStatusSuccess {
    type: typeof POST_MYASSIGNMENTSTATUS_SUCCESS;
    payload: any;
}
export interface PostMyAssignmentStatusFailure {
    type: typeof POST_MYASSIGNMENTSTATUS_FALIURE;
    payload: string;
}

// UPDATE  MyAssignment Status
export interface UpdateMyAssignmentStatusRequest {
    type: typeof UPDATE_MYASSIGNMENTSTATUS_REQUEST,
    payload: any;
}
export interface UpdateMyAssignmentStatusSuccess {
    type: typeof UPDATE_MYASSIGNMENTSTATUS_SUCCESS;
    payload: any;
}
export interface UpdateMyAssignmentStatusFailure {
    type: typeof UPDATE_MYASSIGNMENTSTATUS_FALIURE;
    payload: string;
}

// GET MyCustom Assignment form
export interface GetMyCustomAssignmentFormRequest {
    type: typeof GET_MYCUSTOMASSIGNMENTFORM_REQUEST,
    payload: any;
}
export interface GetMyCustomAssignmentFormSuccess {
    type: typeof GET_MYCUSTOMASSIGNMENTFORM_SUCCESS;
    payload: any;
}
export interface GetMyCustomAssignmentFormFailure {
    type: typeof GET_MYCUSTOMASSIGNMENTFORM_FALIURE;
    payload: string;
}

// GET My Grades 
export interface FetchMyGradesDataRequest {
    type: typeof GET_MYGRADES_REQUEST;
    payload: any;
}
export interface FetchMyGradesDataSuccess {
    type: typeof GET_MYGRADES_SUCCESS;
    payload: any;
}
export interface FetchMyGradesDataFailure {
    type: typeof GET_MYGRADES_FALIURE;
    payload: string;
}

// UPDATE  MyAssignment Submission Date
export interface UpdateAssignmentSubmissionDateRequest {
    type: typeof UPDATE_ASSIGNMENTSUBMISSIONDATE_REQUEST,
    payload: any;
}
export interface UpdateAssignmentSubmissionDateSuccess {
    type: typeof UPDATE_ASSIGNMENTSUBMISSIONDATE_SUCCESS;
    payload: any;
}
export interface UpdateAssignmentSubmissionDateFailure {
    type: typeof UPDATE_ASSIGNMENTSUBMISSIONDATE_FALIURE;
    payload: string;
}

export type AuthActions =
    | FetchMyAssignmentDataRequest
    | FetchMyAssignmentDataSuccess
    | FetchMyAssignmentDataFailure
    | FetchMyAssignmentDetailDataRequest
    | FetchMyAssignmentDetailDataSuccess
    | FetchMyAssignmentDetailDataFailure
    | FetchMyAssignmentStatusDataRequest
    | FetchMyAssignmentStatusDataSuccess
    | FetchMyAssignmentStatusDataFailure
    | PostMyAssignmentStatusRequest
    | PostMyAssignmentStatusSuccess
    | PostMyAssignmentStatusFailure
    | UpdateMyAssignmentStatusRequest
    | UpdateMyAssignmentStatusSuccess
    | UpdateMyAssignmentStatusFailure
    | GetMyCustomAssignmentFormRequest
    | GetMyCustomAssignmentFormSuccess
    | GetMyCustomAssignmentFormFailure
    | FetchMyGradesDataRequest
    | FetchMyGradesDataSuccess
    | FetchMyGradesDataFailure
    | UpdateAssignmentSubmissionDateRequest
    | UpdateAssignmentSubmissionDateSuccess
    | UpdateAssignmentSubmissionDateFailure