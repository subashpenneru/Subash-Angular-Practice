import {Action} from '@ngrx/store';
import {User} from '../../shared/user.model';

export const LOGIN_START = '[AUTH] LOGIN_START';
export const LOGIN = '[AUTH] LOGIN';
export const AUTO_LOGIN = '[AUTH] AUTO_LOGIN';
export const LOGOUT_START = '[AUTH] LOGOUT_START';
export  const LOGOUT = '[AUTH] LOGOUT';
export const DUMMY = 'DUMMY';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: string) {
  }
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: User) {
  }
}

export class LogoutStart implements Action {
  readonly type = LOGOUT_START;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Dummy implements Action {
  readonly type = DUMMY;
}

export type AuthActions = LoginStart | Login | Logout | LogoutStart | AutoLogin | Dummy;
