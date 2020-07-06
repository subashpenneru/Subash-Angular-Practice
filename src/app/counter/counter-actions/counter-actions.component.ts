import { Component, OnInit } from '@angular/core';
import {CounterService} from '../counter.service';

@Component({
  selector: 'app-counter-actions',
  templateUrl: './counter-actions.component.html',
  styleUrls: ['./counter-actions.component.css']
})
export class CounterActionsComponent implements OnInit {

  constructor(private counterService: CounterService) { }

  ngOnInit(): void {
  }

  addValue(val: number) {
    this.counterService.addCounter(val);
  }

  subtractValue(val: number) {
    this.counterService.subtractCounter(val);
  }

  onSave() {
    const val = this.counterService.counter.getValue();
    this.counterService.saveCounterValues(val);
  }

  onReset() {
    this.counterService.resetCounterValues();
  }
}
