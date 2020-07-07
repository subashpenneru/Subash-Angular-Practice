import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Counter} from './counter.model';
import * as fromCounter from './store/counter.reducer';
import * as CounterActions from './store/counter.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {

  counterValue: Observable<fromCounter.State>;
  savedValues: Counter[] = [];
  private savedSub: Subscription;

  constructor(private store: Store<fromCounter.CounterState>) { }

  ngOnInit(): void {
    this.counterValue = this.store.select('counter');

    this.savedSub = this.store.select('counter')
      .pipe(
        map(counterState => counterState.savedValues)
      ).subscribe(res => this.savedValues  = res);
  }

  onDelete(id: number) {
    this.store.dispatch(new CounterActions.Delete(id));
  }

  ngOnDestroy(): void {
    if (this.savedSub) {
      this.savedSub.unsubscribe();
    }
  }
}
