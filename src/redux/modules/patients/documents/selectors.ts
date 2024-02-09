import { createSelector } from "reselect";

import { AppState } from "../../../rootReducer";

const getPending = (state: AppState) => state.getAllergy.initialState.loading;

const getUser = (state: AppState) => state.getAllergy.initialState.data;

const getError = (state: AppState) => state.getAllergy.initialState.error;

export const getSignUpSelector = createSelector(getUser, (data) => data);

export const getPendingSelector = createSelector(
  getPending,
  (loading) => loading
);

export const getErrorSelector = createSelector(getError, (error) => error);
