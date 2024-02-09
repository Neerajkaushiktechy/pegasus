import { createSelector } from "reselect";

import { AppState } from "../../rootReducer";

const getPending = (state: AppState) => state.auth.initialSignUpState.loading;

const getSignUP = (state: AppState) => state.auth.initialSignUpState.signUp;

const getError = (state: AppState) => state.auth.initialSignUpState.error;

export const getSignUpSelector = createSelector(getSignUP, (data) => data);

export const getPendingSelector = createSelector(
  getPending,
  (loading) => loading
);

export const getErrorSelector = createSelector(getError, (error) => error);
