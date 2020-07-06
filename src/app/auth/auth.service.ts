import { Injectable } from '@angular/core';
import {User} from '../shared/user.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  expiresIn = 3 * 60;
  expTimer = null;

  constructor() { }

  login(email: string) {
    const user: User = {
      email,
      token: this.getToken(),
      tokenExpDate: new Date(new Date().getTime() - this.expiresIn * 1000)
    };
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.setTimer(this.expiresIn * 1000);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.clearLogoutTimer();
  }

  autoLogin() {
    const loadedUser: User = JSON.parse(localStorage.getItem('userData'));
    if (!loadedUser) {
      return;
    }
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  setTimer(expTime: number) {
    this.expTimer = setTimeout(() => {
      this.logout();
    }, expTime);
  }

  clearLogoutTimer() {
    if (this.expTimer) {
      clearTimeout(this.expTimer);
      this.expTimer = null;
    }
  }

  getToken() {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    let letter = '';
    for (let i = 0; i < 50; i++) {
      letter += alphabets[Math.floor(Math.random() * alphabets.length)];
    }
    return letter;
  }
}
