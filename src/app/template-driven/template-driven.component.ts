import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css'],
})
export class TemplateDrivenComponent implements OnInit {
  @Output() setUserName = new EventEmitter<string>();
  genders = ['Male', 'Female'];
  answer = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.valid) {
      this.setUserName.emit(
        `${form.value.userName.firstName} ${form.value.userName.lastName}`
      );
      form.reset();
    }
  }
}
