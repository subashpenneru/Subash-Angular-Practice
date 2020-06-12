import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    isLoggedIn = false;

    loggedIn() {
        this.isLoggedIn = true;
    }

    loggedOut() {
        this.isLoggedIn = false;
    }

    isAuthenticated() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.isLoggedIn);
            }, 1000);
        })
    }

}