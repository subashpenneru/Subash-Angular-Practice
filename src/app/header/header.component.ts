import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select("auth")
      .pipe(map((authState) => authState.user))
      .subscribe((userData) => {
        this.isAuthenticated = !!userData;
        // if (!this.isAuthenticated) {
        //   this.router.navigate(['/auth/sign-in']);
        // }
      });
  }

  onLogout() {
    this.store.dispatch(AuthActions.LOGOUT_START());
  }
}
