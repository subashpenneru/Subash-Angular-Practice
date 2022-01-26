import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./auth.reducer";

const selector = createFeatureSelector<State>("auth");

export const selectLoading = createSelector(
  selector,
  (state) => state.isLoading
);

export const selectUser = createSelector(selector, (state) => state.user);
