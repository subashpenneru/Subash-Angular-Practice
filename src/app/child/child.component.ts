import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: ChildComponent, multi: true },
  ],
})
export class ChildComponent implements OnInit, ControlValueAccessor {
  value = 0;

  onChange: (_: any) => (_: any) => {};

  onTouched: () => {};

  constructor() {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {}

  updateChanges() {
    this.onChange(this.value);
  }
}
