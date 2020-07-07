import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import * as fromCounter from '../store/counter.reducer';
import * as CounterActions from '../store/counter.actions';
import {map, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-counter-actions',
  templateUrl: './counter-actions.component.html',
  styleUrls: ['./counter-actions.component.css']
})
export class CounterActionsComponent implements OnInit {

  constructor(private store: Store<fromCounter.CounterState>) { }

  ngOnInit(): void {
  }

  addValue(val: number) {
    this.store.dispatch(new CounterActions.Add(val));
  }

  subtractValue(val: number) {
    this.store.dispatch(new CounterActions.Subtract(val));
  }

  onSave() {
    this.store.select('auth').pipe(
      take(1),
      switchMap(authState => {
        return this.store.select('counter').pipe(
          take(1),
          map(counterState => {
            return {
              email: authState.user.email,
              value: counterState.counter
            };
          })
        );
      }),
      map(resObj => resObj)
    ).subscribe(data => this.store.dispatch(new CounterActions.SaveValues(data)));
  }

  onReset() {
    this.store.dispatch(new CounterActions.Reset());
  }
}
