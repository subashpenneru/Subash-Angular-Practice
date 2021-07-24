import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5, 6];
  evenNumbers = [2, 4, 6];
  oddNumbers = [1, 3, 5];
  onlyOdd = false;
  value = 15;

  addNumbersClass(value) {
    return {
      Odd: value % 2 !== 0,
      Even: value % 2 === 0,
    };
  }
}
