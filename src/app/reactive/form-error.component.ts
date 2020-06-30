import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-form-error',
  template: `<span class="help-block" style="color: red;">{{errorMessage}}</span>`
})
export class FormErrorComponent implements OnChanges {

  @Input() inputName: string;
  @Input() errorConfig: any;
  errorMessage: string;

  ngOnChanges(changes: SimpleChanges): void {
    const { error, touched, valid } = this.errorConfig;
    this.showErrorMessage(this.inputName, valid, touched, error);
  }

  showErrorMessage(name: string, valid: boolean, touched: boolean, error) {
    if (!valid && touched && error) {
      this.errorMessage = this.getErrorMessage(name, error);
    } else {
      this.errorMessage = null;
    }
  }

  getErrorMessage(name, error) {
    const errorType = Object.getOwnPropertyNames(error);
    return `${name} is ${errorType[0]}`;
  }
}
