import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  routePath: string;
  isSignUp = false;
  isLoading = false;
  storeSub: Subscription;

  constructor(private route: ActivatedRoute, private authService: AuthService,
              private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.routePath = url[1].path;
      this.isSignUp = this.routePath === 'sign-up';
    });

    this.storeSub = this.store.select('auth').pipe(
      map(auth => {
        this.isLoading = auth.isLoading;
        return auth.user;
      })
    ).subscribe(user => {
      console.log(user);
    });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const { email } = form.value;
    this.store.dispatch(new AuthActions.LoginStart(email));
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
