import { createAction, props } from "@ngrx/store";

import { User } from "../../shared/user.model";

export const LOGIN_START = createAction(
  "[AUTH] LOGIN_START",
  props<{ payload: string }>()
);
export const LOGIN = createAction("[AUTH] LOGIN", props<{ user: User }>());
export const LOGOUT_START = createAction("[AUTH] LOGOUT_START");
export const LOGOUT = createAction("[AUTH] LOGOUT");
export const AUTO_LOGIN = createAction("[AUTH] AUTO_LOGIN");
export const DUMMY = createAction("DUMMY");
