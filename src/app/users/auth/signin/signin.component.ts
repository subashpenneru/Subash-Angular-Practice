import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/shared/data.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {
  @ViewChild('emailInput') emailInput: ElementRef;

  errorMessage = '';
  isError = false;

  constructor(
    private dataServ: DataService,
    private authServ: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSignin() {
    this.isError = false;
    const email = this.emailInput.nativeElement.value;

    this.dataServ.getUsers().subscribe((users) => {
      const index = users.findIndex((user) => user.email === email);
      if (index >= 0) {
        this.authServ.loggedIn();
        this.authServ.loggedUser.next(users[index]);
        this.router.navigate(['/users']);
      } else {
        this.isError = true;
        this.errorMessage = 'User not found!';
      }
    });
  }
}
