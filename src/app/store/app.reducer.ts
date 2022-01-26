import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from "../auth/store/auth.reducer";

export interface AppState {
  auth: fromAuth.State;
  router: RouterReducerState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  router: routerReducer,
};
