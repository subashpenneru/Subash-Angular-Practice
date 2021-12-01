import { createReducer, on } from "@ngrx/store";

import { User } from "../../shared/user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.LOGIN_START, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(AuthActions.LOGIN, (state: State, payload) => {
    return {
      ...state,
      isLoading: false,
      user: { ...payload.user },
    };
  }),
  on(AuthActions.LOGOUT, (state: State) => ({ ...state, user: null }))
);
