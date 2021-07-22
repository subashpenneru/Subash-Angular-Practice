import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(private _f: FormBuilder) {}

  ngOnInit() {
    this.reactiveForm = this._f.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.min(6)]),
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onReactiveFormSubmit() {
    console.log(this.reactiveForm);
  }
}
