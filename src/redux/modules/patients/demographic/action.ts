import {
    FETCH_REFFERNAMES_REQUEST, FETCH_REFFERNAMES_SUCCESS, FETCH_REFFERNAMES_FALIURE, POST_DEMOGRAPHIC_REQUEST,
    POST_DEMOGRAPHIC_SUCCESS,
    POST_DEMOGRAPHIC_FALIURE,
    GET_DEMOGRAPHIC_REQUEST,
    GET_DEMOGRAPHIC_SUCCESS,
    GET_DEMOGRAPHIC_FALIURE,
    UPDATE_DEMOGRAPHIC_REQUEST,
    UPDATE_DEMOGRAPHIC_SUCCESS,
    UPDATE_DEMOGRAPHIC_FALIURE,
    DELETE_DEMOGRAPHIC_REQUEST,
    DELETE_DEMOGRAPHIC_SUCCESS,
    DELETE_DEMOGRAPHIC_FALIURE,
    CHECK_EMAIL_REQUEST,
    CHECK_EMAIL_FALIURE,
    CHECK_EMAIL_SUCCESS
} from "./actionTypes";
import {
    FetchRefferNameRequest,
    FetchRefferNameSuccess,
    FetchRefferNameFailure,
    FetchSuccessPayload,
    FetchFailurePayload,
    postDemographiRequest,
    postDemographiSuccess,
    postDemographiFailure,
    postDemographicSuccessPayload,
    postDemographicFailurePayload,
    getDemographiRequest,
    getDemographiSuccess,
    getDemographiFailure,
    updateDemographiRequest,
    updateDemographiSuccess,
    updateDemographiFailure,
    deleteDemographiRequest,
    deleteDemographiSuccess,
    deleteDemographiFailure,
    CheckEmailRequestType,
    CheckEmailSuccessType,
    CheckEmailFailureType
} from "./types";


export const fetchRefferNameRequest = (): FetchRefferNameRequest => ({
    type: FETCH_REFFERNAMES_REQUEST,
});

export const fetchRefferNameSuccess = (payload: FetchSuccessPayload): FetchRefferNameSuccess => ({
    type: FETCH_REFFERNAMES_SUCCESS,
    payload
});

export const fetchRefferNameFailure = (payload: FetchFailurePayload): FetchRefferNameFailure => ({
    type: FETCH_REFFERNAMES_FALIURE,
    payload
})

// Demographic
export const postDemographicRequest = (payload: any): postDemographiRequest => ({
    type: POST_DEMOGRAPHIC_REQUEST,
    payload
});

export const postDemographicSuccess = (payload: postDemographicSuccessPayload): postDemographiSuccess => {
    return {
        type: POST_DEMOGRAPHIC_SUCCESS,
        payload
    }
}

export const postDemographicFailure = (payload: postDemographicFailurePayload): postDemographiFailure => ({
    type: POST_DEMOGRAPHIC_FALIURE,
    payload
})


// GET Demographic
export const getDemographicRequest = (payload: any): getDemographiRequest => ({
    type: GET_DEMOGRAPHIC_REQUEST,
    payload
});

export const getDemographicSuccess = (payload: any): getDemographiSuccess => {
    return {
        type: GET_DEMOGRAPHIC_SUCCESS,
        payload
    }
}

export const getDemographicFailure = (payload: string): getDemographiFailure => ({
    type: GET_DEMOGRAPHIC_FALIURE,
    payload
})

// UPDATE Demographic
export const updateDemographicRequest = (payload: any): updateDemographiRequest => ({
    type: UPDATE_DEMOGRAPHIC_REQUEST,
    payload
});

export const updateDemographicSuccess = (payload: any): updateDemographiSuccess => {
    return {
        type: UPDATE_DEMOGRAPHIC_SUCCESS,
        payload
    }
}

export const updateDemographicFailure = (payload: any): updateDemographiFailure => ({
    type: UPDATE_DEMOGRAPHIC_FALIURE,
    payload
})

// DELETE Demographic
export const deleteDemographicRequest = (payload: any): deleteDemographiRequest => ({
    type: DELETE_DEMOGRAPHIC_REQUEST,
    payload
});

export const deleteDemographicSuccess = (payload: any): deleteDemographiSuccess => {
    return {
        type: DELETE_DEMOGRAPHIC_SUCCESS,
        payload
    }
}

export const deleteDemographicFailure = (payload: string): deleteDemographiFailure => ({
    type: DELETE_DEMOGRAPHIC_FALIURE,
    payload
})


// check email
export const checkEmailRequest = (payload: object): CheckEmailRequestType => ({
    type: CHECK_EMAIL_REQUEST,
    payload
});

export const checkEmailSuccess = (payload: string): CheckEmailSuccessType => ({
    type: CHECK_EMAIL_SUCCESS,
    payload
});

export const checkEmailFailure = (payload: string): CheckEmailFailureType => ({
    type: CHECK_EMAIL_FALIURE,
    payload
})