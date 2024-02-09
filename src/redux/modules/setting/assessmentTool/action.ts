import {
    GET_ASSESSMENTTOOL_REQUEST,
    GET_ASSESSMENTTOOL_SUCCESS,
    GET_ASSESSMENTTOOL_FALIURE,
    POST_ASSESSMENTTOOL_REQUEST,
    POST_ASSESSMENTTOOL_SUCCESS,
    POST_ASSESSMENTTOOL_FALIURE,
    DELETE_ASSESSMENTTOOL_REQUEST,
    DELETE_ASSESSMENTTOOL_SUCCESS,
    DELETE_ASSESSMENTTOOL_FALIURE,
    UPDATE_ASSESSMENTTOOL_REQUEST,
    UPDATE_ASSESSMENTTOOL_SUCCESS,
    UPDATE_ASSESSMENTTOOL_FALIURE,
    GET_ASSESSMENTTYPE_REQUEST,
    GET_ASSESSMENTTYPE_SUCCESS,
    GET_ASSESSMENTTYPE_FALIURE,
    POST_ASSESSMENTTYPE_REQUEST,
    POST_ASSESSMENTTYPE_SUCCESS,
    POST_ASSESSMENTTYPE_FALIURE,
    SHOW_ASSESSMENT_FORM,
    EDIT_CUSTOM_FORM_ASSESSMENT_FORM
} from "./actionTypes";
import {
    getDataRequestType,
    getDataSuccessType,
    getDataFailureType,
    postDataRequestType,
    postDataSuccessType,
    postDataFailureType,
    deleteRequestType,
    deleteSuccessType,
    deleteFailureType,
    updateRequestType,
    updateSuccessType,
    updateFailureType,
    getAssessmentTypeDataRequestType,
    getAssessmentTypeSuccessType,
    getAssessmentTypeFailureType,
    postAssessmentTypeDataRequestType,
    postAssessmentTypeSuccessType,
    postAssessmentTypeFailureType,
    ShowFormDATAssesment,
    EditCustomFormDATAssesment
    
} from "./types";

// GET
export const getDataRequest = (payload:any): getDataRequestType => ({
    type: GET_ASSESSMENTTOOL_REQUEST,
    payload
});

export const getDataSuccess = (payload: any): getDataSuccessType => ({
    type: GET_ASSESSMENTTOOL_SUCCESS,
    payload
});

export const getDataFailure = (payload: string): getDataFailureType => ({
    type: GET_ASSESSMENTTOOL_FALIURE,
    payload
})

// POST
export const postDataRequest = (payload: any): postDataRequestType => ({
    type: POST_ASSESSMENTTOOL_REQUEST,
    payload
});

export const postDataSuccess = (payload: any): postDataSuccessType => {
    return {
        type: POST_ASSESSMENTTOOL_SUCCESS,
        payload
    }
};

export const postDataFailure = (payload: string): postDataFailureType => ({
    type: POST_ASSESSMENTTOOL_FALIURE,
    payload
})

export const showFormData = (payload: any , formType : Boolean) : ShowFormDATAssesment  => ({
    type: SHOW_ASSESSMENT_FORM,
    payload,
    formType
})


export const editCustomName = (payload: any) : EditCustomFormDATAssesment  => ({
    type: EDIT_CUSTOM_FORM_ASSESSMENT_FORM,
    payload,
})

// Delete 
export const deleteRequest = (payload: string): deleteRequestType => ({
    type: DELETE_ASSESSMENTTOOL_REQUEST,
    payload
});

export const deleteSuccess = (payload: any): deleteSuccessType => ({
    type: DELETE_ASSESSMENTTOOL_SUCCESS,
    payload
});

export const deleteFailure = (payload: string): deleteFailureType => ({
    type: DELETE_ASSESSMENTTOOL_FALIURE,
    payload
})

// update Allergy
export const updateRequest = (payload: any): updateRequestType => ({
    type: UPDATE_ASSESSMENTTOOL_REQUEST,
    payload
});

export const updateSuccess = (payload: any): updateSuccessType => ({
    type: UPDATE_ASSESSMENTTOOL_SUCCESS,
    payload
});

export const updateFailure = (payload: string): updateFailureType => ({
    type: UPDATE_ASSESSMENTTOOL_FALIURE,
    payload
})


// GET AssessMentType
export const getAssessmentTypeDataRequest = (): getAssessmentTypeDataRequestType => ({
    type: GET_ASSESSMENTTYPE_REQUEST
});

export const getAssessmentTypDataSuccess = (payload: any): getAssessmentTypeSuccessType => ({
    type: GET_ASSESSMENTTYPE_SUCCESS,
    payload
});

export const getAssessmentTypDataFailure = (payload: string): getAssessmentTypeFailureType => ({
    type: GET_ASSESSMENTTYPE_FALIURE,
    payload
})

// POST AssessMentType
export const postAssessmentTypeDataRequest = (payload: any): postAssessmentTypeDataRequestType => ({
    type: POST_ASSESSMENTTYPE_REQUEST,
    payload
});

export const postAssessmentTypDataSuccess= (payload: any): postAssessmentTypeSuccessType => {
    return {
        type: POST_ASSESSMENTTYPE_SUCCESS,
        payload
    }
};

export const postAssessmentTypDataFailure = (payload: string): postAssessmentTypeFailureType => ({
    type: POST_ASSESSMENTTYPE_FALIURE,
    payload
})