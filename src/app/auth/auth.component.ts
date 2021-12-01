import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

import * as fromApp from "../store/app.reducer";
import * as fromAuth from "./store/auth.reducer";
import * as AuthActions from "./store/auth.actions";
import { User } from "../shared/user.model";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
  routePath: string;
  isSignUp = false;
  isLoading = false;
  storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      this.routePath = url[1].path;
      this.isSignUp = this.routePath === "sign-up";
    });

    this.storeSub = this.store
      .select("auth")
      .pipe(
        map((auth: fromAuth.State) => {
          this.isLoading = auth.isLoading;
          return auth.user;
        })
      )
      .subscribe((user: User) => {
        console.log(user);
      });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const { email } = form.value;
    this.store.dispatch(AuthActions.LOGIN_START({ payload: email }));
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
