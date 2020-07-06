import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Counter} from './counter.model';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  counter = new BehaviorSubject<number>(0);
  private counterValues: Counter[] = [];
  counterValuesChanged = new BehaviorSubject<Counter[]>([]);

  constructor() { }

  addCounter(val: number) {
    const newValue = this.counter.getValue();
    this.counter.next(newValue + val);
  }

  subtractCounter(val: number) {
    const newValue = this.counter.getValue();
    this.counter.next(newValue - val);
  }

  saveCounterValues(val: number) {
    const id = this.counterValues.length;
    const counterObj: Counter = { id, value: val };
    this.counterValues.push(counterObj);
    this.counterValuesChanged.next(this.counterValues.slice());
  }

  resetCounterValues() {
    this.counterValues = [];
    this.counterValuesChanged.next(this.counterValues.slice());
  }

  deleteCounterValue(id: number) {
    this.counterValues.splice(id, 1);
    this.counterValuesChanged.next(this.counterValues.slice());
  }
}
