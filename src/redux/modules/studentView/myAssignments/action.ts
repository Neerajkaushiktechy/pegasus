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
import {
     FetchMyAssignmentDataRequest,
     FetchMyAssignmentDataSuccess,
     FetchMyAssignmentDataFailure,
     FetchMyAssignmentDetailDataRequest,
     FetchMyAssignmentDetailDataSuccess,
     FetchMyAssignmentDetailDataFailure,
     FetchMyAssignmentStatusDataRequest,
     FetchMyAssignmentStatusDataSuccess,
     FetchMyAssignmentStatusDataFailure,
     PostMyAssignmentStatusRequest,
     PostMyAssignmentStatusSuccess,
     PostMyAssignmentStatusFailure,
     UpdateMyAssignmentStatusRequest,
     UpdateMyAssignmentStatusSuccess,
     UpdateMyAssignmentStatusFailure,
     GetMyCustomAssignmentFormRequest,
     GetMyCustomAssignmentFormSuccess,
     GetMyCustomAssignmentFormFailure,
     FetchMyGradesDataRequest,
     FetchMyGradesDataSuccess,
     FetchMyGradesDataFailure,
     UpdateAssignmentSubmissionDateRequest,
     UpdateAssignmentSubmissionDateSuccess,
     UpdateAssignmentSubmissionDateFailure
} from "./types";


// GET MyAssignment
// export const fetchMyAssignmentDataRequest = (): FetchMyAssignmentDataRequest => ({
//     type: GET_MYASSIGNMENT_REQUEST
// });

export const fetchMyAssignmentDataRequest = (payload: any): FetchMyAssignmentDataRequest => ({
    type: GET_MYASSIGNMENT_REQUEST,
    payload
});

export const fetchMyAssignmentDataSuccess = (payload: any): FetchMyAssignmentDataSuccess => ({
    type: GET_MYASSIGNMENT_SUCCESS,
    payload
});

export const fetchMyAssignmentDataFailure = (payload: string): FetchMyAssignmentDataFailure => ({
    type: GET_MYASSIGNMENT_FALIURE,
    payload
})

// GET MyAssignmentDetail
export const fetchMyAssignmentDetailDataRequest = (payload: any): FetchMyAssignmentDetailDataRequest => ({
    type: GET_MYASSIGNMENTDETAILS_REQUEST,
    payload
});

export const fetchMyAssignmentDetailDataSuccess = (payload: any): FetchMyAssignmentDetailDataSuccess => ({
    type: GET_MYASSIGNMENTDETAILS_SUCCESS,
    payload
});

export const fetchMyAssignmentDetailDataFailure = (payload: string): FetchMyAssignmentDetailDataFailure => ({
    type: GET_MYASSIGNMENTDETAILS_FALIURE,
    payload
})

// GET My Assignment Status
export const fetchMyAssignmentStatusDataRequest = (payload: any): FetchMyAssignmentStatusDataRequest => ({
    type: GET_MYASSIGNMENTSTATUS_REQUEST,
    payload
});

export const fetchMyAssignmentStatusDataSuccess = (payload: any): FetchMyAssignmentStatusDataSuccess => ({
    type: GET_MYASSIGNMENTSTATUS_SUCCESS,
    payload
});

export const fetchMyAssignmentStatusDataFailure = (payload: string): FetchMyAssignmentStatusDataFailure => ({
    type: GET_MYASSIGNMENTSTATUS_FALIURE,
    payload
})

// Post My Assignment Status

export const postMyAssignmentStatusRequest = (payload: any): PostMyAssignmentStatusRequest => ({
    type: POST_MYASSIGNMENTSTATUS_REQUEST,
    payload
});

export const postMyAssignmentStatusSuccess = (payload: any): PostMyAssignmentStatusSuccess => {
    return {
        type: POST_MYASSIGNMENTSTATUS_SUCCESS,
        payload
    }
};

export const postMyAssignmentStatusFaliure = (payload: string): PostMyAssignmentStatusFailure => ({
    type: POST_MYASSIGNMENTSTATUS_FALIURE,
    payload
})

// update My Assignment Status
export const updateMyAssignmentStatusRequest = (payload: any): UpdateMyAssignmentStatusRequest => ({
    type: UPDATE_MYASSIGNMENTSTATUS_REQUEST,
    payload,
});

export const updateMyAssignmentStatusSuccess = (payload: any): UpdateMyAssignmentStatusSuccess => ({
    type: UPDATE_MYASSIGNMENTSTATUS_SUCCESS,
    payload
});

export const updateMyAssignmentStatusFailure = (payload: string): UpdateMyAssignmentStatusFailure => ({
    type: UPDATE_MYASSIGNMENTSTATUS_FALIURE,
    payload
})

// GET MyCustom Assignment form
export const getMyCustomAssignmentFormRequest = (payload: any): GetMyCustomAssignmentFormRequest => ({
    type: GET_MYCUSTOMASSIGNMENTFORM_REQUEST,
    payload,
});

export const getMyCustomAssignmentFormSuccess = (payload: any): GetMyCustomAssignmentFormSuccess => ({
    type: GET_MYCUSTOMASSIGNMENTFORM_SUCCESS,
    payload
});

export const getMyCustomAssignmentFormFailure = (payload: string): GetMyCustomAssignmentFormFailure => ({
    type: GET_MYCUSTOMASSIGNMENTFORM_FALIURE,
    payload
})

// GET MyGrades
export const fetchMyGradesDataRequest = (payload:any): FetchMyGradesDataRequest => ({
    type: GET_MYGRADES_REQUEST,
    payload
});

export const fetchMyGradesDataSuccess = (payload: any): FetchMyGradesDataSuccess => ({
    type: GET_MYGRADES_SUCCESS,
    payload
});

export const fetchMyGradesDataFailure = (payload: string): FetchMyGradesDataFailure => ({
    type: GET_MYGRADES_FALIURE,
    payload
})

// update My Assignment Submission Date
export const updateAssignmentSubmissionDateRequest = (payload: any): UpdateAssignmentSubmissionDateRequest => ({
    type: UPDATE_ASSIGNMENTSUBMISSIONDATE_REQUEST,
    payload,
});

export const updateAssignmentSubmissionDateSuccess = (payload: any): UpdateAssignmentSubmissionDateSuccess => ({
    type: UPDATE_ASSIGNMENTSUBMISSIONDATE_SUCCESS,
    payload
});

export const updateAssignmentSubmissionDateFailure = (payload: string): UpdateAssignmentSubmissionDateFailure => ({
    type: UPDATE_ASSIGNMENTSUBMISSIONDATE_FALIURE,
    payload
})