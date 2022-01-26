import { createFeatureSelector, createSelector } from "@ngrx/store";

import { selectUrl } from "src/app/store/router.selectors";
import { State } from "./auth.reducer";

const selector = createFeatureSelector<State>("auth");

export const selectLoading = createSelector(
  selector,
  (state) => state.isLoading
);

export const selectUser = createSelector(selector, (state) => state.user);

export const selectIsSignUp = createSelector(
  selectUrl,
  (state) => state.split("/")[2] === "sign-up"
);
