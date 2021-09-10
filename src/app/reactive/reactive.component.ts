import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  @Output() setUserName = new EventEmitter<string>();
  genders = ['Male', 'Female'];
  userForm: FormGroup;
  forbiddenNames = ['Subash', 'Sai'];
  forbiddenEmails = ['subashpenneru@gmail.com'];
  custom = 'Libor + ';

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.userForm = new FormGroup({
      userData: new FormGroup({
        firstName: new FormControl('', [
          Validators.required,
          this.setNameValidator.bind(this),
        ]),
        lastName: new FormControl(null, Validators.required),
      }),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        [this.setEmailValidator.bind(this)]
      ),
      password: new FormControl(null, Validators.required),
      confirmPwd: new FormControl(null, [
        Validators.required,
        this.setConfirmPwd.bind(this),
      ]),
      customVal: new FormControl(this.custom, [
        Validators.required,
        this.checkCustomValue.bind(this),
      ]),
      gender: new FormControl(null, Validators.required),
      hobbies: new FormArray([]),
    });
  }

  getHobbiesControl(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby() {
    this.getHobbiesControl().push(new FormControl(null, Validators.required));
  }

  onDeleteHobby(index: number) {
    this.getHobbiesControl().removeAt(index);
  }

  setNameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const index = this.forbiddenNames.findIndex(
        (name: string) => name.toLowerCase() === control.value.toLowerCase()
      );
      if (index >= 0) {
        return { nameIsForbidden: true };
      }
    }
    return null;
  }

  setEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.forbiddenEmails.findIndex(
          (email: string) => email === control.value
        );
        if (index >= 0) {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }

  setConfirmPwd(control: FormControl): { [s: string]: boolean } {
    const pwd = this.userForm
      ? this.userForm.get('password')
        ? this.userForm.get('password').value
        : null
      : null;

    if (typeof pwd === 'string') {
      if (!pwd.includes(control.value)) {
        return { notMatchWithPassword: true };
      }
    }

    return null;
  }

  checkCustomValue(control: FormControl): { [s: string]: boolean } {
    if (!control.value || !control.value.startsWith(this.custom)) {
      control.setValue(this.custom);
    }
    const value = +control.value.split(this.custom)[1];

    if (typeof value !== 'number' || isNaN(value)) {
      return { onlyNumber: true };
    }

    if (this.custom === control.value) {
      return { required: true };
    }

    return null;
  }

  onSubmit() {
    console.log(this.userForm);
    const {
      userData: { firstName, lastName },
    } = this.userForm.value;
    const name = `${firstName} ${lastName}`;
    this.setUserName.emit(name);
    this.onClear();
  }

  onClear() {
    this.userForm.reset();
  }
}
