import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isUserLogged = false;

  constructor(private authServ: AuthService) {
    this.isUserLogged = this.authServ.isLoggedIn;
  }

  onLogIn() {
    this.authServ.loggedIn();
    this.isUserLogged = this.authServ.isLoggedIn;
  }

  onLogOut() {
    this.authServ.loggedOut();
    this.isUserLogged = this.authServ.isLoggedIn;
  }
}
