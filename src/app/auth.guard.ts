import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    
    constructor(private authServ: AuthService, private route: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.authServ.isAuthenticated().then(isLogged => {
                if(isLogged) {
                    return true;
                } else {
                    this.route.navigate(['/']);
                    return false;
                }
            });
    }

    canActivateChild(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.canActivate(route, state);
        }

}