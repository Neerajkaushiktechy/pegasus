import {
    GET_MEDICATION_REQUEST,
    GET_MEDICATION_SUCCESS,
    GET_MEDICATION_FALIURE,
    POST_MEDICATION_REQUEST,
    POST_MEDICATION_SUCCESS,
    POST_MEDICATION_FALIURE,
    DELETE_MEDICATION_REQUEST,
    DELETE_MEDICATION_SUCCESS,
    DELETE_MEDICATION_FALIURE,
    UPDATE_MEDICATION_REQUEST,
    UPDATE_MEDICATION_SUCCESS,
    UPDATE_MEDICATION_FALIURE,
    GET_MEDECATION_FORM_DATA_REQUEST,
    GET_MEDECATION_FORM_DATA_SUCCESS,
    GET_MEDECATION_FORM_DATA_FALIURE,
    POST_CUSTOMMEDICATIONROUTE_REQUEST,
    POST_CUSTOMMEDICATIONROUTE_SUCCESS,
    POST_CUSTOMMEDICATIONROUTE_FALIURE,
    APPEND_CUSTOM_META_DATA,
    GET_MEDICATIONMEDICINE_REQUEST,
    GET_MEDICATIONMEDICINE_SUCCESS,
    GET_MEDICATIONMEDICINE_FALIURE
} from "./actionTypes";
import {
    getFormDataRequestType,
    getFormDataSuccessType,
    getFormDataFailureType,
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
    postCustomMedicationRouteRequestType,
    postCustomMedicationRouteSuccessType,
    postCustomMedicationRouteFailureType,
    AppendCustomMetaData,
    getMedicationMedicineRequestType,
    getMedicationMedicineSuccessType,
    getMedicationMedicineFailureType
} from "./types";



// GET
export const getFormDataRequest = (): getFormDataRequestType => ({
    type: GET_MEDECATION_FORM_DATA_REQUEST,
});

export const getFormDataSuccess = (payload: any): getFormDataSuccessType => ({
    type: GET_MEDECATION_FORM_DATA_SUCCESS,
    payload
});

export const getFormDataFailure = (payload: string): getFormDataFailureType => ({
    type: GET_MEDECATION_FORM_DATA_FALIURE,
    payload
})

// GET
export const getDataRequest = (payload:any): getDataRequestType => ({
    type: GET_MEDICATION_REQUEST,
    payload
});

export const getDataSuccess = (payload: any): getDataSuccessType => ({
    type: GET_MEDICATION_SUCCESS,
    payload
});

export const getDataFailure = (payload: string): getDataFailureType => ({
    type: GET_MEDICATION_FALIURE,
    payload
})

// POST
export const postDataRequest = (payload: any): postDataRequestType => ({
    type: POST_MEDICATION_REQUEST,
    payload
});

export const postDataSuccess = (payload: any): postDataSuccessType => {
    return {
        type: POST_MEDICATION_SUCCESS,
        payload
    }
};

export const appendcustomMetaData = (payload : any) : AppendCustomMetaData => ({
   type : APPEND_CUSTOM_META_DATA,
   payload
})

export const postDataFailure = (payload: string): postDataFailureType => ({
    type: POST_MEDICATION_FALIURE,
    payload
})

// Delete 
export const deleteRequest = (payload: string): deleteRequestType => ({
    type: DELETE_MEDICATION_REQUEST,
    payload
});

export const deleteSuccess = (payload: any): deleteSuccessType => ({
    type: DELETE_MEDICATION_SUCCESS,
    payload
});

export const deleteFailure = (payload: string): deleteFailureType => ({
    type: DELETE_MEDICATION_FALIURE,
    payload
})

// update Allergy
export const updateRequest = (payload: any): updateRequestType => ({
    type: UPDATE_MEDICATION_REQUEST,
    payload
});

export const updateSuccess = (payload: any): updateSuccessType => ({
    type: UPDATE_MEDICATION_SUCCESS,
    payload
});

export const updateFailure = (payload: string): updateFailureType => ({
    type: UPDATE_MEDICATION_FALIURE,
    payload
})

// POST
export const postCustomMedicationRouteRequest = (payload: any): postCustomMedicationRouteRequestType => ({
    type: POST_CUSTOMMEDICATIONROUTE_REQUEST,
    payload
});

export const postCustomMedicationRouteSuccess = (payload: any): postCustomMedicationRouteSuccessType => {
    return {
        type: POST_CUSTOMMEDICATIONROUTE_SUCCESS,
        payload
    }
};

export const postCustomMedicationRouteFailure = (payload: string): postCustomMedicationRouteFailureType => ({
    type: POST_CUSTOMMEDICATIONROUTE_FALIURE,
    payload
})

// GET
export const getMedicationMedicineRequest = (payload:any): getMedicationMedicineRequestType => ({
    type: GET_MEDICATIONMEDICINE_REQUEST,
    payload
});

export const getMedicationMedicineSuccess = (payload: any): getMedicationMedicineSuccessType => ({
    type: GET_MEDICATIONMEDICINE_SUCCESS,
    payload
});

export const getMedicationMedicineFailure = (payload: string): getMedicationMedicineFailureType => ({
    type: GET_MEDICATIONMEDICINE_FALIURE,
    payload
})