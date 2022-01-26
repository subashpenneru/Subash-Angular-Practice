import * as fromRouter from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";

import * as fromAuth from "../auth/store/auth.reducer";

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  auth: fromAuth.authReducer,
};
