import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "./store/auth.actions";
import { selectIsSignUp, selectLoading, selectUser } from "./store/selectors";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  storeSub: Subscription;
  destroy$ = new Subject<void>();

  constructor(private store: Store<fromApp.AppState>) {}

  loading$ = this.store.select(selectLoading);
  isSignUp$ = this.store.select(selectIsSignUp);

  ngOnInit(): void {
    this.store
      .select(selectUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        console.log(user);
      });
  }

  onSubmit(form: NgForm) {
    const { email } = form.value;
    this.store.dispatch(AuthActions.LOGIN_START({ payload: email }));
  }

  ngOnDestroy(): void {
    // this.destroy$.next();
    this.destroy$.complete();
  }
}
