import {
    GET_VITALS_REQUEST,
    GET_VITALS_SUCCESS,
    GET_VITALS_FALIURE,
    POST_VITALS_REQUEST,
    POST_VITALS_SUCCESS,
    POST_VITALS_FALIURE,
    DELETE_VITALS_REQUEST,
    DELETE_VITALS_SUCCESS,
    DELETE_VITALS_FALIURE,
    UPDATE_VITALS_REQUEST,
    UPDATE_VITALS_SUCCESS,
    UPDATE_VITALS_FALIURE,
    GET_OXYGEN_SUPPLY_REQUEST,
    GET_OXYGEN_SUPPLY_SUCCESS,
    GET_OXYGEN_SUPPLY_FALIURE
} from "./actionTypes";
import {

    FetchVitalsDataRequest,
    FetchVitalsDataSuccess,
    FetchVitalsDataFailure,
    postVitalsDataRequest,
    postVitalsDataSuccess,
    postVitalsDataFailure,
    deleteVitalsRequestType,
    deleteVitalsSuccessType,
    deleteVitalsFailureType,
    updateVitalsRequestType,
    updateVitalsSuccessType,
    updateVitalsFailureType,
    FetchOxygenSupplyDataRequest,
    FetchOxygenSupplyDataSuccess,
    FetchOxygenSupplyDataFailure
} from "./types";

// GET
export const fetchVitalsDataRequest = (payload: string): FetchVitalsDataRequest => ({
    type: GET_VITALS_REQUEST,
    payload
});

export const fetchVitalsDataSuccess = (payload: any): FetchVitalsDataSuccess => ({
    type: GET_VITALS_SUCCESS,
    payload
});

export const fetchVitalsDataFailure = (payload: string): FetchVitalsDataFailure => ({
    type: GET_VITALS_FALIURE,
    payload
})

// POST
export const postVitalsDataRequestAction = (payload: any): postVitalsDataRequest => ({
    type: POST_VITALS_REQUEST,
    payload
});

export const postVitalsDataSuccessAction = (payload: any): postVitalsDataSuccess => {
    return {
        type: POST_VITALS_SUCCESS,
        payload
    }
};

export const postVitalsDataFailureAction = (payload: string): postVitalsDataFailure => ({
    type: POST_VITALS_FALIURE,
    payload
})

// Delete 
export const deleteVitalsRequest = (payload: string): deleteVitalsRequestType => ({
    type: DELETE_VITALS_REQUEST,
    payload
});

export const deleteVitalsSuccess = (payload: any): deleteVitalsSuccessType => ({
    type: DELETE_VITALS_SUCCESS,
    payload
});

export const deleteVitalsFailure = (payload: string): deleteVitalsFailureType => ({
    type: DELETE_VITALS_FALIURE,
    payload
})

// update Allergy
export const updateVitalsRequest = (payload: any): updateVitalsRequestType => ({
    type: UPDATE_VITALS_REQUEST,
    payload
});

export const updateVitalsSuccess = (payload: any): updateVitalsSuccessType => ({
    type: UPDATE_VITALS_SUCCESS,
    payload
});

export const updateVitalsFailure = (payload: string): updateVitalsFailureType => ({
    type: UPDATE_VITALS_FALIURE,
    payload
})

// GET MASTER Oxygen supply data 

export const fetchOxygenSupplyDataRequest = () : FetchOxygenSupplyDataRequest => ({
    type: GET_OXYGEN_SUPPLY_REQUEST,
});
export const fetchOxygenSupplyDataSuccess = (payload: any ) : FetchOxygenSupplyDataSuccess => ({
    type: GET_OXYGEN_SUPPLY_SUCCESS,
    payload
});
export const fetchOxygenSupplyDataFailure = (payload: any) : FetchOxygenSupplyDataFailure  => ({
    type: GET_OXYGEN_SUPPLY_FALIURE,
    payload
    
})