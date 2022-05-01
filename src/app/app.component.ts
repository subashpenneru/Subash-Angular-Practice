import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, DataService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isUserLogged = false;

  constructor(
    private authServ: AuthService,
    public dataServ: DataService,
    private router: Router
  ) {
    this.authServ.isLoggedIn.subscribe((res) => (this.isUserLogged = res));
  }

  onNavigate() {
    this.router.navigate([
      { outlets: { primary: ['servers'], sidebarRoute: ['sidebar'] } },
    ]);
  }

  onLogOut() {
    this.authServ.loggedOut();
    window.location.reload();
  }
}
