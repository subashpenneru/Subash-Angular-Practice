import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import { Counter } from "./counter.model";
import * as fromCounter from "./store/counter.reducer";
import * as CounterActions from "./store/counter.actions";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.css"],
})
export class CounterComponent implements OnInit, OnDestroy {
  counterValue: Observable<fromCounter.State>;
  savedValues: Counter[] = [];
  private savedSub: Subscription;

  constructor(private store: Store<fromCounter.CounterState>) {}

  ngOnInit(): void {
    this.counterValue = this.store.select("counter");

    this.savedSub = this.store
      .select("counter")
      .pipe(map((counterState: fromCounter.State) => counterState.savedValues))
      .subscribe((res: Counter[]) => (this.savedValues = res));
  }

  onDelete(id: number) {
    this.store.dispatch(CounterActions.DELETE({ val: id }));
  }

  ngOnDestroy(): void {
    if (this.savedSub) {
      this.savedSub.unsubscribe();
    }
  }
}
