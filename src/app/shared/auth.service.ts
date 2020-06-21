import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService {

    isLoggedIn = new BehaviorSubject(false);
    loggedUser = new BehaviorSubject<User>(undefined);

    loggedIn() {
        this.isLoggedIn.next(true);
    }

    loggedOut() {
        this.isLoggedIn.next(false);
    }

    isAuthenticated() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.isLoggedIn.getValue());
            }, 1000);
        })
    }

}