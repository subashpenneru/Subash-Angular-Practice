import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LazyLoadGuard implements CanLoad {

    constructor(private authServ: AuthService, private router: Router) {}

    canLoad(
        route: Route, 
        segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {

            return this.authServ.isAuthenticated().then(isLogged => {
                if(isLogged) {
                    if(this.authServ.loggedUser.getValue()['role'] === 'Admin') {
                        return true;
                    } else {
                        this.router.navigate(['/']);
                        return false;
                    }
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            })

    }

}