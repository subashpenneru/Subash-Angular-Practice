import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  expTimer = null;

  constructor(private store: Store<fromApp.AppState>) {}

  setTimer(expTime: number) {
    this.expTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.LOGOUT_START());
    }, expTime);
  }

  clearLogoutTimer() {
    if (this.expTimer) {
      clearTimeout(this.expTimer);
      this.expTimer = null;
    }
  }

  getToken() {
    const alphabets = "abcdefghijklmnopqrstuvwxyz";
    let letter = "";
    for (let i = 0; i < 50; i++) {
      letter += alphabets[Math.floor(Math.random() * alphabets.length)];
    }
    return letter;
  }
}
