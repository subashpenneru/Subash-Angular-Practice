import {User} from '../../shared/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  isLoading: boolean;
}

export const initialState: State = {
  user: null,
  isLoading: false
};

export function authReducer(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
      return {
        ...state,
        isLoading: true
      };
    case AuthActions.LOGIN:
      return {
        ...state,
        isLoading: false,
        user: { ...action.payload }
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return {...state};
  }
}
