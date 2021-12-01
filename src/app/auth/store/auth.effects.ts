import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs/operators";
import { Observable, Observer } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import * as AuthActions from "./auth.actions";
import { User } from "../../shared/user.model";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthEffects {
  private expiresIn = 3 * 60;

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authState: { payload: string }) => {
        const user: User = {
          email: authState.payload,
          token: this.authService.getToken(),
          tokenExpDate: new Date(new Date().getTime() + this.expiresIn * 1000),
        };
        return new Observable((observer: Observer<User>) => {
          setTimeout(() => {
            observer.next(user);
            observer.complete();
          }, 2000);
        }).pipe(
          tap((userData: User) => {
            localStorage.setItem("userData", JSON.stringify(userData));
            const timer =
              new Date(userData.tokenExpDate).getTime() - new Date().getTime();
            this.authService.setTimer(timer);
            this.router.navigate(["/counter"]);
          }),
          map((userData) => AuthActions.LOGIN({ user: userData }))
        );
      })
    )
  );

  authLogout = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGOUT_START),
      tap(() => {
        localStorage.removeItem("userData");
        this.authService.clearLogoutTimer();
        this.router.navigate(["/home"]);
      }),
      map(() => AuthActions.LOGOUT())
    )
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const loadedUser: User = JSON.parse(localStorage.getItem("userData"));
        if (loadedUser) {
          const timer: number =
            new Date(loadedUser.tokenExpDate).getTime() - new Date().getTime();
          if (timer > 0) {
            this.authService.setTimer(timer);
            return AuthActions.LOGIN({ user: loadedUser });
          } else {
            return AuthActions.DUMMY();
          }
        } else {
          return AuthActions.DUMMY();
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
