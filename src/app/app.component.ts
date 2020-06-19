import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isUserLogged = false;

  constructor(private authServ: AuthService, private router: Router, public dataServ: DataService) {
    this.isUserLogged = this.authServ.isLoggedIn;
  }

  onLogIn() {
    this.authServ.loggedIn();
    this.isUserLogged = this.authServ.isLoggedIn;
  }

  onLogOut() {
    this.authServ.loggedOut();
    this.isUserLogged = this.authServ.isLoggedIn;
    this.router.navigate(['/']);
  }
}
