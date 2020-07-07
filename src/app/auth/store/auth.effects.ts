import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable, Observer} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import * as AuthActions from './auth.actions';
import {User} from '../../shared/user.model';
import {AuthService} from '../auth.service';

@Injectable()
export class AuthEffects {

  private expiresIn = 3 * 60;

  constructor(private actions$: Actions, private authService: AuthService,
              private router: Router) {
  }

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authState: AuthActions.LoginStart) => {
      const user: User = {
        email: authState.payload,
        token: this.authService.getToken(),
        tokenExpDate: new Date(new Date().getTime() + this.expiresIn * 1000)
      };
      return new Observable((observer: Observer<User>) => {
        setTimeout(() => {
          observer.next(user);
          observer.complete();
        }, 2000);
      }).pipe(
        tap(userData => {
          localStorage.setItem('userData', JSON.stringify(userData));
          const timer = new Date(userData.tokenExpDate).getTime() - new Date().getTime();
          this.authService.setTimer(timer);
          this.router.navigate(['/counter']);
        }),
        map(userData => new AuthActions.Login(userData))
      );
    })
  );

  @Effect()
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT_START),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/home']);
    }),
    map(() => new AuthActions.Logout())
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const loadedUser: User = JSON.parse(localStorage.getItem('userData'));
      if (loadedUser) {
        const timer = new Date(loadedUser.tokenExpDate).getTime() - new Date().getTime();
        if (timer > 0) {
          this.authService.setTimer(timer);
          return new AuthActions.Login(loadedUser);
        } else {
          return new AuthActions.Dummy();
        }
      } else {
        return new AuthActions.Dummy();
      }
    })
  );
}
