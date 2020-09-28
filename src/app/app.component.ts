import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fruits = ['Mango', 'Orange'];
  foods = new BehaviorSubject(['Mango', 'Orange']);

  constructor() {}

  /**
   *
   * @param item it has to be typeOf string
   * @author Subash
   * Remove comments in this(app.component.ts) and child.component.ts files to see ChangeDetection.
   */

  addFruit(item: string) {
    this.fruits.push(item); // for default case
    // this.fruits = [...this.fruits, item];
    this.foods.next([item]);
  }
}
