import { createSelector } from "reselect";

import { AppState } from "../../../rootReducer";

const getPending = (state: AppState) => state.user.initialState.loading;

const getUser = (state: AppState) => state.user.initialState.user;

const getError = (state: AppState) => state.user.initialState.error;

export const getSignUpSelector = createSelector(getUser, (data) => data);

export const getPendingSelector = createSelector(
  getPending,
  (loading) => loading
);

export const getErrorSelector = createSelector(getError, (error) => error);
