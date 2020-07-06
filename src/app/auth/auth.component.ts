import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  routePath: string;
  isSignUp = false;

  constructor(private route: ActivatedRoute, private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.routePath = url[1].path;
      this.isSignUp = this.routePath === 'sign-up';
    });
  }

  onSubmit(form: NgForm) {
    const { email } = form.value;
    this.authService.login(email);
    this.router.navigate(['/counter']);
    form.reset();
  }
}
