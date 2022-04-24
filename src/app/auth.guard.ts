import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "./shared/auth.service";
import { DataService } from "./shared/data.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authServ: AuthService,
    private route: Router,
    private dataServ: DataService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (route.routeConfig.path === "users") {
      this.dataServ.navigationLoading.next(true);
    }

    return this.authServ.isAuthenticated().then((isLogged) => {
      this.dataServ.navigationLoading.next(false);
      this.dataServ.childNavigationLoading.next(false);

      if (isLogged) {
        return true;
      } else {
        this.route.navigate(["/"]);
        return false;
      }
    });
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.dataServ.childNavigationLoading.next(true);
    return this.canActivate(route, state);
  }
}
