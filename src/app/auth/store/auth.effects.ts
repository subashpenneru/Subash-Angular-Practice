import {Injectable} from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import * as AuthActions from './auth.actions';
import {environment} from '../../../environments/environment';
import { AuthResponseData } from '../authresponse.model';
import {User} from '../user.model';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private http: HttpClient,
              private router: Router, private authSer: AuthService) {
  }

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      const { email, password } = signUpAction.payload;
      const data = { email, password, returnSecureToken: true };
      return this.http.post<AuthResponseData>(environment.SIGN_UP_URL, data)
        .pipe(
          tap(resData => this.authSer.setLogoutTimer(+resData.expiresIn * 1000)),
          map(handleAuthentication),
          catchError(handleError)
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      const { email, password } = authData.payload;
      return this.http.post<AuthResponseData>(environment.SIGN_IN_URL, {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        tap(resData => this.authSer.setLogoutTimer(+resData.expiresIn * 1000)),
        map(handleAuthentication),
        catchError(handleError)
      );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    map((authSuccessAction: AuthActions.AuthenticateSuccess) => authSuccessAction.payload),
    tap((authSuccessData) => {
      if (authSuccessData.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const user: {
        email: string,
        id: string,
        token: string,
        tokenExpDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!user) {
        return new AuthActions.Logout();
      }
      const loadedUser = new User(user.email, user.id, user.token, new Date(user.tokenExpDate));

      if (loadedUser.getToken()) {
        const expirationDuration = new Date(user.tokenExpDate).getTime() - new Date().getTime();
        this.authSer.setLogoutTimer(expirationDuration);
        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.getToken(),
          expDate: new Date(user.tokenExpDate),
          redirect: false
        });
      }
      return new AuthActions.Logout();
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authSer.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );
}

const handleAuthentication = (resData: AuthResponseData) => {
  const { email, localId, idToken, expiresIn } = resData;
  const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, localId, idToken, expDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email,
    userId: localId,
    token: idToken,
    expDate,
    redirect: true
  });
};

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
    default:
      errorMessage = 'An unknown error occurred!';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};
