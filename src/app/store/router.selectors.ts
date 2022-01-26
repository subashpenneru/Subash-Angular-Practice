import * as fromRouter from "@ngrx/router-store";
import { createFeatureSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

export const selectRouter = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState<any>
>("router");

export const {
  selectUrl,
  selectRouteParams,
  selectRouteData,
  selectCurrentRoute,
  selectQueryParams,
} = fromRouter.getSelectors(selectRouter);
