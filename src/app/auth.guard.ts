import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { Injectable } from '@angular/core';
import { DataService } from './shared/data.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    
    constructor(private authServ: AuthService, private route: Router, private dataServ: DataService) {}

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            
            if(route.routeConfig.path === 'users') {
                this.dataServ.navigationLoading.next(true);
            }

            return this.authServ.isAuthenticated().then(isLogged => {
                if(isLogged) {
                    this.dataServ.navigationLoading.next(false);
                    this.dataServ.childNavigationLoading.next(false);
                    return true;
                } else {
                    this.dataServ.navigationLoading.next(false);
                    this.dataServ.childNavigationLoading.next(false);
                    this.route.navigate(['/']);
                    return false;
                }
            });
    }

    canActivateChild(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

            this.dataServ.childNavigationLoading.next(true);
            return this.canActivate(route, state);
        }

}