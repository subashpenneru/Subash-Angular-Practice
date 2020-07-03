import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private API_KEY = environment.firebaseAPIKey;
  private SIGN_UP_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY;
  private SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.API_KEY;
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    const data = {
      email,
      password,
      returnSecureToken: true
    };
    return this.http.post<AuthResponseData>(this.SIGN_UP_URL, data)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            return this.handleError(error);
          }
        }),
        tap(resData => {
          const { localId, expiresIn, idToken } = resData;
          const userData = {
            email: resData.email,
            localId,
            idToken,
            expiresIn: Number(expiresIn)
          };
          this.handleAuthenticatedUser(userData);
        })
      );
  }

  login(email: string, password: string) {
    const data = { email, password, returnSecureToken: true };
    return this.http.post<AuthResponseData>(this.SIGN_IN_URL, data)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            return this.handleError(error);
          }
        }),
        tap(resData => {
          const { localId, expiresIn, idToken } = resData;
          const userData = {
            email: resData.email,
            localId,
            idToken,
            expiresIn: Number(expiresIn)
          };
          this.handleAuthenticatedUser(userData);
        })
      );
  }

  autoLogin() {
    const user: {
      email: string,
      id: string,
      token: string,
      tokenExpDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      return;
    }
    const loadedUser = new User(user.email, user.id, user.token, new Date(user.tokenExpDate));

    if (loadedUser.getToken()) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(user.tokenExpDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private handleAuthenticatedUser(userData: {
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  }) {
    const expDate = new Date(new Date().getTime() + userData.expiresIn * 1000);
    const user = new User(userData.email, userData.localId, userData.idToken, expDate);
    this.user.next(user);
    this.autoLogout(userData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = '';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
        break;
    }
    return throwError(errorMessage);
  }
}
